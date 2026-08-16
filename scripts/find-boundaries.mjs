#!/usr/bin/env node
// ---------------------------------------------------------------------------
// SCENE BOUNDARY DETECTION
//
// v3 ignores <break> tags, so a scene gap looks exactly like an ellipsis gap —
// both land in the 0.5-1.2s band and duration alone can't tell them apart.
// Snapping each boundary to its nearest gap independently is a coin flip
// wherever two candidates sit close together, and a coin flip is what put the
// voice ahead of the picture last time.
//
// So this doesn't guess boundaries in isolation. The script gives us more than
// scene ends: every "…" is a pause at a known word offset. Those ellipses are
// landmarks. We take ALL the anchors in a take — scene ends AND ellipses — and
// match them to detected gaps in one pass, in order, minimising total error.
// A wrong boundary then has to drag every downstream ellipsis out of place too,
// which costs far more than it saves, so the right answer wins by a wide margin
// instead of a hair.
//
// Matching happens in SPEECH time (silence removed) rather than wall clock, so
// the undetected sub-threshold pauses between short sentences don't skew the
// word-rate model.
// ---------------------------------------------------------------------------

import {execFileSync, spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';

const NOISE = '-38dB';
const MIN_SIL = 0.45;

const countWords = (s) =>
  s
    .replace(/\[[a-z]+\]/gi, ' ')
    .replace(/<break[^>]*>/gi, ' ')
    .replace(/[—…:;,.!?"'’“”]/g, ' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;

/**
 * Parse a take's fenced script block into scenes, each with a word count and
 * the word offsets at which its ellipses fall.
 */
export const parseTake = (block, ids) => {
  const chunks = block
    .split(/<break[^>]*>/i)
    .map((s) => s.trim())
    .filter(Boolean);
  if (chunks.length !== ids.length) {
    throw new Error(`expected ${ids.length} scenes, script has ${chunks.length}`);
  }
  return chunks.map((text, i) => {
    // Word offset of each ellipsis = words spoken before it.
    const parts = text.split('…');
    const ellipses = [];
    let acc = 0;
    for (let p = 0; p < parts.length - 1; p++) {
      acc += countWords(parts[p]);
      ellipses.push(acc);
    }
    return {id: ids[i], words: countWords(text), ellipses, text};
  });
};

/** Detected silence gaps as {start, end, mid, dur}. */
const detectGaps = (file) => {
  // silencedetect reports on stderr, so both streams are needed.
  const r = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-nostats', '-i', file, '-af',
     `silencedetect=noise=${NOISE}:d=${MIN_SIL}`, '-f', 'null', '-'],
    {encoding: 'utf8', maxBuffer: 1 << 24},
  );
  const out = `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
  const gaps = [];
  let start = null;
  for (const line of out.split('\n')) {
    const s = line.match(/silence_start:\s*(-?[\d.]+)/);
    if (s) start = Math.max(0, parseFloat(s[1]));
    const e = line.match(/silence_end:\s*([\d.]+)/);
    if (e && start !== null) {
      const end = parseFloat(e[1]);
      gaps.push({start, end, mid: (start + end) / 2, dur: end - start});
      start = null;
    }
  }
  return gaps;
};

const duration = (file) =>
  parseFloat(execFileSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1', file,
  ], {encoding: 'utf8'}).trim());

export const analyse = (file, scenes) => {
  const total = duration(file);
  const gaps = detectGaps(file);

  // Speech segments = everything that isn't a detected gap.
  const segs = [];
  let cursor = 0;
  for (const g of gaps) {
    if (g.start > cursor) segs.push({start: cursor, end: g.start});
    cursor = g.end;
  }
  if (cursor < total) segs.push({start: cursor, end: total});
  const speech = segs.reduce((a, s) => a + (s.end - s.start), 0);

  // Speech elapsed before each gap — the coordinate we match in.
  let acc = 0;
  const gapPos = gaps.map((g, i) => {
    if (i > 0) acc += gaps[i - 1].end === undefined ? 0 : 0;
    return 0;
  });
  {
    let sp = 0;
    let si = 0;
    for (let i = 0; i < gaps.length; i++) {
      while (si < segs.length && segs[si].end <= gaps[i].start) {
        sp += segs[si].end - segs[si].start;
        si++;
      }
      gapPos[i] = sp;
    }
  }

  const words = scenes.reduce((a, s) => a + s.words, 0);
  const secPerWord = speech / words;

  // Anchors: every ellipsis and every scene end, in order, by word offset.
  const anchors = [];
  let base = 0;
  scenes.forEach((s, i) => {
    for (const e of s.ellipses) {
      anchors.push({kind: 'ellipsis', scene: s.id, words: base + e});
    }
    base += s.words;
    if (i < scenes.length - 1) {
      anchors.push({
        kind: 'boundary', scene: s.id, next: scenes[i + 1].id, words: base,
      });
    }
  });
  anchors.sort((a, b) => a.words - b.words);
  for (const a of anchors) a.expected = a.words * secPerWord;

  // Monotone assignment of anchors to gaps, minimising squared error.
  const N = anchors.length;
  const M = gaps.length;
  if (M < N) throw new Error(`only ${M} gaps for ${N} anchors`);
  const INF = Infinity;
  const cost = (i, j) => (gapPos[j] - anchors[i].expected) ** 2;
  const dp = Array.from({length: N + 1}, () => new Float64Array(M + 1).fill(INF));
  const back = Array.from({length: N + 1}, () => new Int32Array(M + 1).fill(-1));
  dp[0][0] = 0;
  for (let j = 0; j <= M; j++) dp[0][j] = 0;
  for (let i = 1; i <= N; i++) {
    for (let j = i; j <= M; j++) {
      // anchor i-1 takes gap j-1, or gap j-1 is left unmatched
      const take = dp[i - 1][j - 1] + cost(i - 1, j - 1);
      const skip = dp[i][j - 1];
      if (take <= skip) {
        dp[i][j] = take;
        back[i][j] = j - 1;
      } else {
        dp[i][j] = skip;
        back[i][j] = -1;
      }
    }
  }
  // Recover assignment.
  const assign = new Array(N).fill(-1);
  let i = N;
  let j = M;
  while (i > 0) {
    if (back[i][j] >= 0) {
      assign[i - 1] = back[i][j];
      j = back[i][j];
      i--;
    } else {
      j--;
    }
  }
  anchors.forEach((a, k) => {
    a.gap = gaps[assign[k]];
    a.cut = a.gap.mid;
    a.err = gapPos[assign[k]] - a.expected;
  });

  return {total, speech, silence: total - speech, secPerWord, gaps, anchors};
};

// --- CLI ------------------------------------------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  const [file, mdPath, blockIdx, ...ids] = process.argv.slice(2);
  const md = readFileSync(mdPath, 'utf8');
  const blocks = [...md.matchAll(/```\n([\s\S]*?)```/g)].map((m) => m[1]);
  const scenes = parseTake(blocks[Number(blockIdx)], ids);
  const r = analyse(file, scenes);

  console.log(
    `total ${r.total.toFixed(2)}s · speech ${r.speech.toFixed(2)}s ` +
    `(${((r.speech / r.total) * 100).toFixed(0)}%) · silence ` +
    `${r.silence.toFixed(2)}s · ${(60 / r.secPerWord).toFixed(0)} wpm · ` +
    `${r.gaps.length} gaps / ${r.anchors.length} anchors\n`,
  );
  for (const a of r.anchors) {
    const label = a.kind === 'boundary'
      ? `BOUNDARY ${a.scene} -> ${a.next}`
      : `  ellipsis in ${a.scene}`;
    console.log(
      `${label.padEnd(40)} cut ${a.cut.toFixed(2).padStart(7)}  ` +
      `gap ${a.gap.dur.toFixed(2)}  err ${(a.err >= 0 ? '+' : '') + a.err.toFixed(2)}`,
    );
  }
  const cuts = r.anchors.filter((a) => a.kind === 'boundary').map((a) => a.cut);
  console.log(`\ncuts: ${cuts.map((c) => c.toFixed(3)).join(' ')}`);
}
