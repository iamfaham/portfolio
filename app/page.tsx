'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Portfolio() {
  const controls = useSmoothScroll();

  return (
    <motion.div
      className="min-h-screen"
      initial={{ y: 0 }}
      animate={controls}
    >
      <div id="hero" className="section">
        <HeroSection />
      </div>
      <div id="about" className="section">
        <AboutSection />
      </div>
      <div id="projects" className="section">
        <ProjectsSection />
      </div>
      <div id="skills" className="section">
        <SkillsSection />
      </div>
      <div id="experience" className="section">
        <ExperienceSection />
      </div>
      <div id="contact" className="section flex">
        <ContactSection />
      </div>
    </motion.div>
  );
}
