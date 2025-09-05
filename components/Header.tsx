"use client";

import { useEffect, useState } from "react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("heroDiv");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = [
      "heroDiv",
      "aboutDiv",
      "projectsDiv",
      "skillsDiv",
      "experienceDiv",
      "contactDiv",
    ];

    // Use Intersection Observer for better detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: "-10% 0px -10% 0px", // Add some margin for better detection
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    // Fallback scroll handler for progress bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { name: "Home", id: "heroDiv" },
    { name: "About", id: "aboutDiv" },
    { name: "Projects", id: "projectsDiv" },
    { name: "Skills", id: "skillsDiv" },
    { name: "Experience", id: "experienceDiv" },
    { name: "Contact", id: "contactDiv" },
  ];

  return (
    <>
      {/* Scroll progress indicator */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating navigation overlay */}
      <nav className="floating-nav">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div
              key={item.id}
              className={`nav-dot ${isActive ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
              title={item.name}
            >
              <div className="nav-tooltip">{item.name}</div>
            </div>
          );
        })}
      </nav>
    </>
  );
}
