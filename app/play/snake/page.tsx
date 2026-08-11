import Link from "next/link";
import SnakeGame from "@/components/SnakeGame";

export const metadata = {
  title: "Snake",
  description: "A small arcade break from Faham's portfolio.",
};

export default function SnakePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <p className="section-label mb-3">Mini Game</p>
      <h1 className="text-white text-4xl sm:text-5xl font-black tracking-[-2px] mb-2">Snake</h1>
      <p className="text-white/30 text-sm mb-10">A quick break before you head back to the work.</p>
      <SnakeGame />
      <Link href="/play" className="mt-10 text-white/25 text-xs tracking-widest uppercase hover:text-white/50 transition-colors">
        ← Back to play
      </Link>
    </div>
  );
}
