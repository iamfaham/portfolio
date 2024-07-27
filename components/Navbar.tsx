'use client'

import React, { useEffect, useState } from 'react';
import { Dock, DockIcon } from '@/components/magicui/dock';
import Link from 'next/link';
import { FaHome, FaUser, FaProjectDiagram, FaLightbulb, FaBriefcase, FaEnvelope } from 'react-icons/fa';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const sections = [
      document.getElementById('about'),
      document.getElementById('projects'),
      document.getElementById('skills'),
      document.getElementById('experience'),
    ];

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

  return (
    <div className={`fixed top-2 left-0 right-0 z-50 transition-opacity duration-300 ${showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Dock magnification={60} distance={100} className="bg-background/70 backdrop-blur-lg p-2 rounded-lg border-slate-700">
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href="#hero" className="flex items-center justify-center w-full h-full">
            <FaHome className="text-foreground size-full" />
          </Link>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href="#about" className="flex items-center justify-center w-full h-full">
            <FaUser className="text-foreground size-full" />
          </Link>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href="#projects" className="flex items-center justify-center w-full h-full">
            <FaProjectDiagram className="text-foreground size-full" />
          </Link>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href="#skills" className="flex items-center justify-center w-full h-full">
            <FaLightbulb className="text-foreground size-full" />
          </Link>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href="#experience" className="flex items-center justify-center w-full h-full">
            <FaBriefcase className="text-foreground size-full" />
          </Link>
        </DockIcon>
        <DockIcon className="bg-black/10 dark:bg-white/10 p-3 rounded-full border-none">
          <Link href="#contact" className="flex items-center justify-center w-full h-full">
            <FaEnvelope className="text-foreground size-full" />
          </Link>
        </DockIcon>
      </Dock>
    </div>
  );
}
