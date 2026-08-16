import {FPS} from './theme';

// ---------------------------------------------------------------------------
// SCENE TIMING
//
// GENERATED VALUES — the `seconds` below are rewritten by
// `node scripts/sync-audio.mjs public/voiceover.mp3`, which measures the real
// read and places each scene boundary in an actual silence. Every animation
// cue is a fraction of its own scene, so nothing else needs to change when
// the voiceover is replaced.
//
// Currently synced to the Alexandra / Eleven v3 take (205.0s of narration,
// averaging ~125 wpm, plus a 2s silent tail under the sign-off card).
// Before a voiceover exists these hold ~150 wpm estimates from the script.
// ---------------------------------------------------------------------------

export type SceneId =
  | 'proof'
  | 'brand'
  | 'reality'
  | 'needs'
  | 'deliver'
  | 'pod'
  | 'caseStudy'
  | 'architecture'
  | 'operatingModels'
  | 'recap'
  | 'signoff';

export const SCENES: {id: SceneId; seconds: number; words: number}[] = [
  {id: 'proof', seconds: 10.58, words: 24},
  {id: 'brand', seconds: 10.07, words: 19},
  {id: 'reality', seconds: 20.54, words: 40},
  {id: 'needs', seconds: 15.12, words: 31},
  {id: 'deliver', seconds: 28.16, words: 63},
  {id: 'pod', seconds: 16.86, words: 36},
  {id: 'caseStudy', seconds: 18, words: 38},
  {id: 'architecture', seconds: 44.14, words: 91},
  {id: 'operatingModels', seconds: 19.2, words: 38},
  {id: 'recap', seconds: 18.19, words: 39},
  {id: 'signoff', seconds: 6.14, words: 7},
];

export const frames = (seconds: number) => Math.round(seconds * FPS);

export const SCENE_FRAMES = SCENES.map((s) => ({
  ...s,
  durationInFrames: frames(s.seconds),
}));

export const TOTAL_FRAMES = SCENE_FRAMES.reduce(
  (acc, s) => acc + s.durationInFrames,
  0,
);

/** Start frame of each scene, keyed by id. */
export const SCENE_START: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let acc = 0;
  for (const s of SCENE_FRAMES) {
    out[s.id] = acc;
    acc += s.durationInFrames;
  }
  return out;
})();
