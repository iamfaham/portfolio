"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", id: "aboutDiv" },
  { label: "Projects", id: "projectsDiv" },
  { label: "Experience", id: "experienceDiv" },
  { label: "Contact", id: "contactDiv" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 py-4 max-md:bg-black/70 max-md:backdrop-blur-md max-md:border-b max-md:border-white/[0.06]">
        <span className="text-white font-extrabold text-base tracking-tight">
          Faham.
        </span>

        {/* Desktop glass pill */}
        <div
          className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md transition-all duration-300 ${
            scrolled ? "bg-white/[0.06]" : "bg-white/[0.03]"
          }`}
        >
          {navLinks.map((link) => (
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

        <div className="flex items-center gap-3">
          <a
            href="https://drive.google.com/drive/folders/16fCN8-NGzxrO5ZB27oA4Gfj1g9il0LlV?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00c6ff]/10 border border-[#00c6ff]/20 text-[#00c6ff] px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#00c6ff]/20 transition-colors duration-200"
          >
            Resume
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-white/60 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-px bg-white/60 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-white/60 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-10 bg-black/95 backdrop-blur-xl md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-white/60 hover:text-white text-2xl font-semibold py-3 border-b border-white/5 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://dev.to/iamfaham"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white text-2xl font-semibold py-3 border-b border-white/5 transition-colors duration-200"
            >
              Blog
            </a>
          </div>
        </div>
      )}
    </>
  );
}
