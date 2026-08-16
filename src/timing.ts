import {FPS} from './theme';

// ---------------------------------------------------------------------------
// SCENE TIMING
//
// MEASURED, not estimated. `scripts/align-scenes.py` transcribes each take and
// aligns the result against the approved script, which pins every scene change
// to the silence that actually contains it; `scripts/build-vo.mjs` splices the
// two takes and writes the durations below. Every animation cue is a fraction
// of its scene (see `useBeat`), so re-running those two scripts after a new
// read is all that is needed to re-sync the film.
//
// Take A = scenes 1-6, take B = scenes 7-11, joined with a 1.0s gap.
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
  {id: 'proof', seconds: 11.938, words: 24},
  {id: 'brand', seconds: 10.373, words: 18},
  {id: 'reality', seconds: 22.421, words: 36},
  {id: 'needs', seconds: 16.685, words: 30},
  {id: 'deliver', seconds: 30.308, words: 62},
  {id: 'architecture', seconds: 45.211, words: 94},
  {id: 'caseStudy', seconds: 48.921, words: 87},
  {id: 'pod', seconds: 19.362, words: 35},
  {id: 'operatingModels', seconds: 23.357, words: 38},
  {id: 'recap', seconds: 21.676, words: 39},
  {id: 'signoff', seconds: 6.608, words: 7},
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
