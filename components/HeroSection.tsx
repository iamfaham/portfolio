"use client";

import { getPersonalInfo, getStats } from "@/lib/data";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function HeroSection() {
  const personalInfo = getPersonalInfo();
  const stats = getStats();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pb-24 overflow-hidden">
      {/* Ambient glow blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00c6ff]/[0.05] blur-[120px] pointer-events-none -z-0" />

      <StaggerContainer className="relative z-10 flex flex-col items-center">
        {/* Role chip */}
        <StaggerItem>
          <div className="inline-flex items-center border border-[#00c6ff]/20 bg-[#00c6ff]/5 text-[#00c6ff]/70 px-4 py-1.5 rounded-full text-[11px] tracking-[2px] uppercase mb-9">
            AI · ML · GenAI Developer
          </div>
        </StaggerItem>

        {/* Title */}
        <StaggerItem>
          <div className="mb-7">
            <p className="text-white/40 text-2xl font-light tracking-tight mb-2">Hi, I&apos;m</p>
            <h1 className="text-gradient text-6xl md:text-7xl font-black tracking-[-3px] leading-none">
              {personalInfo.name}
            </h1>
          </div>
        </StaggerItem>

        {/* Tagline */}
        <StaggerItem>
          <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-11">
            {personalInfo.description.charAt(0).toUpperCase() + personalInfo.description.slice(1)}
          </p>
        </StaggerItem>

        {/* CTAs */}
        <StaggerItem>
          <div className="flex gap-3 justify-center mb-16">
            <button
              onClick={() => document.getElementById("projectsDiv")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-[#00c6ff]/40 text-[#00c6ff] px-7 py-3 rounded-xl text-sm font-semibold shadow-[0_0_16px_rgba(0,198,255,0.1)] hover:bg-[#00c6ff]/10 transition-colors duration-200"
            >
              View My Work →
            </button>
            <button
              onClick={() => document.getElementById("contactDiv")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/[0.08] text-white/35 px-7 py-3 rounded-xl text-sm hover:text-white/60 transition-colors duration-200"
            >
              Get in Touch
            </button>
          </div>
        </StaggerItem>

        {/* Stat strip */}
        <StaggerItem>
          <div className="glass-card flex divide-x divide-white/[0.05]">
            {[
              { value: `${stats.aiProjects}+`, label: "AI Projects" },
              { value: `${stats.technologies}+`, label: "Technologies" },
              { value: `${stats.githubStars}★`, label: "GitHub Stars" },
            ].map(({ value, label }) => (
              <div key={label} className="px-8 py-3.5 text-center">
                <div className="text-[#00c6ff] text-xl font-extrabold tracking-tight">{value}</div>
                <div className="text-white/20 text-[10px] tracking-widest uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/[0.12] text-[10px] tracking-[2px] uppercase z-10">
        <div className="w-px h-9 bg-gradient-to-b from-[#00c6ff]/40 to-transparent" />
        scroll
      </div>
    </section>
  );
}
