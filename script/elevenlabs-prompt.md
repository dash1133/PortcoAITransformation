# ElevenLabs v3 — Voiceover Generation Package
## Infinite Possibilities — PortCo Marketing Film

**Eleven scenes · 472 words · ~3:26.** Written for **Eleven v3**, so the script
carries inline audio tags for tone and ellipses for pacing.

---

## 1 · Settings

| Setting | Value | Why |
|---|---|---|
| **Model** | **Eleven v3** | Per your call — it's the only model that acts on the `[tags]` below. |
| **Voice** | Mature, warm, authoritative. **Adam**, **Brian**, **George**, **Daniel** · **Charlotte**, **Alice** | PE audience — credibility over energy. Nothing bright or ad-read. |
| **Stability** | **Natural** | v3's three-way control. *Creative* over-acts the tags; *Robust* largely ignores them. |
| **Similarity** | **75%** | |
| **Speed** | **1.0** | The script is already tight; the pauses are doing the pacing. |
| **Output** | **MP3 192 kbps / 44.1 kHz**+ | |

---

## 2 · The script — copy the fenced block, generate ONCE

Everything inside the fence is input to v3 and nothing else is. There are no
scene labels or comments in it — v3 reads whatever you paste, so a heading like
"01 · The proof" would be spoken aloud.

- `[tags]` direct delivery and are not spoken.
- `…` are deliberate beats.
- `<break time="1.5s" />` separates the eleven scenes. **Keep all ten** — they
  are what the video syncs to.

```
[confident] One of the world's leading consulting firms runs its AI on a platform we built. … Ten thousand users. … Six continents. … In production, every day.

<break time="1.5s" />

[warm] We're Infinite Possibilities. We build custom AI platforms for portfolio companies … from AI ambition to AI in production.

<break time="1.5s" />

[serious] Inside most mid-market portfolio companies, you find the same four things. … Citizen developers build … unable to scale. … Vendors sell … unable to fit. … Leaders invest … unable to determine what, and when. … Tokens burn … unable to verify return.

<break time="1.5s" />

[curious] What does a portfolio company need? … [confident] Not another one-off solution. … Not another vendor's platform. … A purpose-built AI platform — a strategic asset they own … driving profitable growth, and higher exit value.

<break time="1.5s" />

[thoughtful] We build these assets as a platform focused on the prioritized workflows that drive profitable growth. One platform holding the tools, knowledge and templates specific to your company … with one connection into your core systems. Model-agnostic, so you're never locked to one vendor. Cost-managed, so token spend never outruns the work it replaces. … And secure by design — every new build inherits it.

<break time="1.5s" />

[thoughtful] Here's what we build … and where the line sits. Inside: the custom workflows that run your business, and beneath them the Enterprise AI Core — connectors, skills, knowledge bases, templates and components. … [confident] That's the asset. That's what you own. … [thoughtful] Outside sit two things you already have: your enterprise systems and data, and the personal productivity AI your people use daily. Both connect to the Core … both ways … through the same governed standards. So your data stays protected, your people's AI becomes enterprise-aware, and every new workflow starts from what's already there.

<break time="1.5s" />

[warm] Take a heavy-equipment service business. We mapped their top five processes — warranty recovery, procurement and AP, quote-to-cash, bay operations, parts and inventory. … Beneath them, one Core: connectors into their ERP, CRM and OEM warranty portals, their warranty policy knowledge, their claim and appeal templates. … [serious] Month three of twenty-four. Warranty receivables is live, and one and a half million dollars of stuck claims is now visible … and being worked. … [confident] The other four are sequenced behind it — each one faster, because the Core is already there.

<break time="1.5s" />

[confident] We deliver through a dedicated AI Pod that reports into your AI transformation team, led by an engineering manager — product, engineering, UX, QA and DevOps. … Our founder and CEO is ultimately accountable for every outcome.

<break time="1.5s" />

[warm] We'll structure it your way. … A dedicated AI Pod. … Targeted staff augmentation. … Or build-operate-transfer — we run it, then hand it over. … [serious] Whichever you choose, commitment is earned in four-week increments … never assumed. At every gate, you decide.

<break time="1.5s" />

[serious] Don't scatter efforts and funds — build a strategic AI asset. … Focus your program. … Build on the right architecture. … Don't lock to a single model. … Partner with a credible, reliable AI vendor. … [confident] The impact: profitable growth, and higher exit value.

<break time="1.5s" />

[warm] Infinite Possibilities. … Let's build your AI advantage.
```

