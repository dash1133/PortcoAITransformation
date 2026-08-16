#!/usr/bin/env node
/**
 * Concatenates eleven per-scene MP3s into one voiceover track with exact,
 * known gaps between them — then writes those gaps straight into
 * src/timing.ts. No silence detection, so the sync is exact rather than
 * inferred.
 *
 *   node scripts/stitch-scenes.mjs vo/            # vo/01.mp3 … vo/11.mp3
 *   node scripts/stitch-scenes.mjs vo/ 1.2        # custom gap in seconds
 *
 * Use this when the voiceover is generated scene by scene (recommended for
 * Eleven v3, whose break-tag handling is inconsistent). For a single-take
 * recording with real <break> tags, use sync-audio.mjs instead.
 */

import {execFileSync, spawnSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync, mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const dir = process.argv[2] ?? 'vo';
const GAP = Number(process.argv[3] ?? 1.5);
const N = 11;

const files = [];
for (let i = 1; i <= N; i++) {
  const padded = String(i).padStart(2, '0');
  const hit = [`${padded}.mp3`, `${i}.mp3`, `scene-${padded}.mp3`, `scene${i}.mp3`]
    .map((f) => join(dir, f))
    .find(existsSync);
  if (!hit) {
    console.error(`Missing scene ${i}. Expected ${join(dir, padded + '.mp3')} (or 1.mp3 / scene-01.mp3).`);
    process.exit(1);
  }
  files.push(hit);
}

const durationOf = (f) =>
  Number(
    execFileSync(
      'ffprobe',
      ['-v', 'error', '-show_entries', 'format=duration', '-of',
       'default=noprint_wrappers=1:nokey=1', f],
      {encoding: 'utf8'},
    ).trim(),
  );

const speech = files.map(durationOf);

// Build the concat list with a generated silence between each pair.
const work = mkdtempSync(join(tmpdir(), 'vo-'));
const silence = join(work, 'gap.mp3');
spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error',
  '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono', '-t', String(GAP),
  '-b:a', '192k', silence]);

const listPath = join(work, 'list.txt');
const lines = [];
files.forEach((f, i) => {
  lines.push(`file '${f.replace(/'/g, "'\\''")}'`);
  if (i < files.length - 1) lines.push(`file '${silence}'`);
});
writeFileSync(listPath, lines.join('\n'));

const out = 'public/voiceover.mp3';
const res = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error',
  '-f', 'concat', '-safe', '0', '-i', listPath, '-c:a', 'libmp3lame',
  '-b:a', '192k', out], {encoding: 'utf8'});
if (res.status !== 0) {
  console.error(res.stderr);
  process.exit(1);
}

// Each scene owns its speech plus half a gap on either side.
const half = GAP / 2;
// The sign-off's animation runs longer than its line. Extending the final
// scene only adds tail silence, so it cannot desync anything after it.
const FINAL_MIN = 6.0;
const durations = speech.map((d, i) => {
  const lead = i === 0 ? 0 : half;
  const tail = i === speech.length - 1 ? 0 : half;
  const raw = d + lead + tail;
  const last = i === speech.length - 1;
  return Number((last ? Math.max(raw, FINAL_MIN) : raw).toFixed(2));
});

const timing = 'src/timing.ts';
let src = readFileSync(timing, 'utf8');
let k = 0;
src = src.replace(/seconds: [\d.]+/g, () => `seconds: ${durations[k++]}`);
writeFileSync(timing, src);

console.log(`Wrote ${out}  (${durations.reduce((a, b) => a + b, 0).toFixed(2)}s)\n`);
durations.forEach((d, i) =>
  console.log(`  ${String(i + 1).padStart(2)}. ${d}s   (speech ${speech[i].toFixed(2)}s)`),
);
console.log('\nsrc/timing.ts updated. Now render:');
console.log('  npx remotion render FilmWithAudio out/infinite-possibilities.mp4');
