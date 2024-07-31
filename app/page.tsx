'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import TestimonialSection from '@/components/TestimonialSection';
import useSectionVisibility from '@/hooks/useSectionVisibility';
import { throttle } from '@/utils/throttle';

const sections = [
  'heroDiv',
  'aboutDiv',
  'projectsDiv',
  'skillsDiv',
  'experienceDiv',
  'testimonialDiv',
  'contactDiv',
];

export default function Portfolio() {
  const { sectionRefs, currentSection, setCurrentSection } = useSectionVisibility(sections);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isInteractiveElement, setIsInteractiveElement] = useState(false);

  useEffect(() => {
    const handleScroll = throttle((event: WheelEvent) => {
      if (event.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    }, 1000); // Adjust the limit as needed

    const handleTouchStart = (event: TouchEvent) => {
      const interactiveElement = event.target as HTMLElement;
      setIsInteractiveElement(interactiveElement.hasAttribute('data-interactive'));
      setTouchStartY(event.touches[0].clientY);
      setTouchEndY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isInteractiveElement) return;
      setTouchEndY(event.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (isInteractiveElement) return;
      if (touchStartY - touchEndY > 50) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (touchEndY - touchStartY > 50) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    };

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
  }, [setCurrentSection, touchStartY, touchEndY, isInteractiveElement]);

  return (
    <motion.div
      className="min-h-screen overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: -currentSection * 100 + 'vh' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }} // Slow animation settings
    >
      {sections.map((section, index) => (
        <div
          key={section}
          id={section}
          className="section"
          ref={(el:any ) => (sectionRefs.current[index] = el)}
        >
          {index === 0 && <HeroSection />}
          {index === 1 && <AboutSection />}
          {index === 2 && <ProjectsSection />}
          {index === 3 && <SkillsSection />}
          {index === 4 && <ExperienceSection />}
          {index === 5 && <TestimonialSection />}
          {index === 6 && <ContactSection />}
        </div>
      ))}
    </motion.div>
  );
}


// 'use client';

// import { useEffect, useState } from 'react';
// import { scroller } from 'react-scroll';
// import HeroSection from '@/components/HeroSection';
// import AboutSection from '@/components/AboutSection';
// import ProjectsSection from '@/components/ProjectsSection';
// import SkillsSection from '@/components/SkillsSection';
// import ExperienceSection from '@/components/ExperienceSection';
// import ContactSection from '@/components/ContactSection';
// import TestimonialSection from '@/components/TestimonialSection';
// import useSectionVisibility from '@/hooks/useSectionVisibility';
// import { throttle } from '@/utils/throttle';

// const sections = [
//   'heroDiv',
//   'aboutDiv',
//   'projectsDiv',
//   'skillsDiv',
//   'experienceDiv',
//   'testimonialDiv',
//   'contactDiv',
// ];

// export default function Portfolio() {
//   const { sectionRefs, currentSection, setCurrentSection } = useSectionVisibility(sections);
//   const [touchStartY, setTouchStartY] = useState(0);
//   const [touchEndY, setTouchEndY] = useState(0);
//   const [scrollInProgress, setScrollInProgress] = useState(false);

//   useEffect(() => {
//     const handleScroll = throttle((event: WheelEvent) => {
//       if (!scrollInProgress) {
//         if (event.deltaY > 0) {
//           setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
//         } else {
//           setCurrentSection((prev) => Math.max(prev - 1, 0));
//         }
//         setScrollInProgress(true);
//         scroller.scrollTo(sections[currentSection + (event.deltaY > 0 ? 1 : -1)], {
//           duration: 800,
//           delay: 0,
//           smooth: 'easeInOutQuart',
//           offset: 0,
//           onSetActive: () => setScrollInProgress(false), // Reset scroll progress after scrolling
//         });
//       }
//     }, 1000); // Adjust the limit as needed

//     const handleTouchStart = (event: TouchEvent) => {
//       setTouchStartY(event.touches[0].clientY);
//       setTouchEndY(event.touches[0].clientY);
//     };

//     const handleTouchMove = (event: TouchEvent) => {
//       if (!scrollInProgress) {
//         setTouchEndY(event.touches[0].clientY);
//       }
//     };

//     const handleTouchEnd = () => {
//       if (!scrollInProgress) {
//         if (touchStartY - touchEndY > 50) {
//           setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
//         } else if (touchEndY - touchStartY > 50) {
//           setCurrentSection((prev) => Math.max(prev - 1, 0));
//         }
//         setScrollInProgress(true);
//         scroller.scrollTo(sections[currentSection + (touchStartY - touchEndY > 50 ? 1 : -1)], {
//           duration: 800,
//           delay: 0,
//           smooth: 'easeInOutQuart',
//           offset: 0,
//           onSetActive: () => setScrollInProgress(false), // Reset scroll progress after scrolling
//         });
//       }
//     };

//     window.addEventListener('wheel', handleScroll);
//     window.addEventListener('touchstart', handleTouchStart);
//     window.addEventListener('touchmove', handleTouchMove);
//     window.addEventListener('touchend', handleTouchEnd);

//     return () => {
//       window.removeEventListener('wheel', handleScroll);
//       window.removeEventListener('touchstart', handleTouchStart);
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [setCurrentSection, touchStartY, touchEndY, scrollInProgress, currentSection]);

//   return (
//     <div className="min-h-screen overflow-hidden">
//       {sections.map((section, index) => (
//         <div
//           key={section}
//           id={section}
//           className="section"
//           ref={(el) => (sectionRefs.current[index] = el)}
//         >
//           {index === 0 && <HeroSection />}
//           {index === 1 && <AboutSection />}
//           {index === 2 && <ProjectsSection />}
//           {index === 3 && <SkillsSection />}
//           {index === 4 && <ExperienceSection />}
//           {index === 5 && <TestimonialSection />}
//           {index === 6 && <ContactSection />}
//         </div>
//       ))}
//     </div>
//   );
// }
