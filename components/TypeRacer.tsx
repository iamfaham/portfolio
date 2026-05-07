"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const QUOTES = [
  { text: "Artificial intelligence is the new electricity.", author: "Andrew Ng" },
  { text: "The question of whether a machine can think is no more interesting than whether a submarine can swim.", author: "Edsger Dijkstra" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The real danger is not that computers will think like men, but that men will think like computers.", author: "Sydney J. Harris" },
  { text: "Data is the new oil, but like oil it must be refined before it is useful.", author: "Clive Humby" },
  { text: "In the long run the biggest risk of AI is not malevolence but competence.", author: "Stephen Hawking" },
  { text: "Machine learning is essentially a form of applied statistics with a larger emphasis on computation.", author: "Anonymous" },
  { text: "The best way to predict the future is to build it yourself.", author: "Alan Kay" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "A year spent in artificial intelligence is enough to make one believe in God.", author: "Alan Perlis" },
  { text: "Intelligence is the ability to adapt to change.", author: "Stephen Hawking" },
  { text: "The measure of intelligence is the ability to change.", author: "Albert Einstein" },
];

function pick(exclude?: number) {
  let i: number;
  do { i = Math.floor(Math.random() * QUOTES.length); } while (i === exclude);
  return i;
}

type Status = "idle" | "typing" | "done";

export default function TypeRacer() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const quote = QUOTES[quoteIdx].text;
  const author = QUOTES[quoteIdx].author;

  const calcWpm = useCallback((chars: number, start: number) => {
    const minutes = (Date.now() - start) / 60000;
    return Math.round(chars / 5 / minutes);
  }, []);

  const calcAccuracy = useCallback((input: string, target: string) => {
    if (!input.length) return 100;
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correct++;
    }
    return Math.round((correct / input.length) * 100);
  }, []);

  const reset = useCallback((newIdx?: number) => {
    const idx = newIdx ?? pick(quoteIdx);
    setQuoteIdx(idx);
    setTyped("");
    setStatus("idle");
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [quoteIdx]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length > quote.length) return;

    if (status === "idle") {
      const now = Date.now();
      setStartTime(now);
      setStatus("typing");
      intervalRef.current = setInterval(() => {
        setWpm(calcWpm(val.length, now));
      }, 500);
    }

    setTyped(val);
    setAccuracy(calcAccuracy(val, quote));

    if (val === quote) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setStatus("done");
      if (startTime) setWpm(calcWpm(val.length, startTime));
    }
  }, [quote, status, startTime, calcWpm, calcAccuracy]);

  // Update WPM ticker to use latest startTime
  useEffect(() => {
    if (status === "typing" && startTime) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setWpm(calcWpm(typed.length, startTime));
      }, 500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime]);

  useEffect(() => {
    setQuoteIdx(pick());
    inputRef.current?.focus();
  }, []);

  const firstError = (() => {
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== quote[i]) return i;
    }
    return -1;
  })();
  const hasError = firstError !== -1;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Stats bar */}
      <div className="flex items-center gap-6 text-xs text-white/30 tracking-widest uppercase">
        <span>WPM <span className="text-[#00c6ff] font-bold text-lg ml-1 normal-case">{wpm}</span></span>
        <span>Accuracy <span className="text-white/50 font-bold text-lg ml-1 normal-case">{accuracy}%</span></span>
        <span className={`ml-auto transition-colors ${hasError ? "text-red-400" : "text-white/20"}`}>
          {hasError ? "Fix errors" : status === "done" ? "✓ Done" : status === "idle" ? "Start typing" : "Keep going"}
        </span>
      </div>

      {/* Quote display */}
      <div
        className="glass-card p-6 sm:p-8 font-mono text-base sm:text-lg leading-relaxed cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {quote.split("").map((char, i) => {
          let className = "text-white/20";
          if (i < typed.length) {
            className = typed[i] === char ? "text-[#00c6ff]" : "text-red-400 bg-red-400/10 rounded";
          } else if (i === typed.length) {
            className = "text-white/80 border-b-2 border-[#00c6ff] animate-pulse";
          }
          return (
            <span key={i} className={className}>
              {char}
            </span>
          );
        })}
        <span className="block mt-4 text-xs text-white/20 not-italic">— {author}</span>
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
        aria-label="Type the quote"
      />

      {/* Done overlay / controls */}
      {status === "done" ? (
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-[#00c6ff] text-3xl font-black">{wpm}</p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">WPM</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-3xl font-black">{accuracy}%</p>
              <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">Accuracy</p>
            </div>
          </div>
          <button
            onClick={() => reset()}
            className="border border-[#00c6ff]/30 text-[#00c6ff] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#00c6ff]/10 transition-colors"
          >
            Next quote →
          </button>
        </div>
      ) : (
        <p className="text-center text-white/15 text-xs tracking-widest">
          Click the text box and start typing
        </p>
      )}
    </div>
  );
}
