'use client';

import React, { useEffect, useState } from 'react';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { scrollToSection } from '@/utils/scrollToSection';
import { FaUser, FaProjectDiagram, FaLightbulb, FaBriefcase, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'experience'];
    const sections = sectionIds.map(id => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some(entry => entry.isIntersecting);
        setShowNavbar(isVisible);
      },
      { threshold: [0.1, 0.5, 0.9] }
    );

    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      } else {
        console.error(`Section with ID "${section}" not found.`);
      }
    });

    return () => {
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleLinkClick = (id: string) => {
    console.log(`Navigating to section: ${id}`);
    scrollToSection(id);
  };

  return (
    <div className={`fixed top-2 left-0 right-0 z-50 transition-opacity duration-300 ${showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Dock magnification={60} distance={100} className="bg-background/70 backdrop-blur-lg p-2 rounded-lg border-slate-800">
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <button onClick={() => handleLinkClick('about')} className="flex items-center justify-center w-full h-full">
            <FaUser className="text-foreground size-full" />
          </button>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <button onClick={() => handleLinkClick('projects')} className="flex items-center justify-center w-full h-full">
            <FaProjectDiagram className="text-foreground size-full" />
          </button>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <button onClick={() => handleLinkClick('skills')} className="flex items-center justify-center w-full h-full">
            <FaLightbulb className="text-foreground size-full" />
          </button>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <button onClick={() => handleLinkClick('experience')} className="flex items-center justify-center w-full h-full">
            <FaBriefcase className="text-foreground size-full" />
          </button>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href='/blogs' target='_blank' className="flex items-center justify-center w-full h-full">
            <FaEdit className="text-foreground size-full" />
          </Link>
        </DockIcon>
      </Dock>
    </div>
  );
}
