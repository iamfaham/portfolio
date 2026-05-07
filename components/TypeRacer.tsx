"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CONTENT, Mode, Difficulty, TextEntry } from "@/lib/typeracer-content";

type GameDiff = Difficulty | "timed";
type Status = "idle" | "typing" | "done";

const TIMED_SECS = 30;

function entriesFor(mode: Mode, diff: GameDiff): TextEntry[] {
  return CONTENT[mode][diff === "timed" ? "medium" : diff];
}

function randIdx(len: number, exclude?: number): number {
  if (len <= 1) return 0;
  let i: number;
  do { i = Math.floor(Math.random() * len); } while (i === exclude);
  return i;
}

function wpmCalc(chars: number, ms: number): number {
  if (ms < 100) return 0;
  return Math.round((chars / 5) / (ms / 60000));
}

function accCalc(typed: string, target: string): number {
  if (!typed.length) return 100;
  let ok = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) ok++;
  return Math.round((ok / typed.length) * 100);
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return <div className="w-[80px] h-6" />;
  const max = Math.max(...data, 1);
  const W = 80, H = 24;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H}`)
    .join(" ");
  return (
    <svg width={W} height={H} className="opacity-60">
      <polyline
        points={pts}
        fill="none"
        stroke="#00c6ff"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TypeRacer() {
  const [mode, setMode] = useState<Mode>("quotes");
  const [diff, setDiff] = useState<GameDiff>("medium");
  const [entryIdx, setEntryIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [pb, setPb] = useState<number | null>(null);
  const [sparkline, setSparkline] = useState<number[]>([]);
  const [errorFlash, setErrorFlash] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMED_SECS);
  const [shared, setShared] = useState(false);

  // Refs to avoid stale closures in intervals
  const typedRef = useRef("");
  const statusRef = useRef<Status>("idle");
  const startTimeRef = useRef<number | null>(null);
  const timedCorrectCharsRef = useRef(0);
  const timedTotalKeysRef = useRef(0);
  const timedCorrectKeysRef = useRef(0);
  const modeRef = useRef<Mode>("quotes");
  const diffRef = useRef<GameDiff>("medium");
  const entryIdxRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sparkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep refs in sync with state
  modeRef.current = mode;
  diffRef.current = diff;
  entryIdxRef.current = entryIdx;
  statusRef.current = status;

  const pbKey = (m: Mode, d: GameDiff) => `typeracer_pb_${m}_${d}`;

  const loadPb = useCallback((m: Mode, d: GameDiff) => {
    const raw = localStorage.getItem(pbKey(m, d));
    setPb(raw ? parseInt(raw) : null);
  }, []);

  const savePb = useCallback((score: number, m: Mode, d: GameDiff) => {
    const key = pbKey(m, d);
    const prev = parseInt(localStorage.getItem(key) ?? "0");
    if (score > prev) {
      localStorage.setItem(key, String(score));
      setPb(score);
    }
  }, []);

  const stopAll = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (sparkIntervalRef.current) { clearInterval(sparkIntervalRef.current); sparkIntervalRef.current = null; }
    if (flashTimeoutRef.current) { clearTimeout(flashTimeoutRef.current); flashTimeoutRef.current = null; }
  }, []);

  const finishGame = useCallback((finalWpm: number, finalAcc: number) => {
    stopAll();
    statusRef.current = "done";
    setStatus("done");
    setWpm(finalWpm);
    setAccuracy(finalAcc);
    savePb(finalWpm, modeRef.current, diffRef.current);
  }, [stopAll, savePb]);

  const finishGameRef = useRef(finishGame);
  finishGameRef.current = finishGame;

  const resetGame = useCallback((m: Mode, d: GameDiff) => {
    stopAll();
    typedRef.current = "";
    startTimeRef.current = null;
    timedCorrectCharsRef.current = 0;
    timedTotalKeysRef.current = 0;
    timedCorrectKeysRef.current = 0;
    statusRef.current = "idle";
    setTyped("");
    setStatus("idle");
    setWpm(0);
    setAccuracy(100);
    setSparkline([]);
    setErrorFlash(false);
    setShared(false);
    setTimeLeft(TIMED_SECS);
    const ents = entriesFor(m, d);
    setEntryIdx(randIdx(ents.length));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [stopAll]);

  useEffect(() => {
    setEntryIdx(randIdx(entriesFor("quotes", "medium").length));
    loadPb("quotes", "medium");
    inputRef.current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const entries = entriesFor(mode, diff);
  const entry = entries[entryIdx] ?? entries[0];
  const target = entry.text;

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (statusRef.current === "done") return;
    if (val.length > target.length) return;

    // Flash on new incorrect char
    if (val.length > typedRef.current.length) {
      const ci = val.length - 1;
      if (val[ci] !== target[ci]) {
        setErrorFlash(true);
        if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = setTimeout(() => setErrorFlash(false), 150);
      }
      if (diffRef.current === "timed") {
        timedTotalKeysRef.current++;
        if (val[ci] === target[ci]) timedCorrectKeysRef.current++;
      }
    }

    // Start on first keypress
    if (statusRef.current === "idle") {
      const now = Date.now();
      startTimeRef.current = now;
      statusRef.current = "typing";
      setStatus("typing");

      if (diffRef.current === "timed") {
        let remaining = TIMED_SECS;
        intervalRef.current = setInterval(() => {
          remaining--;
          setTimeLeft(remaining);
          if (remaining <= 0) {
            const finalWpm = wpmCalc(timedCorrectCharsRef.current, TIMED_SECS * 1000);
            const total = timedTotalKeysRef.current;
            const finalAcc = total > 0
              ? Math.round((timedCorrectKeysRef.current / total) * 100)
              : 100;
            finishGameRef.current(finalWpm, finalAcc);
          }
        }, 1000);
      }

      sparkIntervalRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        const elapsed = Date.now() - startTimeRef.current;
        const chars = diffRef.current === "timed"
          ? timedCorrectCharsRef.current + typedRef.current.length
          : typedRef.current.length;
        const w = wpmCalc(chars, elapsed);
        if (w > 0) setSparkline(prev => [...prev, w]);
      }, 2000);
    }

    typedRef.current = val;
    setTyped(val);
    setAccuracy(accCalc(val, target));

    if (val === target) {
      if (diffRef.current === "timed") {
        timedCorrectCharsRef.current += target.length;
        const ents = entriesFor(modeRef.current, "timed");
        setEntryIdx(prev => randIdx(ents.length, prev));
        typedRef.current = "";
        setTyped("");
        setAccuracy(100);
      } else {
        const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
        finishGame(wpmCalc(val.length, elapsed), accCalc(val, target));
      }
    }
  }, [target, finishGame]);

  const handleModeSwitch = (m: Mode) => {
    setMode(m);
    loadPb(m, diff);
    resetGame(m, diff);
  };

  const handleDiffSwitch = (d: GameDiff) => {
    setDiff(d);
    loadPb(mode, d);
    resetGame(mode, d);
  };

  const firstError = (() => {
    for (let i = 0; i < typed.length; i++) if (typed[i] !== target[i]) return i;
    return -1;
  })();

  const handleShare = async () => {
    const mLabel = mode === "quotes" ? "Quotes" : "AI Prompts";
    const dLabel = diff === "timed" ? "30s" : diff[0].toUpperCase() + diff.slice(1);
    const text = `⚡ ${wpm} WPM · ${accuracy}% accuracy · ${mLabel} / ${dLabel} | iamfaham.me/play`;
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const isNewPb = status === "done" && pb !== null && wpm >= pb;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Mode tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["quotes", "prompts"] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => handleModeSwitch(m)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-[#00c6ff]/15 text-[#00c6ff] border border-[#00c6ff]/30"
                : "text-white/30 hover:text-white/50 border border-white/10"
            }`}
          >
            {m === "quotes" ? "💬 Quotes" : "🤖 AI Prompts"}
          </button>
        ))}
      </div>

      {/* Difficulty tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["easy", "medium", "hard", "timed"] as GameDiff[]).map(d => (
          <button
            key={d}
            onClick={() => handleDiffSwitch(d)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              diff === d
                ? "bg-[#00c6ff]/15 text-[#00c6ff] border border-[#00c6ff]/30"
                : "text-white/30 hover:text-white/50 border border-white/10"
            }`}
          >
            {d === "timed" ? "⏱ 30s" : d[0].toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-5 text-xs text-white/30 tracking-widest uppercase">
        <span>
          WPM{" "}
          <span className="text-[#00c6ff] font-bold text-lg ml-1 normal-case">
            {status !== "idle" ? wpm : "—"}
          </span>
        </span>
        <span>
          Acc{" "}
          <span className="text-white/50 font-bold text-base ml-1 normal-case">
            {accuracy}%
          </span>
        </span>
        {pb !== null && (
          <span>
            PB{" "}
            <span className="text-yellow-400/70 font-bold text-base ml-1 normal-case">
              {pb}
            </span>
          </span>
        )}
        {diff === "timed" && status === "typing" && (
          <span className={`font-bold text-base normal-case tracking-normal ${timeLeft <= 5 ? "text-red-400" : "text-white/60"}`}>
            {timeLeft}s
          </span>
        )}
        <div className="ml-auto flex items-center">
          <Sparkline data={sparkline} />
        </div>
      </div>

      {/* Text display */}
      <div
        className={`glass-card p-6 sm:p-7 font-mono text-base sm:text-lg leading-relaxed cursor-text transition-all duration-100 ${
          errorFlash ? "ring-2 ring-red-500/50" : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {target.split("").map((char, i) => {
          let cls = "text-white/20";
          if (i < typed.length) {
            cls = typed[i] === char
              ? "text-[#00c6ff]"
              : "text-red-400 bg-red-400/10 rounded";
          } else if (i === typed.length) {
            cls = "text-white/80 border-b-2 border-[#00c6ff] animate-pulse";
          }
          return <span key={i} className={cls}>{char}</span>;
        })}
        {entry.author && (
          <span className="block mt-4 text-xs text-white/20 not-italic font-sans">
            — {entry.author}
          </span>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        value={typed}
        onChange={handleInput}
        className="opacity-0 absolute pointer-events-none h-0"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Type the text"
      />

      {/* Status / Results */}
      {status === "done" ? (
        <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-8 items-center">
            <div className="text-center">
              <p className="text-[#00c6ff] text-3xl font-black">{wpm}</p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">WPM</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-3xl font-black">{accuracy}%</p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">Accuracy</p>
            </div>
            {isNewPb && (
              <div className="text-center">
                <p className="text-yellow-400 text-2xl">🏆</p>
                <p className="text-yellow-400/50 text-xs tracking-widest uppercase mt-0.5">New PB</p>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="border border-white/10 text-white/40 px-4 py-2 rounded-xl text-xs font-semibold hover:text-white/60 transition-colors"
            >
              {shared ? "Copied ✓" : "Share"}
            </button>
            <button
              onClick={() => resetGame(mode, diff)}
              className="border border-[#00c6ff]/30 text-[#00c6ff] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#00c6ff]/10 transition-colors"
            >
              {diff === "timed" ? "Try again →" : "Next →"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-white/15 text-xs tracking-widest">
          {diff === "timed"
            ? status === "idle"
              ? "Start typing to begin 30s countdown"
              : `${timeLeft}s remaining · ${wpmCalc(timedCorrectCharsRef.current + typed.length, Date.now() - (startTimeRef.current ?? Date.now()))} WPM`
            : firstError !== -1
              ? "Fix errors before continuing"
              : status === "idle"
                ? "Click and start typing"
                : "Keep going..."}
        </p>
      )}
    </div>
  );
}
