"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import useSectionVisibility from "@/hooks/useSectionVisibility";
import { throttle } from "@/utils/throttle";
import { debounce } from "@/utils/debounce";
import { getSections } from "@/lib/data";

const sections = getSections();

export default function Portfolio() {
  const { sectionRefs, currentSection, setCurrentSection } =
    useSectionVisibility(sections);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  useEffect(() => {
    const handleScroll = throttle((event: WheelEvent) => {
      // Don't handle scroll if dialog is open or already scrolling
      if (isScrolling || isDialogOpen) return;

      // Prevent default browser scrolling
      event.preventDefault();
      event.stopPropagation();

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
      // Don't handle touch if dialog is open
      if (isDialogOpen) return;
      setTouchStartY(event.touches[0].clientY);
      setTouchEndY(event.touches[0].clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      // Don't handle touch if dialog is open
      if (isDialogOpen) return;
      setTouchEndY(event.touches[0].clientY);
    };

    const handleTouchEnd = debounce(
      () => {
        // Don't handle touch if dialog is open or already scrolling
        if (isScrolling || isDialogOpen) return;

        setIsScrolling(true);

        const touchDistance = touchStartY - touchEndY;
        if (touchDistance > 50) {
          setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
        } else if (touchDistance < -50) {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }

        setTimeout(
          () => {
            setIsScrolling(false);
          },
          isMobile() ? 500 : 2000
        );
      },
      isMobile() ? 200 : 2000
    );

    // Listen for dialog open/close events
    const handleDialogToggle = (event: CustomEvent) => {
      setIsDialogOpen(event.detail.isOpen);

      // When dialog closes, ensure custom scrolling is properly restored
      if (!event.detail.isOpen) {
        // Small delay to ensure DOM cleanup is complete
        setTimeout(() => {
          // Force a reflow to ensure proper rendering
          document.body.offsetHeight;
        }, 100);
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("dialogOpen", handleDialogToggle as EventListener);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener(
        "dialogOpen",
        handleDialogToggle as EventListener
      );
    };
  }, [isScrolling, touchStartY, touchEndY, setCurrentSection, isDialogOpen]);

  return (
    <main>
      <motion.div
        className="min-h-screen overflow-hidden"
        initial={{ y: 0 }}
        animate={{ y: -currentSection * 100 + "vh" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
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
