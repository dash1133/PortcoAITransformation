# ElevenLabs — Voiceover Generation Package
## Infinite Possibilities — PortCo Marketing Film

Goal: **one continuous MP3** of the full narration, with clean, detectable
gaps between scenes so the video can be auto-synced to the audio.

**Eleven scenes → ten breaks.** Script tightened from 534 to **426 words**;
the film runs **3:08** rather than 3:43.

---

## 1 · Settings

| Setting | Recommended | Why |
|---|---|---|
| **Model** | Eleven Multilingual v2 | Most stable for long-form. Use Eleven v3 only if you want more expressiveness and are willing to re-roll takes. |
| **Voice** | A mature, warm, authoritative narrator. Good stock options: **Adam**, **Brian**, **George**, **Daniel** (male) · **Charlotte**, **Alice** (female) | PE/enterprise audience — credibility over energy. Avoid anything bright, young, or "ad-read." |
| **Stability** | **50%** | Consistent across a long read without going flat. |
| **Similarity** | **75%** | Keeps the voice identity locked throughout. |
| **Style exaggeration** | **0–15%** | Low. This is a considered brand film, not a commercial. |
| **Speed** | **1.0 (default)** | The timing table below assumes ~150 wpm. Don't speed it up — the script is already tight. |
| **Speaker boost** | On | |
| **Output format** | **MP3 192 kbps / 44.1 kHz** or higher | |

**Direction, if your voice/model accepts a style prompt:**

> Read as a confident, measured enterprise brand narrator addressing private
> equity operating partners and portfolio company CEOs. Authoritative and calm,
> never salesy or hyped. Land declarative sentences with finality and a short
> beat after each. Treat short fragments ("A purpose-built AI platform." /
> "Unable to scale.") as deliberate, weighted statements, not list items.

---

## 2 · The script — paste this whole block, generate ONCE

The `<break time="..." />` tags create the scene gaps. **Do not remove them** —
they are how the video gets synced to your audio. Keep it as a single
generation so the voice stays consistent throughout.

---

One of the world's leading consulting firms runs its AI on a platform we built. Ten thousand users. Six continents. In production every day.

<break time="1.5s" />

We're Infinite Possibilities. We build custom AI platforms for portfolio companies — from AI ambition to AI in production.

<break time="1.5s" />

Inside most mid-market portfolio companies you find the same four things. Citizen developers build — unable to scale. Vendors sell — unable to fit. Leaders invest — unable to determine what and when. Tokens burn — unable to verify return.

<break time="1.5s" />

What does a portfolio company need? Not another one-off solution. Not another vendor's platform. A purpose-built AI platform — a strategic asset they own, driving profitable growth and higher exit value.

<break time="1.5s" />

We build these assets as a platform focused on the prioritized workflows that drive profitable growth. One platform holding the tools, knowledge and templates specific to your company, with one connection into your core systems. Model-agnostic, so you're never locked to one vendor. Cost-managed, so token spend never outruns the work it replaces. And secure by design — every new build inherits it.

<break time="1.5s" />

We deliver through a dedicated AI Pod that reports into your AI transformation team, led by an engineering manager — product, engineering, UX, QA and DevOps. Our founder and CEO is ultimately accountable for every outcome.

<break time="1.5s" />

One mid-market portfolio company. Three disconnected systems — operational data, event documents, a policy library — now answered by a single Planner agent. Staff ask in plain language. Questions that took hours take seconds. New client wins doubled.

<break time="1.5s" />

Here's what we build, and where the line sits. Inside: the custom workflows that run your business, and beneath them the Enterprise AI Core — connectors, skills, knowledge bases, templates and components. That's the asset. That's what you own. Outside sit two things you already have: your enterprise systems and data, and the personal productivity AI your people use daily. Both connect to the Core, both ways, through the same governed standards. So your data stays protected, your people's AI becomes enterprise-aware, and every new workflow starts from what's already there.

<break time="1.5s" />

We'll structure it your way. A dedicated AI Pod. Targeted staff augmentation. Or build-operate-transfer — we run it, then hand it over. Whichever you choose, commitment is earned in four-week increments, never assumed. At every gate, you decide.

<break time="1.5s" />

Don't scatter efforts and funds — build a strategic AI asset. Focus your program. Build on the right architecture. Don't lock to a single model. Partner with a credible, reliable AI vendor. The impact: profitable growth and higher exit value.

<break time="1.5s" />

Infinite Possibilities. Let's build your AI advantage.

---

## 3 · Timing

Every scene's length is set from its own narration, so picture and read finish
together. At ~150 wpm:

| # | Scene | Words | Speech | Scene |
|---|---|---:|---:|---:|
| 1 | The proof | 24 | 9.6s | 10.5s |
| 2 | Who we are | 19 | 7.6s | 9.0s |
| 3 | Reality inside a PortCo | 40 | 16.0s | 17.5s |
| 4 | What a portfolio company needs | 31 | 12.4s | 14.0s |
| 5 | What we deliver | 63 | 25.2s | 26.5s |
| 6 | The AI Pod | 36 | 14.4s | 16.0s |
| 7 | Case study | 38 | 15.2s | 16.5s |
| 8 | The architecture | 91 | 36.4s | 38.0s |
| 9 | Flexible operating models | 38 | 15.2s | 16.5s |
| 10 | Recap | 39 | 15.6s | 17.5s |
| 11 | Sign-off | 7 | 2.8s | 6.0s |
| | **Total** | **426** | **2:50** | **3:08** |

Each scene carries ~1.5s beyond its speech — the inter-scene break, split half
before and half after, so nothing feels clipped at the cuts. Sign-off is held
to 6s so the logo, rule and URL have room to land.

**Every animation cue is stored as a fraction of its scene, not a fixed frame.**
So if your narrator reads faster or slower than 150 wpm, the scene stretches or
compresses and every cue moves with it — no dead air, and nothing firing after
the cut. That is what makes the sync step below sufficient on its own.

---

## 4 · After you generate

1. Download as **MP3**.
2. Give it any filename you like and re-upload it here.
3. I'll run silence detection on the `<break>` gaps to find each scene boundary,
   re-time all eleven scenes to your actual read, and render the final with sound.

**If the break tags get ignored** by the voice you pick (some handle them
inconsistently), nothing breaks — `scripts/sync-audio.mjs` detects the
situation and falls back to natural sentence pauses, choosing the ten
boundaries that keep the per-scene speaking rate most uniform against the word
counts in the table above. Slightly less precise than true breaks, but the cuts
still land in real silence.

> **Note on the current take.** The delivered voiceover (Alexandra,
> Eleven v3, 205s) is one continuous read — v3 reinterpreted the `<break>`
> tags, so the longest gap in the file is 0.78s. It was synced with the pause
> fallback. If you want frame-exact scene breaks on a future take, generate
> with **Multilingual v2**, which honours the tags literally.

**If you dislike the read**, regenerate the whole block rather than patching one
scene — a single continuous take keeps tone and pacing consistent, and
re-syncing costs nothing.
