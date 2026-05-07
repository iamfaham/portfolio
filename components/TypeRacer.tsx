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

// --- Sub-components ---

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return <div className="w-[80px] h-6" />;
  const max = Math.max(...data, 1);
  const W = 80, H = 24;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * H}`)
    .join(" ");
  return (
    <svg width={W} height={H} className="opacity-60">
      <polyline points={pts} fill="none" stroke="#00c6ff" strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const KEY_ROWS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"],
];

function KeyboardHeatmap({ data }: { data: Record<string, number> }) {
  const vals = Object.values(data);
  if (vals.length === 0) return null;
  const max = Math.max(...vals, 1);
  return (
    <div className="flex flex-col items-center gap-1 pt-1">
      {KEY_ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map(key => {
            const count = data[key] ?? 0;
            const heat = count / max;
            const bg =
              heat > 0.7 ? "bg-red-500/60" :
              heat > 0.4 ? "bg-orange-500/50" :
              heat > 0.15 ? "bg-yellow-500/35" :
              heat > 0 ? "bg-yellow-500/15" :
              "bg-white/[0.04]";
            return (
              <div
                key={key}
                title={count > 0 ? `${count} miss${count !== 1 ? "es" : ""}` : ""}
                className={`w-6 h-6 rounded text-[9px] flex items-center justify-center text-white/40 border border-white/[0.06] ${bg} transition-colors`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
      <p className="text-white/15 text-[10px] mt-0.5 tracking-widest uppercase">Mistake map</p>
    </div>
  );
}

const MODE_LABELS: Record<Mode, string> = {
  prompts: "🤖 AI Prompts",
  faham: "🔧 Faham's Prompts",
  quotes: "💬 Quotes",
};
const MODE_ORDER: Mode[] = ["prompts", "faham", "quotes"];

// --- Main component ---

export default function TypeRacer() {
  const [mode, setMode] = useState<Mode>("prompts");
  const [diff, setDiff] = useState<GameDiff>("medium");
  const [entryIdx, setEntryIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [pb, setPb] = useState<number | null>(null);
  const [sparkline, setSparkline] = useState<number[]>([]);
  const [ghostIdx, setGhostIdx] = useState(-1);
  const [errorFlash, setErrorFlash] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMED_SECS);
  const [streak, setStreak] = useState(0);
  const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});
  const [shared, setShared] = useState(false);

  // Refs to avoid stale closures in intervals
  const typedRef = useRef("");
  const statusRef = useRef<Status>("idle");
  const startTimeRef = useRef<number | null>(null);
  const pbRef = useRef<number | null>(null);
  const modeRef = useRef<Mode>("prompts");
  const diffRef = useRef<GameDiff>("medium");
  const runHadErrorRef = useRef(false);
  const missedKeysRef = useRef<Record<string, number>>({});
  const timedCorrectCharsRef = useRef(0);
  const timedTotalKeysRef = useRef(0);
  const timedCorrectKeysRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sparkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ghostIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep refs in sync
  statusRef.current = status;
  modeRef.current = mode;
  diffRef.current = diff;
  pbRef.current = pb;

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
    [intervalRef, sparkIntervalRef, ghostIntervalRef].forEach(r => {
      if (r.current) { clearInterval(r.current); r.current = null; }
    });
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

  // Sync heatmap to state when game ends
  useEffect(() => {
    if (status === "done") setHeatmapData({ ...missedKeysRef.current });
  }, [status]);

  const resetGame = useCallback((m: Mode, d: GameDiff) => {
    stopAll();
    typedRef.current = "";
    startTimeRef.current = null;
    runHadErrorRef.current = false;
    missedKeysRef.current = {};
    timedCorrectCharsRef.current = 0;
    timedTotalKeysRef.current = 0;
    timedCorrectKeysRef.current = 0;
    statusRef.current = "idle";
    setTyped("");
    setStatus("idle");
    setWpm(0);
    setAccuracy(100);
    setSparkline([]);
    setGhostIdx(-1);
    setErrorFlash(false);
    setShared(false);
    setTimeLeft(TIMED_SECS);
    setHeatmapData({});
    const ents = entriesFor(m, d);
    setEntryIdx(randIdx(ents.length));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [stopAll]);

  // Init
  useEffect(() => {
    setEntryIdx(randIdx(entriesFor("prompts", "medium").length));
    loadPb("prompts", "medium");
    inputRef.current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load PB when mode/diff changes
  useEffect(() => { loadPb(mode, diff); }, [mode, diff, loadPb]);

  const entries = entriesFor(mode, diff);
  const entry = entries[entryIdx] ?? entries[0];
  const target = entry.text;

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (statusRef.current === "done") return;
    if (val.length > target.length) return;

    // New char typed
    if (val.length > typedRef.current.length) {
      const ci = val.length - 1;
      const correct = val[ci] === target[ci];

      if (!correct) {
        // Error flash
        runHadErrorRef.current = true;
        setErrorFlash(true);
        if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = setTimeout(() => setErrorFlash(false), 150);
        // Track missed key for heatmap
        const k = val[ci].toLowerCase();
        if (/^[a-z]$/.test(k)) {
          missedKeysRef.current[k] = (missedKeysRef.current[k] ?? 0) + 1;
        }
      }

      if (diffRef.current === "timed") {
        timedTotalKeysRef.current++;
        if (correct) timedCorrectKeysRef.current++;
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

      // Sparkline: sample WPM every 2s
      sparkIntervalRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        const elapsed = Date.now() - startTimeRef.current;
        const chars = diffRef.current === "timed"
          ? timedCorrectCharsRef.current + typedRef.current.length
          : typedRef.current.length;
        const w = wpmCalc(chars, elapsed);
        if (w > 0) setSparkline(prev => [...prev, w]);
      }, 2000);

      // Ghost: advance at PB pace (non-timed only)
      if (pbRef.current !== null && diffRef.current !== "timed") {
        const charsPerMs = (pbRef.current * 5) / 60000;
        ghostIntervalRef.current = setInterval(() => {
          if (!startTimeRef.current) return;
          const elapsed = Date.now() - startTimeRef.current;
          setGhostIdx(Math.min(Math.round(charsPerMs * elapsed), target.length));
        }, 80);
      }
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
        // Update streak
        const noErrors = !runHadErrorRef.current;
        setStreak(prev => noErrors ? prev + 1 : 0);
        const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
        finishGame(wpmCalc(val.length, elapsed), accCalc(val, target));
      }
    }
  }, [target, finishGame]);

  const handleModeSwitch = (m: Mode) => {
    setMode(m);
    setStreak(0);
    resetGame(m, diff);
  };

  const handleDiffSwitch = (d: GameDiff) => {
    setDiff(d);
    setStreak(0);
    resetGame(mode, d);
  };

  const handleShare = async () => {
    const mLabel = MODE_LABELS[mode].replace(/^\S+\s/, "");
    const dLabel = diff === "timed" ? "30s" : diff[0].toUpperCase() + diff.slice(1);
    const text = `⚡ ${wpm} WPM · ${accuracy}% accuracy · ${mLabel} / ${dLabel} | iamfaham.me/play`;
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const firstError = (() => {
    for (let i = 0; i < typed.length; i++) if (typed[i] !== target[i]) return i;
    return -1;
  })();

  const isNewPb = status === "done" && pb !== null && wpm >= pb;
  const showGhost = ghostIdx > typed.length && ghostIdx < target.length;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Mode tabs */}
      <div className="flex gap-2 flex-wrap">
        {MODE_ORDER.map(m => (
          <button
            key={m}
            onClick={() => handleModeSwitch(m)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-[#00c6ff]/15 text-[#00c6ff] border border-[#00c6ff]/30"
                : "bg-white/[0.04] text-white/30 hover:bg-white/[0.07] hover:text-white/55 border border-white/10"
            }`}
          >
            {MODE_LABELS[m]}
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
                : "bg-white/[0.04] text-white/30 hover:bg-white/[0.07] hover:text-white/55 border border-white/10"
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
          <span title="Personal best">
            PB{" "}
            <span className="text-yellow-400/70 font-bold text-base ml-1 normal-case">
              {pb}
            </span>
          </span>
        )}
        {streak >= 2 && status !== "done" && (
          <span className="text-orange-400/70 normal-case tracking-normal">
            🔥 {streak} streak
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
          } else if (showGhost && i === ghostIdx) {
            cls = "text-white/20 border-b border-white/25";
          }
          return <span key={i} className={cls}>{char}</span>;
        })}
        {entry.author && (
          <span className="block mt-4 text-xs text-white/20 not-italic font-sans">
            — {entry.author}
          </span>
        )}
        {pb !== null && diff !== "timed" && status === "typing" && ghostIdx > typed.length && (
          <span className="block mt-2 text-[10px] text-white/15 font-sans tracking-widest uppercase">
            Ghost: your {pb} WPM best
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
        <div className="glass-card p-5 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
              {streak >= 2 && (
                <div className="text-center">
                  <p className="text-orange-400 text-2xl">🔥</p>
                  <p className="text-orange-400/50 text-xs tracking-widest uppercase mt-0.5">{streak} streak</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="bg-white/[0.05] border border-white/10 text-white/40 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/[0.09] hover:text-white/60 transition-colors"
              >
                {shared ? "Copied ✓" : "Share"}
              </button>
              <button
                onClick={() => resetGame(mode, diff)}
                className="bg-[#00c6ff]/10 border border-[#00c6ff]/30 text-[#00c6ff] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#00c6ff]/18 transition-colors"
              >
                {diff === "timed" ? "Try again →" : "Next →"}
              </button>
            </div>
          </div>
          <KeyboardHeatmap data={heatmapData} />
        </div>
      ) : (
        <p className="text-center text-white/15 text-xs tracking-widest">
          {diff === "timed"
            ? status === "idle"
              ? "Start typing to begin 30s countdown"
              : `${timeLeft}s remaining`
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
