"use client";

import Image from "next/image";
import { getPersonalInfo } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";

const quickFacts = [
  { icon: "📍", label: "Based in", value: "San Jose, CA" },
  { icon: "🎓", label: "Focus", value: "AI / ML / GenAI" },
  { icon: "💼", label: "Available for", value: "Freelance & Full-time" },
  { icon: "✉️", label: "Contact", value: "iamfaham5@gmail.com" },
];

const interests = [
  "AI Agents",
  "Computer Vision",
  "Agentic & RAG Systems",
  "Generative AI",
  "LLMs",
  "Strategy Games",
];

export default function AboutSection() {
  const personalInfo = getPersonalInfo();

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">Who I Am</p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">
            About Me
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left col */}
          <AnimatedSection
            delay={0.1}
            className="flex flex-col gap-4 max-w-[260px] sm:max-w-none mx-auto sm:mx-0 w-full"
          >
            <div className="w-full aspect-square rounded-2xl border border-[#00c6ff]/15 overflow-hidden relative">
              <Image
                src="/profile.png"
                alt={personalInfo.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>

            <div className="glass-card p-4 flex flex-col gap-3">
              {quickFacts.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-sm w-5 text-center flex-shrink-0 mt-0.5">
                    {icon}
                  </span>
                  <div>
                    <p className="text-white/65 text-[11px] font-semibold">
                      {label}
                    </p>
                    <p className="text-white/35 text-xs leading-snug">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right col */}
          <AnimatedSection delay={0.2} className="flex flex-col gap-5 pt-1">
            <p className="text-white/45 text-sm leading-relaxed">
              Hello! I&apos;m{" "}
              <span className="text-[#00c6ff]/80 font-semibold">
                {personalInfo.name}
              </span>
              {", "}
              {personalInfo.about.intro.replace(`Hello! I'm ${personalInfo.name}, `, "")}
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              {personalInfo.about.expertise}
            </p>
            <p className="text-white/45 text-sm leading-relaxed">
              {personalInfo.about.interests}
            </p>

            <div className="h-px bg-white/5" />

            <div>
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-2.5">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/[0.03] border border-white/[0.07] text-white/35 px-3 py-1 rounded-full text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
