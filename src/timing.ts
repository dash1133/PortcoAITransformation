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
  | 'pod'
  | 'caseStudy'
  | 'architecture'
  | 'operatingModels'
  | 'recap'
  | 'signoff';

export const SCENES: {id: SceneId; seconds: number; words: number}[] = [
  {id: 'proof', seconds: 10.5, words: 24},
  {id: 'brand', seconds: 9.0, words: 19},
  {id: 'reality', seconds: 17.5, words: 40},
  {id: 'needs', seconds: 14.0, words: 31},
  {id: 'deliver', seconds: 26.5, words: 63},
  {id: 'pod', seconds: 16.0, words: 36},
  {id: 'caseStudy', seconds: 16.5, words: 38},
  {id: 'architecture', seconds: 38.0, words: 91},
  {id: 'operatingModels', seconds: 16.5, words: 38},
  {id: 'recap', seconds: 18.0, words: 41},
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
