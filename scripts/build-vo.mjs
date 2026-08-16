#!/usr/bin/env node
// ---------------------------------------------------------------------------
// SPLICE THE TWO TAKES AND WRITE THE SCENE CLOCK
//
// Joins take A (scenes 1-6) and take B (scenes 7-11) into public/voiceover.mp3
// and rewrites src/timing.ts from the measured cut points, so every animation
// cue follows the real read.
//
// Cut points come from scripts/align-scenes.py, which locates them by aligning
// speech recognition against the known script -- not by guessing from word
// counts. Each cut sits at the midpoint of the silence between two scenes, so
// a scene owns half the pause on either side of it and no line is ever clipped.
//
// Usage: build-vo.mjs takeA.mp3 takeB.mp3
// ---------------------------------------------------------------------------

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';

// Measured by scripts/align-scenes.py.
const CUTS_A = [11.938, 22.311, 44.732, 61.417, 91.725];
const CUTS_B = [48.421, 67.783, 91.140, 112.816];

const IDS_A = ['proof', 'brand', 'reality', 'needs', 'deliver', 'architecture'];
const IDS_B = ['caseStudy', 'pod', 'operatingModels', 'recap', 'signoff'];

// Word counts, for the record kept alongside each duration in timing.ts.
const WORDS = {
  proof: 24, brand: 18, reality: 36, needs: 30, deliver: 62, architecture: 94,
  caseStudy: 87, pod: 35, operatingModels: 38, recap: 39, signoff: 7,
};

// The gap the other scene changes average, so the join is not audible as a cut.
const JOIN_GAP = 1.0;
// Take B ends the instant the last word does; the sign-off card needs air.
const TAIL = 0.75;
// Trailing silence already present at the end of take A.
const TRAIL_A = 0.237;

const dur = (f) =>
  parseFloat(execFileSync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1', f,
  ], {encoding: 'utf8'}).trim());

const [takeA, takeB] = process.argv.slice(2);
if (!takeA || !takeB) {
  console.error('usage: build-vo.mjs takeA.mp3 takeB.mp3');
  process.exit(1);
}

const durA = dur(takeA);
const durB = dur(takeB);
const pad = Math.max(0, JOIN_GAP - TRAIL_A);
const offsetB = durA + pad;
const total = offsetB + durB + TAIL;

// Splice: A, silence, B, silence. Re-encoded once at 192k so the two takes
// share an encoder and the join carries no level or codec seam.
execFileSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error',
  '-i', takeA,
  '-f', 'lavfi', '-t', pad.toFixed(3), '-i', 'anullsrc=r=44100:cl=mono',
  '-i', takeB,
  '-f', 'lavfi', '-t', TAIL.toFixed(3), '-i', 'anullsrc=r=44100:cl=mono',
  '-filter_complex', '[0:a][1:a][2:a][3:a]concat=n=4:v=0:a=1[out]',
  '-map', '[out]', '-c:a', 'libmp3lame', '-b:a', '192k', '-ar', '44100',
  '-y', 'public/voiceover.mp3',
], {stdio: 'inherit'});

// The A->B cut sits mid-silence, like every other boundary.
const joinCut = durA - TRAIL_A + (TRAIL_A + pad) / 2;

const marks = [...CUTS_A, joinCut, ...CUTS_B.map((c) => c + offsetB)];
const ids = [...IDS_A, ...IDS_B];
const bounds = [0, ...marks, total];
const scenes = ids.map((id, i) => ({
  id,
  seconds: +(bounds[i + 1] - bounds[i]).toFixed(3),
  words: WORDS[id],
}));

const body = scenes
  .map((s) => `  {id: '${s.id}', seconds: ${s.seconds}, words: ${s.words}},`)
  .join('\n');

const src = readFileSync('src/timing.ts', 'utf8');
const header = `// ---------------------------------------------------------------------------
// SCENE TIMING
//
// MEASURED, not estimated. \`scripts/align-scenes.py\` transcribes each take and
// aligns the result against the approved script, which pins every scene change
// to the silence that actually contains it; \`scripts/build-vo.mjs\` splices the
// two takes and writes the durations below. Every animation cue is a fraction
// of its scene (see \`useBeat\`), so re-running those two scripts after a new
// read is all that is needed to re-sync the film.
//
// Take A = scenes 1-6, take B = scenes 7-11, joined with a ${JOIN_GAP.toFixed(1)}s gap.
// ---------------------------------------------------------------------------`;

const out = src
  .replace(/\/\/ -{75}\n\/\/ SCENE TIMING[\s\S]*?\/\/ -{75}/, header)
  .replace(
    /export const SCENES: \{id: SceneId; seconds: number; words: number\}\[\] = \[[\s\S]*?\n\];/,
    `export const SCENES: {id: SceneId; seconds: number; words: number}[] = [\n${body}\n];`,
  );
writeFileSync('src/timing.ts', out);

const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
console.log(`\ntake A ${durA.toFixed(2)}s + ${pad.toFixed(2)}s + take B ` +
            `${durB.toFixed(2)}s + ${TAIL.toFixed(2)}s = ${total.toFixed(2)}s (${mmss(total)})\n`);
for (const s of scenes) {
  console.log(`  ${s.id.padEnd(16)} ${s.seconds.toFixed(2).padStart(7)}s  ` +
              `${(s.words / s.seconds * 60).toFixed(0).padStart(4)} wpm`);
}
const sum = scenes.reduce((a, s) => a + s.seconds, 0);
console.log(`\n  ${'sum'.padEnd(16)} ${sum.toFixed(2).padStart(7)}s ` +
            `(audio ${total.toFixed(2)}s, delta ${(sum - total).toFixed(3)}s)`);
