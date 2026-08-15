#!/usr/bin/env node
/**
 * Re-times the film to the real voiceover.
 *
 *   node scripts/sync-audio.mjs public/voiceover.mp3
 *
 * The ElevenLabs script inserts <break time="1.5s" /> between every scene, so
 * the MP3 contains 11 long silences separating 12 spoken blocks. This measures
 * them with ffmpeg's silencedetect filter and rewrites the `seconds` values in
 * src/timing.ts so every animation lands on the words it belongs to.
 */

import {execFileSync, spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';

const audio = process.argv[2] ?? 'public/voiceover.mp3';
const EXPECTED_SCENES = 12;

// Silence threshold / minimum duration. The inter-scene breaks are 1.5s, and
// natural sentence pauses are well under 0.6s, so 0.75s separates them cleanly.
const NOISE_DB = process.argv[3] ?? '-38dB';
const MIN_SILENCE = process.argv[4] ?? '0.75';

const raw = (() => {
  // ffmpeg writes the silencedetect log to stderr; -f null discards the audio.
  const res = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-i', audio, '-af',
     `silencedetect=noise=${NOISE_DB}:d=${MIN_SILENCE}`, '-f', 'null', '-'],
    {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024},
  );
  if (res.error) {
    console.error('Could not run ffmpeg:', res.error.message);
    process.exit(1);
  }
  return String(res.stderr ?? '');
})();

const total = Number(
  execFileSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of',
     'default=noprint_wrappers=1:nokey=1', audio],
    {encoding: 'utf8'},
  ).trim(),
);

const starts = [...raw.matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...raw.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]));

const gaps = starts
  .map((s, i) => ({start: s, end: ends[i] ?? total}))
  .filter((g) => g.end > g.start);

// Trailing silence at the very end of the file is not a scene break.
const inner = gaps.filter((g) => g.end < total - 0.25);

console.log(`Audio: ${audio}  (${total.toFixed(2)}s)`);
console.log(`Detected ${inner.length} inter-scene gaps (need ${EXPECTED_SCENES - 1}).`);

if (inner.length !== EXPECTED_SCENES - 1) {
  console.error(
    `\n  Gap count mismatch. Re-run with a different threshold, e.g.\n` +
    `    node scripts/sync-audio.mjs ${audio} -35dB 0.9\n` +
    `  Detected gaps at: ${inner.map((g) => g.start.toFixed(2)).join(', ')}\n`,
  );
  process.exit(1);
}

// A scene runs from the midpoint of the previous gap to the midpoint of the next,
// so each scene keeps a little breathing room on both sides of its speech.
const mid = (g) => (g.start + g.end) / 2;
const cuts = [0, ...inner.map(mid), total];
const durations = cuts.slice(1).map((c, i) => Number((c - cuts[i]).toFixed(2)));

const path = 'src/timing.ts';
let src = readFileSync(path, 'utf8');
let idx = 0;
src = src.replace(/seconds: [\d.]+/g, () => `seconds: ${durations[idx++]}`);
writeFileSync(path, src);

console.log('\nScene durations written to src/timing.ts:');
durations.forEach((d, i) => console.log(`  ${String(i + 1).padStart(2)}. ${d}s`));
console.log(`\nTotal: ${durations.reduce((a, b) => a + b, 0).toFixed(2)}s`);
console.log('\nNow render:  npx remotion render FilmWithAudio out/infinite-possibilities.mp4');
