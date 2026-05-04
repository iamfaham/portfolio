"use client";

import { useState, useEffect } from "react";

const scrollLinks = [
  { label: "About", id: "aboutDiv" },
  { label: "Projects", id: "projectsDiv" },
  { label: "Experience", id: "experienceDiv" },
  { label: "Contact", id: "contactDiv" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4">
      <span className="text-white font-extrabold text-base tracking-tight">
        Faham.
      </span>

      {/* Glass pill — only the nav links get the glassmorphism treatment */}
      <div
        className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md transition-all duration-300 ${
          scrolled ? "bg-white/[0.06]" : "bg-white/[0.03]"
        }`}
      >
        {scrollLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="text-white/40 hover:text-white/80 text-sm px-4 py-1.5 rounded-full hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
          >
            {link.label}
          </button>
        ))}
        <a
          href="https://dev.to/iamfaham"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white/80 text-sm px-4 py-1.5 rounded-full hover:bg-white/[0.06] transition-all duration-200"
        >
          Blog
        </a>
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#00c6ff]/10 border border-[#00c6ff]/20 text-[#00c6ff] px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#00c6ff]/20 transition-colors duration-200"
      >
        Resume ↓
      </a>
    </nav>
  );
}
