# ElevenLabs v3 — Voiceover Generation Package (v2, two takes)
## Infinite Possibilities — PortCo Marketing Film

**Eleven scenes · 472 words · two generations.** Same words as the approved
script — **not a single line of copy has changed.** What changed is the pacing
markup: 39 ellipses cut down to 16.

### Why this version exists

Measured on the last take:

| | |
|---|---|
| Runtime | 266.1s (4:26) |
| Speech | 199.9s (75%) |
| **Silence** | **66.3s (25%)** |
| Speaking rate | **142 wpm** — normal narration is 140–160 |

The voice was never reading slowly. The pauses were mine: 39 ellipses plus 10
break tags accounted for roughly 49 of those 66 silent seconds. This version
keeps only the 16 ellipses that carry meaning and drops the 23 that were
decoration. Expected runtime **≈ 4:03**, at the same speaking rate.

A side benefit worth knowing: with the filler ellipses gone, the remaining
scene-boundary gaps stand well clear of the in-sentence pauses, so silence
detection lands the scene cuts far more reliably than it did last time.

---

## 1 · Settings — unchanged from the last take

| Setting | Value |
|---|---|
| **Model** | Eleven v3 |
| **Voice** | Alexandra — Conversational and Natural (same as last take) |
| **Stability** | Natural |
| **Similarity** | 75% |
| **Speed** | **1.0** — do not raise it; the fix is in the script, not the dial |
| **Output** | MP3 192 kbps / 44.1 kHz+ |

Keeping the voice and settings identical matters: the two takes get spliced into
one track, and any change in timbre or pace would be audible at the seam.

---

## 2 · Take A — scenes 1 to 6

Copy the fenced block. Everything inside it is input to v3 and nothing else is.
Save the result as **`take-a.mp3`**.

```
[confident] One of the world's leading consulting firms runs its AI on a platform we built. Ten thousand users. Six continents. In production, every day.

<break time="1.5s" />

[warm] We're Infinite Possibilities. We build custom AI platforms for portfolio companies — from AI ambition to AI in production.

<break time="1.5s" />

[serious] Inside most mid-market portfolio companies, you find the same four things. Citizen developers build … unable to scale. Vendors sell … unable to fit. Leaders invest … unable to determine what, and when. Tokens burn … unable to verify return.

<break time="1.5s" />

[curious] What does a portfolio company need? … [confident] Not another one-off solution. Not another vendor's platform. A purpose-built AI platform — a strategic asset they own, driving profitable growth, and higher exit value.

<break time="1.5s" />

[thoughtful] We build these assets as a platform focused on the prioritized workflows that drive profitable growth. One platform holding the tools, knowledge and templates specific to your company, with one connection into your core systems. Model-agnostic, so you're never locked to one vendor. Cost-managed, so token spend never outruns the work it replaces. And secure by design — every new build inherits it.

<break time="1.5s" />

[thoughtful] Here's what we build, and where the line sits. Inside: the custom workflows that run your business, and beneath them the Enterprise AI Core — connectors, skills, knowledge bases, templates and components. … [confident] That's the asset. That's what you own. … [thoughtful] Outside sit two things you already have: your enterprise systems and data, and the personal productivity AI your people use daily. Both connect to the Core … both ways, through the same governed standards. So your data stays protected, your people's AI becomes enterprise-aware, and every new workflow starts from what's already there.
```

---

## 3 · Take B — scenes 7 to 11

Save as **`take-b.mp3`**. It starts on the case-study scene, which is exactly
where the last take began drifting — measuring the two halves separately stops
any error in the first half from propagating into the second.

```
[warm] Take a heavy-equipment service business. We mapped their top five processes — warranty recovery, procurement and AP, quote-to-cash, bay operations, parts and inventory. … Beneath them, one Core: connectors into their ERP, CRM and OEM warranty portals, their warranty policy knowledge, their claim and appeal templates. … [serious] Month three of twenty-four. Warranty receivables is live, and one and a half million dollars of stuck claims is now visible, and being worked. … [confident] The other four are sequenced behind it — each one faster, because the Core is already there.

<break time="1.5s" />

[confident] We deliver through a dedicated AI Pod that reports into your AI transformation team, led by an engineering manager — product, engineering, UX, QA and DevOps. … Our founder and CEO is ultimately accountable for every outcome.

<break time="1.5s" />

[warm] We'll structure it your way. A dedicated AI Pod. Targeted staff augmentation. Or build-operate-transfer — we run it, then hand it over. … [serious] Whichever you choose, commitment is earned in four-week increments … never assumed. At every gate, you decide.

<break time="1.5s" />

[serious] Don't scatter efforts and funds — build a strategic AI asset. Focus your program. Build on the right architecture. Don't lock to a single model. Partner with a credible, reliable AI vendor. … [confident] The impact: profitable growth, and higher exit value.

<break time="1.5s" />

[warm] Infinite Possibilities. … Let's build your AI advantage.
```

---

## 4 · What was cut, scene by scene

Copy is untouched. Only pacing marks changed.

| # | Scene | Ellipses before | After | What survives |
|---|---|---:|---:|---|
| 1 | The proof | 3 | **0** | The periods between the numbers already separate them |
| 2 | Who we are | 1 | **0** | Em dash carries the turn |
| 3 | Reality inside a PortCo | 8 | **4** | The four `build … unable to scale` beats — the whole point of the scene |
| 4 | What a PortCo needs | 4 | **1** | The beat after the question, so the answer has somewhere to land |
| 5 | What we deliver | 2 | **0** | It's a list; sentence breaks are enough |
| 6 | The architecture | 5 | **3** | Before *"That's the asset"*, before *"Outside sit"*, and `Core … both ways` |
| 7 | Case study | 4 | **3** | Before *"Beneath them"*, *"Month three"*, *"The other four"* |
| 8 | The AI Pod | 1 | **1** | Before the accountability line |
| 9 | Operating models | 5 | **2** | Before the `[serious]` turn, and `increments … never assumed` |
| 10 | Recap | 5 | **1** | Before *"The impact"* |
| 11 | Sign-off | 1 | **1** | The one that makes the close land |
| | **Total** | **39** | **16** | ≈ 23s recovered |

---

## 5 · Before you send

- **Listen to the first thirty seconds.** v3 occasionally *speaks* a tag instead
  of acting on it. If you hear the word "confident," re-roll.
- **The two takes must use the same voice and settings** — they get joined into
  one continuous track.
- Break tags are in the script because they cost nothing when honoured; v3
  ignores them about half the time, and the sync step detects the real gaps from
  silence either way.

Send `take-a.mp3` and `take-b.mp3` and I'll splice, sync and render the final.
