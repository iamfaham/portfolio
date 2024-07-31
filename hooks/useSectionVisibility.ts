// hooks/useSectionVisibility.ts
import { useEffect, useRef, useState } from 'react';

const useSectionVisibility = (sections: string[]) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionRefs.current.findIndex(
              (section) => section === entry.target
            );
            if (sectionIndex !== -1) {
              setCurrentSection(sectionIndex);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (sectionRefs.current) {
        sectionRefs.current.forEach((ref) => {
          if (ref) {
            observer.unobserve(ref);
          }
        });
      }
    };
  }, [sections]);

  return { sectionRefs, currentSection, setCurrentSection };
};

export default useSectionVisibility;
