import { useEffect, useState, useRef } from 'react';
import { useAnimation } from 'framer-motion';

export const useSmoothScroll = (currentSection: number, setCurrentSection: (index: number) => void, isInteractingWithIconCloud: boolean) => {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);
  const isInteractingRef = useRef(isInteractingWithIconCloud);

  useEffect(() => {
    isInteractingRef.current = isInteractingWithIconCloud;
  }, [isInteractingWithIconCloud]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.section');
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (event: WheelEvent) => {
      console.log('Wheel event:', event);
      console.log('isAnimating:', isAnimating);
      console.log('isInteractingWithIconCloud:', isInteractingRef.current);
      if (isAnimating || isInteractingRef.current) return;

      event.preventDefault();

      if (event.deltaY > 0 && currentSection < sections.length - 1) {
        console.log('Scrolling to next section');
        setCurrentSection(currentSection + 1);
      } else if (event.deltaY < 0 && currentSection > 0) {
        console.log('Scrolling to previous section');
        setCurrentSection(currentSection - 1);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndY = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      console.log('Touch end event');
      console.log('isAnimating:', isAnimating);
      console.log('isInteractingWithIconCloud:', isInteractingRef.current);
      if (isAnimating || isInteractingRef.current) return;

      if (touchStartY - touchEndY > 50) {
        // Swiped up
        if (currentSection < sections.length - 1) {
          console.log('Swiped up - Scrolling to next section');
          setCurrentSection(currentSection + 1);
        }
      } else if (touchEndY - touchStartY > 50) {
        // Swiped down
        if (currentSection > 0) {
          console.log('Swiped down - Scrolling to previous section');
          setCurrentSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
