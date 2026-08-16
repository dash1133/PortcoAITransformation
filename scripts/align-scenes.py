#!/usr/bin/env python3
"""Locate scene boundaries in a VO take by aligning ASR output to the script.

ElevenLabs v3 ignores <break> tags, so scene gaps are the same size as ellipsis
gaps and cannot be told apart by duration. Estimating boundaries from word
counts gets most of them right but silently picks the wrong gap wherever two
candidates sit close together -- which is how the voice ended up ahead of the
picture on the previous cut.

So we measure instead of estimating. PocketSphinx (whose acoustic model ships
inside the wheel, so nothing needs downloading) transcribes each speech segment;
the hypothesis is noisy, but we already know exactly what was said. A
Needleman-Wunsch alignment of the noisy hypothesis against the known script
pins every script word to a timestamp, and the boundary is simply the silence
between the last word of one scene and the first word of the next.

Usage:
  align-scenes.py AUDIO SCRIPT.md BLOCK_INDEX scene1 scene2 ...
"""

import os
import re
import subprocess
import sys
import wave

from pocketsphinx import Config, Decoder, get_model_path

NOISE = "-38dB"
MIN_SIL = 0.45


def norm(word):
    """Strip pronunciation variants and punctuation for comparison."""
    w = re.sub(r"\(\d+\)$", "", word).lower()
    w = re.sub(r"[^a-z0-9]", "", w)
    return w


def script_words(text):
    """Script text -> list of comparable word tokens.

    Hyphenated compounds are split: the recogniser emits them as separate
    words, and keeping them joined would misalign every following token.
    """
    text = re.sub(r"\[[a-z]+\]", " ", text, flags=re.I)
    text = re.sub(r"<break[^>]*>", " ", text, flags=re.I)
    text = text.replace("—", " ").replace("…", " ").replace("-", " ")
    out = []
    for raw in text.split():
        w = norm(raw)
        if w:
            out.append(w)
    return out


def detect_gaps(path):
    p = subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-af",
         f"silencedetect=noise={NOISE}:d={MIN_SIL}", "-f", "null", "-"],
        capture_output=True, text=True,
    )
    blob = p.stdout + p.stderr
    gaps, start = [], None
    for line in blob.splitlines():
        m = re.search(r"silence_start:\s*(-?[\d.]+)", line)
        if m:
            start = max(0.0, float(m.group(1)))
        m = re.search(r"silence_end:\s*([\d.]+)", line)
        if m and start is not None:
            gaps.append((start, float(m.group(1))))
            start = None
    return gaps


def duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", path],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return float(out)


def to_wav(src, dst):
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", src,
         "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", "-y", dst],
        check=True,
    )


def transcribe(wav_path, segments):
    """Decode each speech segment separately -> [(word, start, end)].

    Per-segment decoding keeps the language model from drifting across a long
    utterance and gives every segment a clean start.
    """
    mp = get_model_path()
    cfg = Config(
        hmm=os.path.join(mp, "en-us", "en-us"),
        lm=os.path.join(mp, "en-us", "en-us.lm.bin"),
        dict=os.path.join(mp, "en-us", "cmudict-en-us.dict"),
        logfn=os.devnull,
    )
    dec = Decoder(cfg)
    words = []
    with wave.open(wav_path) as w:
        sr = w.getframerate()
        n = w.getnframes()
        for start, end in segments:
            # The decoded wav can be a few ms shorter than the container's
            # reported duration, so clamp rather than seek past the end.
            a, b = int(start * sr), int(end * sr)
            if a >= n:
                continue
            w.setpos(a)
            pcm = w.readframes(min(b, n) - a)
            if not pcm:
                continue
            dec.start_utt()
            dec.process_raw(pcm, False, True)
            dec.end_utt()
            for s in dec.seg():
                token = norm(s.word)
                if not token or s.word in ("<sil>", "(NULL)", "<s>", "</s>"):
                    continue
                words.append((token, start + s.start_frame / 100.0,
                              start + s.end_frame / 100.0))
    return words


