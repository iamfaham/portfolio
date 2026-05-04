"use client";

import { getTestimonials } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function TestimonialSection() {
  const testimonials = getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12 text-center">
          <p className="section-label" style={{ display: "block", textAlign: "center" }}>
            Kind Words
          </p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-1px] sm:tracking-[-1.5px]">Testimonials</h2>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <StaggerItem key={t.name}>
                <div className="glass-card p-6 flex flex-col gap-4 h-full">
                  <div className="text-[#00c6ff]/20 font-serif text-5xl leading-none">&ldquo;</div>
                  <p className="text-white/40 text-sm leading-relaxed italic flex-1">{t.text}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-9 h-9 rounded-full bg-[#00c6ff]/10 border border-[#00c6ff]/20 flex items-center justify-center text-[#00c6ff]/50 text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate">{t.name}</p>
                      <p className="text-white/25 text-[11px] truncate">{t.role}</p>
                    </div>
                    {t.linkedinUrl && (
                      <a
                        href={t.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c6ff]/40 border border-[#00c6ff]/15 px-2 py-0.5 rounded text-[10px] hover:text-[#00c6ff]/60 transition-colors flex-shrink-0"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
