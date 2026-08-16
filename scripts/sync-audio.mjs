#!/usr/bin/env node
/**
 * Re-times the film to the real voiceover.
 *
 *   node scripts/sync-audio.mjs public/voiceover.mp3
 *
 * Two strategies, tried in order:
 *
 *  1. BREAKS — the ElevenLabs script separates every scene with
 *     <break time="1.5s" />. If the voice honoured them the MP3 contains 10
 *     long silences separating 11 spoken blocks, and the scene boundaries are
 *     simply the midpoints of those silences. Exact.
 *
 *  2. PAUSES — some voices (notably Eleven v3) reinterpret the break tags and
 *     render one continuous read whose longest gap is a normal sentence pause.
 *     The prompt package calls this out as the expected fallback. Here we take
 *     every natural pause as a *candidate* boundary and choose the 10 that make
 *     the per-scene speaking rate as uniform as possible, given the known word
 *     count of each scene. Boundaries still land in real silence, so no cut
 *     ever falls mid-word.
 *
 * Either way the result is written to the `seconds` values in src/timing.ts.
 */

import {execFileSync, spawnSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

/**
 * This sandbox has no system ffmpeg, but Remotion ships its own build in the
 * compositor package — and that build has `silencedetect` compiled in, which
 * is all this script needs. Prefer whatever is on PATH, fall back to Remotion's.
 */
const bin = (name) => {
  const onPath = spawnSync(name, ['-version'], {encoding: 'utf8'});
  if (!onPath.error) return name;
  for (const flavour of ['gnu', 'musl']) {
    const p = `node_modules/@remotion/compositor-linux-x64-${flavour}/${name}`;
    if (existsSync(p)) return p;
  }
  console.error(`Could not find ${name} on PATH or in Remotion's compositor package.`);
  process.exit(1);
};

const FFMPEG = bin('ffmpeg');
const FFPROBE = bin('ffprobe');

const audio = process.argv[2] ?? 'public/voiceover.mp3';

// Word count per scene, in order — the weights the pause fallback aligns to.
// Mirrors the `words` column in src/timing.ts and the timing table in
// script/elevenlabs-prompt.md.
const WORDS = [24, 19, 40, 31, 63, 36, 38, 91, 38, 39, 7];
const EXPECTED_SCENES = WORDS.length;
const CUTS_NEEDED = EXPECTED_SCENES - 1;

// The narration stops the instant the last word decays, but the sign-off card
// needs a beat to land — the prompt package budgets ~6s for the logo, rule and
// URL. This holds the final scene past the end of the audio (silent tail).
const TAIL = Number(process.env.TAIL_SECONDS ?? 2);

const NOISE_DB = process.argv[3] ?? '-38dB';
// Long enough to be an inter-scene break, well clear of a sentence pause.
const BREAK_MIN = process.argv[4] ?? '0.75';
// Short enough to catch ordinary sentence pauses, for the fallback.
const PAUSE_MIN = '0.30';

/** Run silencedetect and return every gap it reports. */
const detect = (minSilence) => {
  // ffmpeg writes the silencedetect log to stderr; -f null discards the audio.
  const res = spawnSync(
    FFMPEG,
    ['-hide_banner', '-i', audio, '-af',
     `silencedetect=noise=${NOISE_DB}:d=${minSilence}`, '-f', 'null', '-'],
    {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024},
  );
  if (res.error) {
    console.error('Could not run ffmpeg:', res.error.message);
    process.exit(1);
  }
  const raw = String(res.stderr ?? '');
  const starts = [...raw.matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]));
  const ends = [...raw.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]));
  return starts
    .map((s, i) => ({start: s, end: ends[i] ?? total}))
    .filter((g) => g.end > g.start)
    // Trailing silence at the very end of the file is not a scene break.
    .filter((g) => g.end < total - 0.25);
};

const total = Number(
  execFileSync(
    FFPROBE,
    ['-v', 'error', '-show_entries', 'format=duration', '-of',
     'default=noprint_wrappers=1:nokey=1', audio],
    {encoding: 'utf8'},
  ).trim(),
);

const mid = (g) => (g.start + g.end) / 2;

console.log(`Audio: ${audio}  (${total.toFixed(2)}s)`);

// ---------------------------------------------------------------------------
// Strategy 1 — the <break> tags
// ---------------------------------------------------------------------------

const breaks = detect(BREAK_MIN);
console.log(`Break-length gaps (>=${BREAK_MIN}s): ${breaks.length} (need ${CUTS_NEEDED}).`);

let cuts;
let strategy;