def align(ref, hyp):
    """Needleman-Wunsch. Returns ref index -> hyp index (or None)."""
    n, m = len(ref), len(hyp)
    MATCH, MISMATCH, GAP = 2, -1, -1
    # Score matrix as rows of lists; n,m are a few hundred so this is fine.
    score = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        score[i][0] = score[i - 1][0] + GAP
    for j in range(1, m + 1):
        score[0][j] = score[0][j - 1] + GAP
    for i in range(1, n + 1):
        ri = ref[i - 1]
        row, prev = score[i], score[i - 1]
        for j in range(1, m + 1):
            diag = prev[j - 1] + (MATCH if ri == hyp[j - 1][0] else MISMATCH)
            row[j] = max(diag, prev[j] + GAP, row[j - 1] + GAP)
    mapping = [None] * n
    i, j = n, m
    while i > 0 and j > 0:
        ri = ref[i - 1]
        diag = score[i - 1][j - 1] + (MATCH if ri == hyp[j - 1][0] else MISMATCH)
        if score[i][j] == diag:
            mapping[i - 1] = j - 1
            i, j = i - 1, j - 1
        elif score[i][j] == score[i - 1][j] + GAP:
            i -= 1
        else:
            j -= 1
    return mapping


def main():
    audio, md_path, block_idx, *ids = sys.argv[1:]
    md = open(md_path, encoding="utf8").read()
    blocks = re.findall(r"```\n(.*?)```", md, re.S)
    chunks = [c.strip() for c in re.split(r"<break[^>]*>", blocks[int(block_idx)])
              if c.strip()]
    if len(chunks) != len(ids):
        sys.exit(f"expected {len(ids)} scenes, script block has {len(chunks)}")

    scenes = [{"id": i, "words": script_words(t)} for i, t in zip(ids, chunks)]
    ref = [w for s in scenes for w in s["words"]]

    total = duration(audio)
    gaps = detect_gaps(audio)
    segs, cursor = [], 0.0
    for gs, ge in gaps:
        if gs > cursor:
            segs.append((cursor, gs))
        cursor = ge
    if cursor < total:
        segs.append((cursor, total))

    scratch = os.environ.get("SCRATCH", "/tmp")
    wav = os.path.join(scratch, "align-tmp.wav")
    to_wav(audio, wav)
    hyp = transcribe(wav, segs)

    mapping = align([w for w in ref], hyp)
    matched = sum(1 for k, v in enumerate(mapping)
                  if v is not None and ref[k] == hyp[v][0])
    print(f"{os.path.basename(audio)}: {total:.2f}s · {len(ref)} script words · "
          f"{len(hyp)} recognised · {matched} aligned "
          f"({100.0 * matched / len(ref):.0f}%)\n")

    def time_of(idx, which):
        """Timestamp of script word `idx`, walking outward if unaligned."""
        step = 1 if which == "start" else -1
        for k in range(idx, len(ref) if step > 0 else -1, step):
            v = mapping[k]
            if v is not None and ref[k] == hyp[v][0]:
                return hyp[v][1] if which == "start" else hyp[v][2], k - idx
        return None, None

    cuts = []
    base = 0
    for i, s in enumerate(scenes[:-1]):
        base += len(s["words"])
        last_end, _ = time_of(base - 1, "end")
        first_start, _ = time_of(base, "start")

        # The cut belongs in the silence between the two scenes, so take the
        # detected gap that sits in that window rather than the raw midpoint:
        # if a scene's trailing words fail to align, `last_end` walks backwards
        # and the midpoint drifts into speech. Where the window holds more than
        # one gap it is the trailing edge that is trustworthy, so use the gap
        # adjacent to the next scene's first word.
        window = [g for g in gaps if g[0] >= last_end - 0.05
                  and g[1] <= first_start + 0.05]
        if window:
            g = window[-1]
            cut, tag = (g[0] + g[1]) / 2.0, f"gap {g[1] - g[0]:.2f}s"
            if len(window) > 1:
                tag += f" (last of {len(window)} in window)"
        else:
            cut, tag = (last_end + first_start) / 2.0, "!! no gap in window"
        cuts.append(cut)
        print(f"BOUNDARY {s['id']:>16} -> {scenes[i + 1]['id']:<16} "
              f"speech ends {last_end:7.2f}  next starts {first_start:7.2f}  "
              f"cut {cut:7.3f}  {tag}")

    print("\ncuts: " + " ".join(f"{c:.3f}" for c in cuts))
    print("durations: " + " ".join(
        f"{b - a:.2f}" for a, b in zip([0.0] + cuts, cuts + [total])))


if __name__ == "__main__":
    main()
