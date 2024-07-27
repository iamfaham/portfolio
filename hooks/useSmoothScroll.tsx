// hooks/useSmoothScroll.tsx
import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';

export const useSmoothScroll = (currentSection: number, setCurrentSection: (index: number) => void) => {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section');

    const handleWheel = (event: WheelEvent) => {
      if (isAnimating) return;

      event.preventDefault();

      if (event.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else if (event.deltaY < 0 && currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isAnimating, setCurrentSection]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section');
    if (sections[currentSection]) {
      setIsAnimating(true);
      controls.start({ y: -sections[currentSection].offsetTop, transition: { duration: 0.5 } })
        .then(() => setIsAnimating(false));
    }
  }, [currentSection, controls]);

  return controls;
};
