import Link from "next/link";
import SnakeGame from "@/components/SnakeGame";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <p className="section-label mb-3">404</p>
      <h1 className="text-white text-4xl sm:text-5xl font-black tracking-[-2px] mb-2">
        Lost in the network
      </h1>
      <p className="text-white/30 text-sm mb-10">
        The page doesn&apos;t exist — but this game does.
      </p>

      <SnakeGame />

      <Link
        href="/"
        className="mt-10 text-white/25 text-xs tracking-widest uppercase hover:text-white/50 transition-colors"
      >
        ← Back to portfolio
      </Link>
    </div>
  );
}