**If v3 swallows the break tags** (it does this inconsistently), the gaps
between scenes will be short and my detection may not find all ten. Two fixes,
in order of preference:

1. Re-generate with a blank line where each break is and tell me — I fall back
   to detecting the natural sentence pauses.
2. Generate each scene as its own clip (`01.mp3` … `11.mp3`) and send the
   folder. `scripts/stitch-scenes.mjs` joins them with exact gaps, so the scene
   boundaries are known rather than detected.

---

## 3 · How the tags are used

Five tags, chosen so the film has an emotional shape rather than one flat
register:

| Tag | Where | Doing what |
|---|---|---|
| `[confident]` | proof · the thesis · "that's what you own" · pod · the impact line | Assertions that should land with finality |
| `[serious]` | the four problems · month 3 of 24 · commitment · recap | Sober, matter-of-fact — no selling |
| `[thoughtful]` | what we deliver · the architecture | Explanatory passages; the listener is being walked through something |
| `[warm]` | who we are · case study open · operating models · sign-off | Human register, opening and closing |
| `[curious]` | "What does a portfolio company need?" | One genuine question, so the answer has somewhere to land |

**Mid-scene tag switches are deliberate.** Scene 06 runs
`[thoughtful] → [confident] → [thoughtful]` so *"That's the asset. That's what
you own"* lifts out of the explanation around it. Scene 07 runs
`[warm] → [serious] → [confident]`: the story opens warm, the month-3 status is
stated flatly because that honesty is the point, then the compounding argument
closes with conviction.

**Pauses are load-bearing, not decoration.** In scene 03 the ellipsis sits
between the action and its limit — *"Citizen developers build … unable to
scale"* — so the failure lands separately from the effort. In scene 01 they
isolate each number. In scene 06, *"Both connect to the Core … both ways …
through the same governed standards"* is paced to let the bidirectionality
register.

**On capitalization:** v3 also treats ALL-CAPS as emphasis, and I deliberately
left it out. In a measured film aimed at operating partners it reads as
shouting, and the tags plus pauses already carry the emphasis. If you want one
hard hit, the place worth trying is *"a strategic asset they OWN"* in scene 04.

---

## 4 · Timing

At ~150 wpm before tags. The pauses add roughly 10–15% on top, and the sync
step measures the real thing — these are a sanity check, not a target.

| # | Scene | Words | Speech | Scene |
|---|---|---:|---:|---:|
| 1 | The proof | 24 | 9.6s | 10.5s |
| 2 | Who we are | 19 | 7.6s | 9.0s |
| 3 | Reality inside a PortCo | 40 | 16.0s | 17.5s |
| 4 | What a portfolio company needs | 31 | 12.4s | 14.0s |
| 5 | What we deliver | 63 | 25.2s | 26.5s |
| 6 | The architecture | 91 | 36.4s | 38.0s |
| 7 | Case study | 84 | 33.6s | 35.0s |
| 8 | The AI Pod | 36 | 14.4s | 16.0s |
| 9 | Flexible operating models | 38 | 15.2s | 16.5s |
| 10 | Recap | 39 | 15.6s | 17.5s |
| 11 | Sign-off | 7 | 2.8s | 6.0s |
| | **Total** | **472** | **3:09** | **3:26** |

Sign-off is floored at 6s — its line is short but the logo, rule and URL need
room to land. Both sync paths enforce that floor.

---

## 5 · Before you send it

- **Listen to the first thirty seconds.** v3 occasionally *speaks* a tag instead
  of acting on it. If you hear the word "confident," re-roll that scene.
- **Check `[serious]` didn't become gloomy.** Scene 03 should be matter-of-fact,
  not funereal.
- **If a tag over-acts, delete it** — every sentence still works unmarked. The
  tags are direction, not scaffolding.

Then send the folder (Path A) or the single MP3 (Path B), and I'll sync and
render the final with sound.
