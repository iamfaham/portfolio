"use client";

export default function HeroCTAs() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
      <button
        onClick={() => scrollTo("projectsDiv")}
        className="bg-[#00c6ff]/10 border border-[#00c6ff]/40 text-[#00c6ff] px-7 py-3 rounded-xl text-sm font-semibold shadow-[0_0_16px_rgba(0,198,255,0.1)] hover:bg-[#00c6ff]/18 transition-colors duration-200"
      >
        View Selected Work →
      </button>
      <button
        onClick={() => scrollTo("contactDiv")}
        className="bg-white/[0.05] border border-white/[0.08] text-white/45 px-7 py-3 rounded-xl text-sm hover:bg-white/[0.09] hover:text-white/65 transition-colors duration-200"
      >
        Let&apos;s Talk
      </button>
    </div>
  );
}
