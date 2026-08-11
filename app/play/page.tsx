import type { Metadata } from "next";
import Link from "next/link";
import TypeRacer from "@/components/TypeRacer";

export const metadata: Metadata = {
  title: "Prompt Engineer",
  description: "A type-racer with AI and tech quotes. How fast can you type?",
  alternates: { canonical: "https://iamfaham.me/play" },
};

export default function PlayPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <p className="section-label mb-3">Mini Game</p>
          <h1 className="text-white text-4xl sm:text-5xl font-black tracking-[-2px] mb-2">
            Prompt Engineer
          </h1>
          <p className="text-white/30 text-sm">
            Type faster than the AI thinks. Famous quotes and real AI prompts.
          </p>
        </div>

        <TypeRacer />

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-white/20 text-xs tracking-widest uppercase hover:text-white/45 transition-colors"
          >
            ← Portfolio
          </Link>
          <Link
            href="/play/snake"
            className="text-white/20 text-xs tracking-widest uppercase hover:text-white/45 transition-colors"
          >
            Snake →
          </Link>
        </div>
      </div>
    </div>
  );
}
