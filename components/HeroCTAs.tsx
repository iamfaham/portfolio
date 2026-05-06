"use client";

const RESUME_URL =
  "https://drive.google.com/drive/folders/16fCN8-NGzxrO5ZB27oA4Gfj1g9il0LlV?usp=drive_link";

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
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-white/[0.08] text-white/35 px-7 py-3 rounded-xl text-sm hover:text-white/60 transition-colors duration-200 text-center"
      >
        View Resume
      </a>
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
