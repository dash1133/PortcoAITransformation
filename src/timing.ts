import {FPS} from './theme';

// ---------------------------------------------------------------------------
// SCENE TIMING
//
// These durations are ESTIMATES based on the approved VO script read at
// ~150 wpm plus the 1.5s inter-scene breaks specified in the ElevenLabs
// package. When the real MP3 lands, `npm run sync` measures the actual
// silence gaps and rewrites the `seconds` values below — every animation is
// derived from them, so nothing else needs to change.
// ---------------------------------------------------------------------------

export type SceneId =
  | 'proof'
  | 'brand'
  | 'reality'
  | 'recommendation'
  | 'thesis'
  | 'deliver'
  | 'pod'
  | 'caseStudy'
  | 'architecture'
  | 'ownership'
  | 'recap'
  | 'signoff';

export const SCENES: {id: SceneId; seconds: number; words: number}[] = [
  {id: 'proof', seconds: 12.0, words: 27},
  {id: 'brand', seconds: 11.0, words: 24},
  {id: 'reality', seconds: 31.0, words: 74},
  {id: 'recommendation', seconds: 16.0, words: 36},
  {id: 'thesis', seconds: 12.0, words: 27},
  {id: 'deliver', seconds: 41.5, words: 100},
  {id: 'pod', seconds: 15.0, words: 34},
  {id: 'caseStudy', seconds: 17.0, words: 38},
  {id: 'architecture', seconds: 50.0, words: 122},
  {id: 'ownership', seconds: 33.0, words: 78},
  {id: 'recap', seconds: 11.5, words: 25},
  {id: 'signoff', seconds: 8.0, words: 12},
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
