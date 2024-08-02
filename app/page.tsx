'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
// import TestimonialSection from '@/components/TestimonialSection';
import useSectionVisibility from '@/hooks/useSectionVisibility';
import { throttle } from '@/utils/throttle';
import { debounce } from '@/utils/debounce';

const sections = [
  'heroDiv',
  'aboutDiv',
  'projectsDiv',
  'skillsDiv',
  'experienceDiv',
  // 'testimonialDiv',
  'contactDiv',
];

export default function Portfolio() {
  const { sectionRefs, currentSection, setCurrentSection } = useSectionVisibility(sections);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle((event: WheelEvent) => {
      if (isScrolling) return;

      setIsScrolling(true);

      if (event.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    }, 1500);

    const handleTouchStart = (event: TouchEvent) => {
      setTouchStartY(event.touches[0].clientY);
      setTouchEndY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      setTouchEndY(event.touches[0].clientY);
    };

    const handleTouchEnd = debounce(() => {
      if (isScrolling) return;

      setIsScrolling(true);

      const touchDistance = touchStartY - touchEndY;
      if (touchDistance > 50) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (touchDistance < -50) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    }, 1500);

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrolling, touchStartY, touchEndY, setCurrentSection]);

  return (
    <main>
      <motion.div
        className="min-h-screen overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: -currentSection * 100 + 'vh' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {sections.map((section, index) => (
          <div
            key={section}
            id={section}
            className="section"
            ref={(el: any) => (sectionRefs.current[index] = el)}
          >
            {index === 0 && <HeroSection />}
            {index === 1 && <AboutSection />}
            {index === 2 && <ProjectsSection />}
            {index === 3 && <SkillsSection />}
            {index === 4 && <ExperienceSection />}
            {index === 5 && <ContactSection />}
          </div>
        ))}
      </motion.div>
    </main>
  );
}
