# Infinite Possibilities — PortCo Marketing Film

A 16:9 brand film for Infinite Possibilities, aimed at PE operating partners,
fund CIOs, and mid-market portfolio company CEOs.

Built with [Remotion](https://remotion.dev) — React components rendered to a
real H.264 MP4, not a slideshow export.

## The narrative

Twelve scenes across four acts. The full script, on-screen text, voiceover, and
the research behind the problem statement live in
[`script/narrative.md`](script/narrative.md).

## Voiceover

The voiceover is generated externally (ElevenLabs). The prompt, recommended
voice settings, and the exact script to paste are in
[`script/elevenlabs-prompt.md`](script/elevenlabs-prompt.md).

The script separates every scene with a `<break time="1.5s" />` tag. Those gaps
are load-bearing: `scripts/sync-audio.mjs` finds them and derives the scene
timings from the real read, so the animation always lands on the words.

If the voice ignores the break tags — Eleven v3 reinterprets them and renders
one continuous read — the script falls back automatically. It takes every
natural sentence pause as a candidate boundary and picks the ten that make the
per-scene speaking rate most uniform, given each scene's known word count. Cuts
still land inside real silence, so nothing is clipped mid-word.

## Build

```bash
npm install

# Preview in the browser
npm run studio

# Render silent (estimated timings)
npx remotion render Film out/infinite-possibilities-silent.mp4

# Sync to the real voiceover, then render final
cp <voiceover>.mp3 public/voiceover.mp3
node scripts/sync-audio.mjs public/voiceover.mp3
npx remotion render FilmWithAudio out/infinite-possibilities.mp4
```

The noise floor and the minimum break length are both tunable, and the silent
tail held under the sign-off card defaults to 2s:

```bash
node scripts/sync-audio.mjs public/voiceover.mp3 -35dB 0.9
TAIL_SECONDS=3 node scripts/sync-audio.mjs public/voiceover.mp3
```

## Layout of the code

| Path | What it holds |
|---|---|
| `src/theme.ts` | Brand colours, gradient and type — extracted from the source decks |
| `src/timing.ts` | Scene durations. The single place `sync-audio.mjs` rewrites |
| `src/components.tsx` | Motion primitives (`Rise`, `HoldOut`, `Stage`, `Counter`) and brand elements |
| `src/scenes/Act1–4.tsx` | The twelve scenes |
| `src/Film.tsx` | Sequences the scenes and mounts the audio |
| `public/` | Logo, self-hosted Poppins, and `voiceover.mp3` when present |

Scene animation delays are expressed relative to the start of their own scene,
so re-timing to a new voiceover never requires touching scene code.

## Environment notes

Two things this sandbox needs that a normal machine would not:

- **Browser** — Remotion's Chrome download host is blocked, so
  `remotion.config.ts` points at the pre-installed Chromium.
- **Fonts** — `fonts.gstatic.com` is unreachable from the render browser, so
  Poppins is vendored into `public/fonts` and loaded via the FontFace API in
  `src/fonts.tsx`. It must load inside a component; a module-scope
  `delayRender()` breaks composition discovery.
