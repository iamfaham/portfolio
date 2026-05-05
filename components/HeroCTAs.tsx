"use client";

export default function HeroCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
      <button
        onClick={() =>
          document.getElementById("projectsDiv")?.scrollIntoView({ behavior: "smooth" })
        }
        className="border border-[#00c6ff]/40 text-[#00c6ff] px-7 py-3 rounded-xl text-sm font-semibold shadow-[0_0_16px_rgba(0,198,255,0.1)] hover:bg-[#00c6ff]/10 transition-colors duration-200"
      >
        View My Work →
      </button>
      <button
        onClick={() =>
          document.getElementById("contactDiv")?.scrollIntoView({ behavior: "smooth" })
        }
        className="border border-white/[0.08] text-white/35 px-7 py-3 rounded-xl text-sm hover:text-white/60 transition-colors duration-200"
      >
        Get in Touch
      </button>
    </div>
  );
}
