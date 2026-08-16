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
  | 'needs'
  | 'deliver'
  | 'architecture'
  | 'caseStudy'
  | 'pod'
  | 'operatingModels'
  | 'recap'
  | 'signoff';

export const SCENES: {id: SceneId; seconds: number; words: number}[] = [
  {id: 'proof', seconds: 14.62, words: 24},
  {id: 'brand', seconds: 10.65, words: 19},
  {id: 'reality', seconds: 27.24, words: 40},
  {id: 'needs', seconds: 15.03, words: 31},
  {id: 'deliver', seconds: 34.57, words: 63},
  {id: 'architecture', seconds: 52.08, words: 91},
  {id: 'caseStudy', seconds: 45.81, words: 84},
  {id: 'pod', seconds: 18.51, words: 36},
  {id: 'operatingModels', seconds: 23.55, words: 38},
  {id: 'recap', seconds: 23.12, words: 39},
  {id: 'signoff', seconds: 6.0, words: 7},
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
