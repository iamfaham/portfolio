"use client";

import { getExperience } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function ExperienceSection() {
  const experiences = getExperience();

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">Where I&apos;ve Worked</p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">Experience</h2>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#00c6ff]/40 to-transparent" />

          <StaggerContainer className="flex flex-col">
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.role} className="flex gap-8 pb-9 last:pb-0">
                {/* Dot */}
                <div
                  className={`relative z-10 mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full border-2 border-black ml-[11px] ${
                    index === 0
                      ? "bg-[#00c6ff] shadow-[0_0_10px_rgba(0,198,255,0.5)]"
                      : "bg-[#00c6ff]/20"
                  }`}
                />

                {/* Card */}
                <div className="glass-card flex-1 p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-1">
                    <h3 className="text-white text-base font-bold tracking-tight">{exp.role}</h3>
                    <span className="bg-[#00c6ff]/[0.06] border border-[#00c6ff]/15 text-[#00c6ff]/50 px-2.5 py-0.5 rounded-full text-[10px] whitespace-nowrap w-fit flex-shrink-0">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs italic mb-3">{exp.company}</p>
                  <p className="text-white/30 text-sm leading-relaxed mb-4">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white/[0.04] border border-white/[0.07] text-white/25 px-2 py-0.5 rounded text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
