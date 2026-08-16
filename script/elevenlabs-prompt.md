# ElevenLabs — Voiceover Generation Package
## Infinite Possibilities — PortCo Marketing Film

Goal: **one continuous MP3** of the full narration, with clean, detectable
gaps between scenes so the video can be auto-synced to the audio.

**Eleven scenes → ten breaks.** (The old recommendation scene was folded into
the thesis, so this is one scene shorter than the previous version.)

---

## 1 · Settings

| Setting | Recommended | Why |
|---|---|---|
| **Model** | Eleven Multilingual v2 | Most stable for long-form. Use Eleven v3 only if you want more expressiveness and are willing to re-roll takes. |
| **Voice** | A mature, warm, authoritative narrator. Good stock options: **Adam**, **Brian**, **George**, **Daniel** (male) · **Charlotte**, **Alice** (female) | PE/enterprise audience — credibility over energy. Avoid anything bright, young, or "ad-read." |
| **Stability** | **50%** | Consistent across a long read without going flat. |
| **Similarity** | **75%** | Keeps the voice identity locked throughout. |
| **Style exaggeration** | **0–15%** | Low. This is a considered brand film, not a commercial. |
| **Speaker boost** | On | |
| **Output format** | **MP3 192 kbps / 44.1 kHz** or higher | |

**Direction, if your voice/model accepts a style prompt:**

> Read as a confident, measured enterprise brand narrator addressing private
> equity operating partners and portfolio company CEOs. Authoritative and calm,
> never salesy or hyped. Land declarative sentences with finality and a short
> beat after each. Slightly slower than conversational pace. Treat short
> fragments ("A purpose-built AI platform." / "Unable to scale.") as
> deliberate, weighted statements, not list items.

---

## 2 · The script — paste this whole block, generate ONCE

The `<break time="..." />` tags create the scene gaps. **Do not remove them** —
they are how the video gets synced to your audio automatically. Keep it as a
single generation so the voice stays consistent throughout.

---

One of the world's leading management consulting firms runs its AI on a platform we built. Ten thousand users. Six continents. In production, every day.

<break time="1.5s" />

We are Infinite Possibilities. We build custom AI solutions for portfolio companies — moving them from AI ambition to AI in production.

<break time="1.5s" />

Inside most mid-market portfolio companies, you find the same four things. Citizen developers build — unable to scale. Vendors sell — unable to fit the ecosystem. Leaders want to invest — unable to determine what, and when. And tokens burn — unable to verify the return.

<break time="1.5s" />

So what does a portfolio company actually need? Not another one-off solution. Not another vendor's platform. A purpose-built AI platform. A strategic asset they own — one that drives profitable growth, and improves exit value.

<break time="1.5s" />

We build these strategic assets for portfolio companies — by delivering a platform that focuses on the prioritized workflows that drive profitable growth. A single platform holding the tools, the knowledge, and the templates specific to your company, with one consistent connection into your core systems. Model-agnostic and vendor-agnostic, so you stay on top of every AI wave instead of locked to one. Built to manage cost, so token spend never outruns the work it replaces. And secure by design — so every new solution inherits that security instead of rebuilding it.

<break time="1.5s" />

We deliver it through a dedicated AI Pod — product, AI and backend engineering, UX, QA and DevOps — led by an engineering manager, reporting into your own AI transformation team. With our founder and CEO carrying ultimate accountability for every outcome.

<break time="1.5s" />

Take one mid-market portfolio company. Three disconnected systems — their operational database, their event documents, and their policy library — now answered by a single Planner agent. Staff simply ask in plain language. Questions that took hours take seconds. And they doubled their new client wins.

<break time="1.5s" />

So here's what we actually build — and where the line sits. Inside the line: the custom workflows that run your business, and beneath them the Enterprise AI Core — the connectors into your systems, the skills, the knowledge bases, the templates and components your company runs on. That is the asset. That is what you own. Outside the line sit two things you already have: your enterprise systems and data, and the personal productivity AI platforms your people use every day. Both connect to the Core, both ways, through the same governed standards. Your data stays protected. Your people's AI becomes enterprise-aware. And every new workflow starts from what's already there.

<break time="1.5s" />

And we'll structure it your way. A dedicated AI Pod. Targeted staff augmentation. Or build, operate and transfer — we build it, run it, then hand it over to you. Whichever model you choose, commitment is earned in four-week increments, never assumed. At every gate, you decide whether we continue.

<break time="1.5s" />

Accelerate your AI program. Build on the right architecture from day one. Move in weeks, not months. And never be locked to a single vendor.

<break time="1.5s" />

Infinite Possibilities. Let's build your AI advantage.

---

## 3 · After you generate

1. Download as **MP3**.
2. Give it any filename you like and re-upload it here.
3. I'll run silence detection on the `<break>` gaps to find each scene boundary,
   then re-time every animation to your actual read. No manual syncing needed.

**If the break tags get ignored** by the voice/model you pick (some voices
handle them inconsistently): just leave a blank line between scenes instead and
tell me — I'll fall back to detecting the natural sentence pauses, which is
slightly less precise but still works.

**If you dislike the read**, regenerate the whole block rather than patching one
scene — a single continuous take keeps tone and pacing consistent, and re-syncing
costs me nothing.
