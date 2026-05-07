"use client";

import { useEffect, useRef, useState } from "react";

const GRID = 20;
const SPEED_INITIAL = 185;
const SPEED_MIN = 65;

type Point = { x: number; y: number };
type Dir = { x: number; y: number };

function opposite(a: Dir, b: Dir) {
  return a.x === -b.x && a.y === -b.y;
}

function randFood(snake: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<() => void>(() => {});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState<"idle" | "playing" | "dead">("idle");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(480, window.innerWidth - 48);
    canvas.width = size;
    canvas.height = size;
    const CELL = Math.floor(size / GRID);

    let snake: Point[] = [{ x: 10, y: 10 }];
    let dir: Dir = { x: 1, y: 0 };
    let nextDir: Dir = { x: 1, y: 0 };
    let food: Point = { x: 15, y: 10 };
    let points = 0;
    let alive = false;
    let speed = SPEED_INITIAL;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    function draw() {
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Subtle grid
      ctx!.strokeStyle = "rgba(255,255,255,0.025)";
      ctx!.lineWidth = 0.5;
      for (let i = 0; i <= GRID; i++) {
        ctx!.beginPath(); ctx!.moveTo(i * CELL, 0); ctx!.lineTo(i * CELL, GRID * CELL); ctx!.stroke();
        ctx!.beginPath(); ctx!.moveTo(0, i * CELL); ctx!.lineTo(GRID * CELL, i * CELL); ctx!.stroke();
      }

      // Food
      ctx!.shadowBlur = 14;
      ctx!.shadowColor = "rgba(0,198,255,0.9)";
      ctx!.fillStyle = "#00c6ff";
      ctx!.beginPath();
      ctx!.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL * 0.32, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.shadowBlur = 0;

      // Snake segments
      snake.forEach((seg, i) => {
        const isHead = i === 0;
        const t = (snake.length - i) / snake.length;
        const alpha = isHead ? 1 : 0.35 + 0.5 * t;
        ctx!.shadowBlur = isHead ? 12 : 3;
        ctx!.shadowColor = `rgba(0,198,255,${alpha})`;
        ctx!.fillStyle = `rgba(0,198,255,${alpha})`;
        const pad = isHead ? 1 : 2;
        roundRect(ctx!, seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, isHead ? 4 : 3);
        ctx!.shadowBlur = 0;
      });
    }

    function tick() {
      if (!alive) return;
      dir = nextDir;
      const head = {
        x: (snake[0].x + dir.x + GRID) % GRID,
        y: (snake[0].y + dir.y + GRID) % GRID,
      };

      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        alive = false;
        setBest((b) => Math.max(b, points));
        setStatus("dead");
        draw();
        return;
      }

      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        points++;
        setScore(points);
        food = randFood(snake);
        if (points % 5 === 0 && speed > SPEED_MIN) {
          speed = Math.max(SPEED_MIN, speed - 15);
          if (intervalId) clearInterval(intervalId);
          intervalId = setInterval(tick, speed);
        }
      } else {
        snake.pop();
      }
      draw();
    }

    function start() {
      snake = [{ x: 10, y: 10 }];
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      food = randFood(snake);
      points = 0;
      alive = true;
      speed = SPEED_INITIAL;
      setScore(0);
      setStatus("playing");
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(tick, speed);
      draw();
    }

    startRef.current = start;
    draw();

    const DIR_MAP: Record<string, Dir> = {
      ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
      a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
    };

    const onKey = (e: KeyboardEvent) => {
      const newDir = DIR_MAP[e.key];
      if (newDir) e.preventDefault();
      if (!alive) { start(); return; }
      if (newDir && !opposite(newDir, dir)) nextDir = newDir;
    };

    let tx = 0, ty = 0;
    const onTouchStart = (e: TouchEvent) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (!alive) { start(); return; }
      const newDir: Dir = Math.abs(dx) > Math.abs(dy)
        ? (dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 })
        : (dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
      if (!opposite(newDir, dir)) nextDir = newDir;
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      <div className="flex items-center gap-8 text-xs text-white/30 tracking-widest uppercase">
        <span>Score <span className="text-[#00c6ff] font-bold text-base ml-1">{score}</span></span>
        <span>Best <span className="text-white/50 font-bold text-base ml-1">{best}</span></span>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="rounded-2xl border border-white/[0.07] block" />
        {status !== "playing" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/75 backdrop-blur-sm cursor-pointer gap-2"
            onClick={() => startRef.current()}
          >
            {status === "dead" && (
              <p className="text-white/40 text-sm">Game over — score {score}</p>
            )}
            <p className="text-[#00c6ff] font-bold text-lg">
              {status === "idle" ? "Click or press any key" : "Play again"}
            </p>
            <p className="text-white/25 text-xs">Arrow keys / WASD · Swipe on mobile</p>
          </div>
        )}
      </div>
    </div>
  );
}
