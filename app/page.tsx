'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { isTouchDevice } from '@/utils/detectTouchDevice';
import TestimonialSection from '@/components/TestimonialSection';

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isInteractingWithIconCloud, setIsInteractingWithIconCloud] = useState(false);
  const controls = useSmoothScroll(currentSection, setCurrentSection, isInteractingWithIconCloud);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  return (
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
        <SkillsSection setInteractingWithIconCloud={setIsInteractingWithIconCloud} />
      </div>
      <div id="experienceDiv" className="section">
        <ExperienceSection />
      </div>
      <div id="testimonialDiv" className="section">
        <TestimonialSection />
      </div>
      <div id="contactDiv" className="section">
        <ContactSection />
      </div>
    </motion.div>
  );
}
