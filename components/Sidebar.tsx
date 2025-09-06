"use client";

import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCode,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";

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

    // Fallback scroll handler for progress bar - throttled for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min((scrollTop / docHeight) * 100, 100);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
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
    { name: "Home", id: "heroDiv", icon: FaHome },
    { name: "About", id: "aboutDiv", icon: FaUser },
    { name: "Projects", id: "projectsDiv", icon: FaProjectDiagram },
    { name: "Skills", id: "skillsDiv", icon: FaCode },
    { name: "Experience", id: "experienceDiv", icon: FaBriefcase },
    { name: "Contact", id: "contactDiv", icon: FaEnvelope },
  ];

  return (
    <>
      {/* Floating navigation overlay */}
      <nav className="floating-nav">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-dot ${isActive ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
              title={item.name}
            >
              <IconComponent className="nav-icon" />
              <div className="nav-tooltip">{item.name}</div>
            </div>
          );
        })}
      </nav>
    </>
  );
}
