# Voiceover assembly

The shipped `public/voiceover.mp3` is spliced from two v3 generations:

- **Scenes 1–6** — the first take, cut at **148.35s**, the pause that actually
  ends the architecture narration. The earlier build ran to 152.69s, which is
  why the voice pulled ahead of the picture across that boundary.
- **Scenes 7–11** — a second take covering case study through sign-off, joined
  after a 0.9s gap.

Splicing at a scene boundary also removes the need to infer across it: each
half is measured on its own, so an error in one cannot propagate into the other.

Boundaries inside each half are still derived from cumulative speech time
against per-scene word counts, snapped to real pauses — v3 does not honour the
`<break>` tags, so there is no exact marker to detect. For frame-exact timing,
generate one clip per scene and use `scripts/stitch-scenes.mjs`.