if (breaks.length === CUTS_NEEDED) {
  strategy = 'breaks';
  cuts = breaks.map(mid);
} else {
  // -------------------------------------------------------------------------
  // Strategy 2 — natural sentence pauses, aligned by word count
  // -------------------------------------------------------------------------
  strategy = 'pauses';
  const pauses = detect(PAUSE_MIN);
  console.log(
    `\n  The break tags were not honoured — falling back to sentence pauses.\n` +
    `  Candidate pauses (>=${PAUSE_MIN}s): ${pauses.length}.`,
  );

  if (pauses.length < CUTS_NEEDED) {
    console.error(
      `\n  Only ${pauses.length} pauses found; need at least ${CUTS_NEEDED}.\n` +
      `  Re-run with a higher noise floor, e.g.\n` +
      `    node scripts/sync-audio.mjs ${audio} -30dB\n`,
    );
    process.exit(1);
  }

  // Expected seconds-per-word across the whole read. Each scene "should" run
  // for WORDS[k] * RATE; we pick the boundaries that come closest to that.
  const totalWords = WORDS.reduce((a, b) => a + b, 0);
  const RATE = total / totalWords;

  // Boundary candidates, in time order: the midpoint of each pause.
  const cand = pauses.map(mid);
  const N = cand.length;

  // Dynamic programme. best[k][i] = lowest cost of placing the first k cuts
  // with cut k at candidate i. Cost of a scene is the squared error between
  // its actual duration and the duration its word count predicts, so the
  // chosen boundaries minimise total drift rather than snapping greedily and
  // accumulating error down the read.
  const err = (from, to, scene) => (to - from - WORDS[scene] * RATE) ** 2;

  const INF = Infinity;
  let prev = new Array(N).fill(INF);   // k = 1: scene 0 runs 0 -> cand[i]
  const from = [];                     // back-pointers per cut index
  for (let i = 0; i < N; i++) prev[i] = err(0, cand[i], 0);
  from.push(new Array(N).fill(-1));

  for (let k = 2; k <= CUTS_NEEDED; k++) {
    const cur = new Array(N).fill(INF);
    const back = new Array(N).fill(-1);
    for (let i = k - 1; i < N; i++) {
      for (let j = k - 2; j < i; j++) {
        if (prev[j] === INF) continue;
        const c = prev[j] + err(cand[j], cand[i], k - 1);
        if (c < cur[i]) {
          cur[i] = c;
          back[i] = j;
        }
      }
    }
    prev = cur;
    from.push(back);
  }

  // Close the final scene against the end of the file and pick the best tail.
  let bestEnd = -1;
  let bestCost = INF;
  for (let i = CUTS_NEEDED - 1; i < N; i++) {
    if (prev[i] === INF) continue;
    const c = prev[i] + err(cand[i], total, EXPECTED_SCENES - 1);
    if (c < bestCost) {
      bestCost = c;
      bestEnd = i;
    }
  }

  const idxs = new Array(CUTS_NEEDED);
  let i = bestEnd;
  for (let k = CUTS_NEEDED; k >= 1; k--) {
    idxs[k - 1] = i;
    i = from[k - 1][i];
  }

  cuts = idxs.map((n) => cand[n]);

  console.log('\n  Chosen boundaries (each sits inside a real pause):');
  idxs.forEach((n, k) => {
    const p = pauses[n];
    console.log(
      `    after scene ${String(k + 1).padStart(2)}  ${ts(cand[n])}  ` +
      `(pause ${p.start.toFixed(2)}–${p.end.toFixed(2)}, ${(p.end - p.start).toFixed(2)}s)`,
    );
  });
}

/** mm:ss.ss, for the boundary report. */
function ts(t) {
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(2).padStart(5, '0')}`;
}

const bounds = [0, ...cuts, total];
const durations = bounds.slice(1).map((c, i) => Number((c - bounds[i]).toFixed(2)));

// Hold the sign-off past the end of the narration.
durations[durations.length - 1] = Number((durations.at(-1) + TAIL).toFixed(2));

const path = 'src/timing.ts';
let src = readFileSync(path, 'utf8');
let idx = 0;
src = src.replace(/seconds: [\d.]+/g, () => `seconds: ${durations[idx++]}`);
writeFileSync(path, src);

console.log(`\nScene durations written to src/timing.ts (strategy: ${strategy}):`);
durations.forEach((d, i) => {
  const last = i === durations.length - 1;
  const spoken = last ? d - TAIL : d;
  const wpm = (WORDS[i] / spoken) * 60;
  console.log(
    `  ${String(i + 1).padStart(2)}. ${String(d).padStart(6)}s   ` +
    `${String(WORDS[i]).padStart(2)} words   ${wpm.toFixed(0).padStart(3)} wpm` +
    (last && TAIL ? `   (includes ${TAIL}s silent tail)` : ''),
  );
});
const overallWpm = (WORDS.reduce((a, b) => a + b, 0) / total) * 60;
console.log(`\nTotal: ${durations.reduce((a, b) => a + b, 0).toFixed(2)}s   (read averages ${overallWpm.toFixed(0)} wpm)`);
console.log('\nNow render:  npx remotion render FilmWithAudio out/infinite-possibilities.mp4');
