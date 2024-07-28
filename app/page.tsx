'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
// import Navbar from '@/components/Navbar';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0);
  const controls = useSmoothScroll(currentSection, setCurrentSection);

  return (
    <>
      {/* <Navbar /> */}
      <motion.div
        className="min-h-screen"
        initial={{ y: 0 }}
        animate={controls}
      >
        <div id="heroDiv" className="section">
          <HeroSection />
        </div>
        <div id="aboutDiv" className="section">
          <AboutSection />
        </div>
        <div id="projectsDiv" className="section">
          <ProjectsSection />
        </div>
        <div id="skillsDiv" className="section">
          <SkillsSection />
        </div>
        <div id="experienceDiv" className="section">
          <ExperienceSection />
        </div>
        <div id="contactDiv" className="section">
          <ContactSection />
        </div>
      </motion.div>
    </>
  );
}
