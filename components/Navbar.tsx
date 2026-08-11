"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", id: "aboutDiv" },
  { label: "Experience", id: "experienceDiv" },
  { label: "Projects", id: "projectsDiv" },
  { label: "Expertise", id: "capabilitiesDiv" },
  { label: "Contact", id: "contactDiv" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass = (id: string) =>
    `text-sm px-3 py-1.5 rounded-full transition-all duration-200 ${
      activeId === id
        ? "text-[#00c6ff] bg-[#00c6ff]/[0.08]"
        : "text-white/40 hover:text-white/80 hover:bg-white/[0.06]"
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-10 py-4 max-md:bg-black/70 max-md:backdrop-blur-md max-md:border-b max-md:border-white/[0.06]">
        <a href="#heroDiv" onClick={() => scrollTo("heroDiv")} className="text-white font-extrabold text-base tracking-tight">
          Faham.
        </a>

        <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-white/[0.06]" : "bg-white/[0.03]"}`}>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className={linkClass(link.id)}>
              {link.label}
            </button>
          ))}
          <a href="https://dev.to/iamfaham" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 text-sm px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all duration-200">
            Blog
          </a>
          <a href="/play" className="text-white/40 hover:text-[#00c6ff]/80 text-sm px-3 py-1.5 rounded-full hover:bg-[#00c6ff]/[0.06] transition-all duration-200">
            Play
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://drive.google.com/drive/folders/16fCN8-NGzxrO5ZB27oA4Gfj1g9il0LlV?usp=drive_link" target="_blank" rel="noopener noreferrer" className="bg-[#00c6ff]/10 border border-[#00c6ff]/20 text-[#00c6ff] px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#00c6ff]/20 transition-colors duration-200">
            View résumé
          </a>
          <button onClick={() => setMenuOpen((open) => !open)} className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1" aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span className={`block h-px bg-white/60 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block h-px bg-white/60 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-white/60 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-20 px-6 pb-10 bg-black/95 backdrop-blur-xl md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="flex flex-col gap-1" onClick={(event) => event.stopPropagation()}>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={`text-left text-2xl font-semibold py-3 border-b border-white/5 transition-colors duration-200 ${activeId === link.id ? "text-[#00c6ff]" : "text-white/60 hover:text-white"}`}>
                {link.label}
              </button>
            ))}
            <a href="https://dev.to/iamfaham" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white text-2xl font-semibold py-3 border-b border-white/5 transition-colors duration-200">Blog</a>
            <a href="/play" onClick={() => setMenuOpen(false)} className="text-[#00c6ff]/60 hover:text-[#00c6ff] text-2xl font-semibold py-3 border-b border-white/5 transition-colors duration-200">Play</a>
          </div>
        </div>
      )}
    </>
  );
}
