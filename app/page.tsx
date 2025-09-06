"use client";

import FloatingNav from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import { getSections } from "@/lib/data";

const sections = getSections();

export default function Portfolio() {
  return (
    <>
      <FloatingNav />
      <main className="scroll-container">
        {sections.map((section, index) => (
          <div key={section} id={section} className="section">
            {index === 0 && <HeroSection />}
            {index === 1 && <AboutSection />}
            {index === 2 && <ProjectsSection />}
            {index === 3 && <SkillsSection />}
            {index === 4 && <ExperienceSection />}
            {index === 5 && <ContactSection />}
          </div>
        ))}
      </main>
    </>
  );
}
