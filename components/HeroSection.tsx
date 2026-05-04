"use client";

import { motion } from "framer-motion";
import { getPersonalInfo, getStats } from "@/lib/data";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import ParticleField from "@/components/ParticleField";

export default function HeroSection() {
  const personalInfo = getPersonalInfo();
  const stats = getStats();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pb-24 overflow-hidden">
      {/* Particle constellation */}
      <div className="absolute inset-0 -z-10">
        <ParticleField count={55} />
      </div>

      {/* Animated background blobs */}
      <motion.div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-[#00c6ff]/[0.045] blur-[130px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.12, 1], opacity: [0.045, 0.07, 0.045] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-[20%] left-[5%] sm:left-[15%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-[#03DAC6]/[0.03] blur-[100px] pointer-events-none -z-10"
        animate={{ y: [0, -40, 0], x: [0, 20, 0], opacity: [0.03, 0.055, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-[30%] right-[5%] sm:right-[10%] w-[160px] sm:w-[280px] h-[160px] sm:h-[280px] rounded-full bg-[#00c6ff]/[0.025] blur-[90px] pointer-events-none -z-10"
        animate={{ y: [0, 30, 0], x: [0, -15, 0], opacity: [0.025, 0.05, 0.025] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <StaggerContainer className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
        {/* Role chip */}
        <StaggerItem>
          <div className="inline-flex items-center border border-[#00c6ff]/20 bg-[#00c6ff]/5 text-[#00c6ff]/70 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-[2px] uppercase mb-8">
            AI · ML · GenAI Developer
          </div>
        </StaggerItem>

        {/* Title */}
        <StaggerItem>
          <div className="mb-6">
            <p className="text-white/40 text-lg sm:text-2xl font-light tracking-tight mb-2">Hi, I&apos;m</p>
            <h1 className="text-gradient text-4xl sm:text-6xl md:text-7xl font-black tracking-[-2px] sm:tracking-[-3px] leading-none">
              {personalInfo.name}
            </h1>
          </div>
        </StaggerItem>

        {/* Tagline */}
        <StaggerItem>
          <p className="text-white/30 text-sm leading-relaxed max-w-sm sm:max-w-lg mx-auto mb-9">
            {personalInfo.description.charAt(0).toUpperCase() + personalInfo.description.slice(1)}
          </p>
        </StaggerItem>

        {/* CTAs */}
        <StaggerItem>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
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
              <div key={label} className="px-5 sm:px-8 py-3.5 text-center">
                <div className="text-[#00c6ff] text-lg sm:text-xl font-extrabold tracking-tight">{value}</div>
                <div className="text-white/20 text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5">{label}</div>
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
