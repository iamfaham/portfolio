# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign iamfaham.me with a modern glassmorphism dark aesthetic — replacing scroll-snap with continuous scroll, replacing Skills with Capabilities, and adding Blog Preview and Testimonials sections.

**Architecture:** Each section is a standalone `"use client"` React component. Data flows from `data/portfolio.json` through typed accessors in `lib/data.ts`. A shared `AnimatedSection` wrapper and `StaggerContainer`/`StaggerItem` pair handle all scroll-triggered Framer Motion entrance animations. A new horizontal `Navbar` replaces the floating right-side `Sidebar`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, react-intersection-observer (already installed), EmailJS, Dev.to public API, GitHub API (existing service unchanged)

---

## File Map

| File | Action |
|------|--------|
| `.gitignore` | Add `.superpowers/` |
| `tailwind.config.ts` | Add `cyan: '#00c6ff'` to theme colors |
| `app/globals.css` | Comment out scroll-snap, add `.glass-card` and `.section-label` utilities |
| `app/layout.tsx` | Change body class from `bg-dark-gray` to `bg-black` |
| `app/page.tsx` | Full rewrite — new section order, remove scroll-container |
| `data/portfolio.json` | Add `stats` object and `testimonials` array |
| `lib/data.ts` | Add `Stats`, `Testimonial` interfaces and `getStats()`, `getTestimonials()` accessors |
| `components/AnimatedSection.tsx` | New — scroll-triggered fade+slide wrapper |
| `components/StaggerContainer.tsx` | New — stagger children on scroll into view |
| `components/Navbar.tsx` | New — horizontal top nav (replaces Sidebar.tsx) |
| `components/HeroSection.tsx` | Full rewrite |
| `components/AboutSection.tsx` | Full rewrite |
| `components/ProjectsSection.tsx` | Full rewrite |
| `components/CapabilitiesSection.tsx` | New (replaces SkillsSection.tsx) |
| `components/SkillsSection.tsx` | Delete |
| `components/ExperienceSection.tsx` | Full rewrite |
| `components/BlogPreview.tsx` | New |
| `components/TestimonialSection.tsx` | Full rewrite |
| `components/ContactSection.tsx` | Full rewrite |

---

## Task 1: Setup — gitignore, Tailwind, globals.css, layout.tsx

**Files:**
- Modify: `.gitignore`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add `.superpowers/` to .gitignore**

Open `.gitignore` and append:
```
# Visual brainstorming sessions
.superpowers/
```

- [ ] **Step 2: Add `cyan` color to Tailwind config**

In `tailwind.config.ts`, extend the colors object to include:
```typescript
colors: {
  'dark-gray': '#121212',
  'light-gray': '#E0E0E0',
  'soft-purple': '#BB86FC',
  'teal': '#03DAC6',
  'cyan': '#00c6ff',
},
```

- [ ] **Step 3: Update globals.css — comment out scroll-snap, add glass-card and section-label utilities**

In `app/globals.css`:

a) In the `.section` block, comment out the scroll-snap lines and performance hints (keep the rest):
```css
.section {
  @apply flex items-center justify-center min-h-screen;
  background-color: black;
  /* scroll-snap-align: start; */
  /* scroll-snap-stop: always; */
  /* will-change: transform; */
  /* backface-visibility: hidden; */
  /* perspective: 1000px; */
  /* transform-style: preserve-3d; */
}
```

b) In the `.scroll-container` block, comment out the snap rule:
```css
.scroll-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  /* scroll-snap-type: y mandatory; */
  scroll-behavior: smooth;
  position: relative;
  width: 100%;
  max-width: 100vw;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
```

c) Append these utility classes at the end of globals.css (before the closing):
```css
/* Glass card — shared across all redesigned sections */
.glass-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}
.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 198, 255, 0.15), transparent);
  pointer-events: none;
}

/* Section label — small uppercase cyan tag above section titles */
.section-label {
  color: rgba(0, 198, 255, 0.5);
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
}

/* Dot grid background applied to page wrapper */
.dot-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

- [ ] **Step 4: Update layout.tsx body class**

In `app/layout.tsx`, change:
```tsx
<body className="bg-dark-gray text-light-gray">
```
to:
```tsx
<body className="bg-black text-light-gray">
```

- [ ] **Step 5: Run dev server and verify no build errors**

```bash
npm run dev
```
Expected: server starts at localhost:3000 with no TypeScript or CSS errors in terminal.

- [ ] **Step 6: Commit**

```bash
git add .gitignore tailwind.config.ts app/globals.css app/layout.tsx
git commit -m "feat: setup redesign foundations — tailwind cyan, glass-card utility, remove scroll-snap"
```

---

## Task 2: Data Layer — portfolio.json + lib/data.ts

**Files:**
- Modify: `data/portfolio.json`
- Modify: `lib/data.ts`

- [ ] **Step 1: Add `stats` and `testimonials` to portfolio.json**

In `data/portfolio.json`, add these two top-level keys (after `"colorMap"`):
```json
"stats": {
  "aiProjects": 3,
  "technologies": 15,
  "githubStars": 24
},
"testimonials": []
```

The `testimonials` array starts empty. Fill it from LinkedIn recommendations before launch using this schema per entry:
```json
{
  "name": "Full Name",
  "role": "Title at Company",
  "text": "The recommendation text.",
  "linkedinUrl": "https://linkedin.com/in/theirhandle"
}
```

- [ ] **Step 2: Add Stats and Testimonial types + accessors to lib/data.ts**

Append to `lib/data.ts`:
```typescript
export interface Stats {
  aiProjects: number;
  technologies: number;
  githubStars: number;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  linkedinUrl: string;
}

export const getStats = (): Stats => {
  return (portfolioData as any).stats as Stats;
};

export const getTestimonials = (): Testimonial[] => {
  return ((portfolioData as any).testimonials ?? []) as Testimonial[];
};
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add data/portfolio.json lib/data.ts
git commit -m "feat: add stats and testimonials to data layer"
```

---

## Task 3: Animation Components

**Files:**
- Create: `components/AnimatedSection.tsx`
- Create: `components/StaggerContainer.tsx`

- [ ] **Step 1: Create AnimatedSection.tsx**

```typescript
// components/AnimatedSection.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ children, className = "", delay = 0 }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create StaggerContainer.tsx**

```typescript
// components/StaggerContainer.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function StaggerContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/AnimatedSection.tsx components/StaggerContainer.tsx
git commit -m "feat: add AnimatedSection and StaggerContainer animation wrappers"
```

---

## Task 4: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

Note: `components/Sidebar.tsx` is kept but no longer imported anywhere after Task 5. Delete it after confirming the new nav works.

- [ ] **Step 1: Create Navbar.tsx**

```typescript
// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <span className="text-white font-extrabold text-base tracking-tight">
        Faham.
      </span>

      <div className="hidden md:flex items-center gap-7">
        {scrollLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200 cursor-pointer"
          >
            {link.label}
          </button>
        ))}
        <Link
          href="/blogs"
          className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
        >
          Blog
        </Link>
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
```

Note: Place your resume PDF at `public/resume.pdf` for the download link to work.

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add horizontal Navbar component"
```

---

## Task 5: Update app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite app/page.tsx**

```typescript
// app/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogPreview from "@/components/BlogPreview";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";

export default function Portfolio() {
  return (
    <div className="dot-grid min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div id="heroDiv"><HeroSection /></div>
        <div id="aboutDiv"><AboutSection /></div>
        <div id="projectsDiv"><ProjectsSection /></div>
        <div id="capabilitiesDiv"><CapabilitiesSection /></div>
        <div id="experienceDiv"><ExperienceSection /></div>
        <div id="blogDiv"><BlogPreview /></div>
        <div id="testimonialsDiv"><TestimonialSection /></div>
        <div id="contactDiv"><ContactSection /></div>
      </main>
    </div>
  );
}
```

Note: `CapabilitiesSection`, `BlogPreview` do not exist yet — Next.js will error until Tasks 9 and 11 are complete. Complete all component tasks before running `npm run dev` to verify the full page.

- [ ] **Step 2: Delete SkillsSection.tsx**

```bash
# Windows PowerShell
Remove-Item "components\SkillsSection.tsx"
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update page.tsx with new section order and Navbar"
```

---

## Task 6: HeroSection

**Files:**
- Modify: `components/HeroSection.tsx`

- [ ] **Step 1: Rewrite HeroSection.tsx**

```typescript
// components/HeroSection.tsx
"use client";

import { getPersonalInfo, getStats } from "@/lib/data";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function HeroSection() {
  const personalInfo = getPersonalInfo();
  const stats = getStats();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pb-24 overflow-hidden">
      {/* Ambient glow blob */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00c6ff]/[0.05] blur-[120px] pointer-events-none -z-0" />

      <StaggerContainer className="relative z-10 flex flex-col items-center">
        {/* Role chip */}
        <StaggerItem>
          <div className="inline-flex items-center border border-[#00c6ff]/20 bg-[#00c6ff]/5 text-[#00c6ff]/70 px-4 py-1.5 rounded-full text-[11px] tracking-[2px] uppercase mb-9">
            AI · ML · GenAI Developer
          </div>
        </StaggerItem>

        {/* Title */}
        <StaggerItem>
          <div className="mb-7">
            <p className="text-white/40 text-2xl font-light tracking-tight mb-2">Hi, I&apos;m</p>
            <h1 className="text-gradient text-6xl md:text-7xl font-black tracking-[-3px] leading-none">
              {personalInfo.name}
            </h1>
          </div>
        </StaggerItem>

        {/* Tagline */}
        <StaggerItem>
          <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-11">
            {personalInfo.description.charAt(0).toUpperCase() + personalInfo.description.slice(1)}
          </p>
        </StaggerItem>

        {/* CTAs */}
        <StaggerItem>
          <div className="flex gap-3 justify-center mb-16">
            <button
              onClick={() => document.getElementById("projectsDiv")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-[#00c6ff]/40 text-[#00c6ff] px-7 py-3 rounded-xl text-sm font-semibold shadow-[0_0_16px_rgba(0,198,255,0.1)] hover:bg-[#00c6ff]/10 transition-colors duration-200"
            >
              View My Work →
            </button>
            <button
              onClick={() => document.getElementById("contactDiv")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/[0.08] text-white/35 px-7 py-3 rounded-xl text-sm hover:text-white/60 transition-colors duration-200"
            >
              Get in Touch
            </button>
          </div>
        </StaggerItem>

        {/* Stat strip */}
        <StaggerItem>
          <div className="glass-card flex divide-x divide-white/[0.05]">
            {[
              { value: `${stats.aiProjects}+`, label: "AI Projects" },
              { value: `${stats.technologies}+`, label: "Technologies" },
              { value: `${stats.githubStars}★`, label: "GitHub Stars" },
            ].map(({ value, label }) => (
              <div key={label} className="px-8 py-3.5 text-center">
                <div className="text-[#00c6ff] text-xl font-extrabold tracking-tight">{value}</div>
                <div className="text-white/20 text-[10px] tracking-widest uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/[0.12] text-[10px] tracking-[2px] uppercase z-10">
        <div className="w-px h-9 bg-gradient-to-b from-[#00c6ff]/40 to-transparent" />
        scroll
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: rewrite HeroSection — centered layout, stat strip, role chip"
```

---

## Task 7: AboutSection

**Files:**
- Modify: `components/AboutSection.tsx`

- [ ] **Step 1: Rewrite AboutSection.tsx**

```typescript
// components/AboutSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { getPersonalInfo } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";

const quickFacts = [
  { icon: "📍", label: "Based in", value: "Buffalo, US" },
  { icon: "🎓", label: "Focus", value: "AI / ML / GenAI" },
  { icon: "💼", label: "Available for", value: "Freelance & Full-time" },
  { icon: "✉️", label: "Contact", value: "m.faham.s@gmail.com" },
];

const interests = ["Generative AI", "Agentic Systems", "LLMs", "Strategy Games"];

export default function AboutSection() {
  const personalInfo = getPersonalInfo();

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">Who I Am</p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">About Me</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 items-start">
          {/* Left col */}
          <AnimatedSection delay={0.1} className="flex flex-col gap-4">
            <div className="w-full aspect-square rounded-2xl border border-[#00c6ff]/15 overflow-hidden relative">
              <Image
                src="/profile.png"
                alt={personalInfo.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>

            <div className="glass-card p-4 flex flex-col gap-3">
              {quickFacts.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-sm w-5 text-center flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-white/65 text-[11px] font-semibold">{label}</p>
                    <p className="text-white/35 text-xs leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right col */}
          <AnimatedSection delay={0.2} className="flex flex-col gap-5 pt-1">
            <p className="text-white/45 text-sm leading-relaxed">
              Hello! I&apos;m{" "}
              <span className="text-[#00c6ff]/80 font-semibold">{personalInfo.name}</span>
              {", "}
              {personalInfo.about.intro.replace(`Hello! I'm ${personalInfo.name}, `, "")}
            </p>
            <p className="text-white/45 text-sm leading-relaxed">{personalInfo.about.expertise}</p>
            <p className="text-white/45 text-sm leading-relaxed">{personalInfo.about.interests}</p>

            <div className="h-px bg-white/5" />

            <div>
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-2.5">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/[0.03] border border-white/[0.07] text-white/35 px-3 py-1 rounded-full text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-[#00c6ff] text-sm font-semibold border-b border-[#00c6ff]/20 pb-0.5 w-fit hover:border-[#00c6ff]/50 transition-colors duration-200"
            >
              Read my latest blogs on Dev.to →
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/AboutSection.tsx
git commit -m "feat: rewrite AboutSection — two-column layout with quick-facts and interests"
```

---

## Task 8: ProjectsSection

**Files:**
- Modify: `components/ProjectsSection.tsx`

- [ ] **Step 1: Rewrite ProjectsSection.tsx**

```typescript
// components/ProjectsSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects, getPersonalInfo, type Project } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const personalInfo = getPersonalInfo();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">What I&apos;ve Built</p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Projects</h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed">
            A selection of things I&apos;ve shipped. Stars and topics pulled live from GitHub.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#00c6ff]/30 border-t-[#00c6ff] rounded-full animate-spin" />
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-8">
            {projects.map((project, index) => {
              const isFeatured = index === 0;
              return (
                <StaggerItem key={project.title} className={isFeatured ? "md:col-span-2" : ""}>
                  <div
                    className="glass-card h-full p-6 flex flex-col gap-3"
                    style={isFeatured ? { borderColor: "rgba(0,198,255,0.15)" } : {}}
                  >
                    {isFeatured && (
                      <span className="inline-flex items-center bg-[#00c6ff]/[0.08] border border-[#00c6ff]/20 text-[#00c6ff]/70 px-2.5 py-0.5 rounded-full text-[10px] tracking-[1px] uppercase w-fit">
                        ★ Featured
                      </span>
                    )}
                    <h3 className="text-white text-base font-bold tracking-tight">{project.title}</h3>
                    <p className="text-white/30 text-xs leading-relaxed flex-1">{project.description}</p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/[0.04] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                      <div className="flex gap-3.5">
                        {project.githubData && (
                          <>
                            <span className="text-white/20 text-[11px]">★ {project.githubData.stargazers_count}</span>
                            <span className="text-white/20 text-[11px]">⑂ {project.githubData.forks_count}</span>
                          </>
                        )}
                      </div>
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c6ff] text-xs font-semibold hover:text-[#00c6ff]/70 transition-colors"
                      >
                        View on GitHub →
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

        <div className="flex justify-center">
          <Link
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/[0.03] border border-white/[0.08] text-white/40 px-7 py-3 rounded-xl text-sm flex items-center gap-2 hover:text-white/60 transition-colors duration-200"
          >
            Explore more on <span className="text-[#00c6ff]/60">GitHub</span> →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProjectsSection.tsx
git commit -m "feat: rewrite ProjectsSection — featured card, star/fork counts, glass cards"
```

---

## Task 9: CapabilitiesSection (new — replaces Skills)

**Files:**
- Create: `components/CapabilitiesSection.tsx`

- [ ] **Step 1: Create CapabilitiesSection.tsx**

```typescript
// components/CapabilitiesSection.tsx
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

const capabilities = [
  {
    icon: "🧠",
    name: "LLM Applications, AI Agents & Agentic Systems",
    description:
      "Building production-ready LLM pipelines, retrieval-augmented generation, autonomous agents, multi-agent orchestration, and agentic workflows that go beyond basic chat.",
    tools: ["LangChain", "OpenAI API", "Supabase Vector", "FastAPI", "CrewAI"],
    wide: true,
  },
  {
    icon: "👁️",
    name: "Computer Vision",
    description:
      "Multimodal models, image classification, object detection, and cross-modal attention systems.",
    tools: ["PyTorch", "Transformers", "OpenCV"],
    wide: false,
  },
  {
    icon: "📈",
    name: "ML & Reinforcement Learning",
    description:
      "Predictive modelling, classical ML pipelines, and RL agents trained on custom environments and reward functions.",
    tools: ["PyTorch", "scikit-learn", "TensorFlow", "Gym"],
    wide: false,
  },
  {
    icon: "⚡",
    name: "AI-Powered Backends",
    description:
      "REST APIs and microservices that wrap ML models, low-latency, scalable, production-ready.",
    tools: ["FastAPI", "PostgreSQL", "Docker"],
    wide: false,
  },
  {
    icon: "🌐",
    name: "Full-Stack Development",
    description:
      "End-to-end web apps with React/Next.js frontends connected to AI backends.",
    tools: ["Next.js", "React", "TypeScript"],
    wide: false,
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12 text-center">
          <p className="section-label" style={{ display: "block", textAlign: "center" }}>
            What I Do
          </p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Capabilities</h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed">
            Areas I&apos;ve shipped in and can hit the ground running on.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.name} className={cap.wide ? "md:col-span-2" : ""}>
              <div className="glass-card h-full p-6 flex flex-col gap-3">
                <span className="text-2xl">{cap.icon}</span>
                <h3 className="text-white text-[15px] font-bold tracking-tight leading-snug">
                  {cap.name}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed flex-1">{cap.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tools.map((tool) => (
                    <span
                      key={tool}
                      className="bg-[#00c6ff]/[0.06] border border-[#00c6ff]/15 text-[#00c6ff]/60 px-2 py-0.5 rounded text-[10px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CapabilitiesSection.tsx
git commit -m "feat: add CapabilitiesSection replacing Skills — domain cards with tools"
```

---

## Task 10: ExperienceSection (timeline)

**Files:**
- Modify: `components/ExperienceSection.tsx`

- [ ] **Step 1: Rewrite ExperienceSection.tsx**

```typescript
// components/ExperienceSection.tsx
"use client";

import { getExperience } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function ExperienceSection() {
  const experiences = getExperience();

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="mb-12">
          <p className="section-label">Where I&apos;ve Worked</p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Experience</h2>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#00c6ff]/40 to-transparent" />

          <StaggerContainer className="flex flex-col">
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.role} className="flex gap-8 pb-9 last:pb-0">
                {/* Dot */}
                <div
                  className={`relative z-10 mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full border-2 border-black ml-[11px] ${
                    index === 0
                      ? "bg-[#00c6ff] shadow-[0_0_10px_rgba(0,198,255,0.5)]"
                      : "bg-[#00c6ff]/20"
                  }`}
                />

                {/* Card */}
                <div className="glass-card flex-1 p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-white text-base font-bold tracking-tight">{exp.role}</h3>
                    <span className="bg-[#00c6ff]/[0.06] border border-[#00c6ff]/15 text-[#00c6ff]/50 px-2.5 py-0.5 rounded-full text-[10px] whitespace-nowrap flex-shrink-0">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs italic mb-3">{exp.company}</p>
                  <p className="text-white/30 text-sm leading-relaxed mb-4">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white/[0.04] border border-white/[0.07] text-white/25 px-2 py-0.5 rounded text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ExperienceSection.tsx
git commit -m "feat: rewrite ExperienceSection as vertical timeline"
```

---

## Task 11: BlogPreview (new)

**Files:**
- Create: `components/BlogPreview.tsx`

- [ ] **Step 1: Create BlogPreview.tsx**

```typescript
// components/BlogPreview.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

interface DevToArticle {
  id: number;
  title: string;
  url: string;
  cover_image: string | null;
  readable_publish_date: string;
  reading_time_minutes: number;
  tag_list: string[];
}

export default function BlogPreview() {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=iamfaham&per_page=3")
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Writing</p>
            <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Latest Posts</h2>
          </div>
          <Link
            href="/blogs"
            className="text-[#00c6ff] text-xs font-semibold border-b border-[#00c6ff]/20 pb-0.5 mb-1.5 whitespace-nowrap hover:border-[#00c6ff]/50 transition-colors"
          >
            View all on Dev.to →
          </Link>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-2 border-[#00c6ff]/30 border-t-[#00c6ff] rounded-full animate-spin" />
          </div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {articles.map((article) => (
              <StaggerItem key={article.id}>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex flex-col overflow-hidden h-full hover:border-[#00c6ff]/20 transition-colors duration-200 block no-underline"
                >
                  {/* Cover image */}
                  <div className="relative w-full h-40 bg-gradient-to-br from-[#0d1117] to-[#1a1f2e] flex-shrink-0">
                    {article.cover_image && (
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 to-transparent" />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    {article.tag_list[0] && (
                      <span className="bg-[#00c6ff]/[0.06] border border-[#00c6ff]/15 text-[#00c6ff]/60 px-2.5 py-0.5 rounded-full text-[10px] tracking-[1px] uppercase w-fit">
                        {article.tag_list[0]}
                      </span>
                    )}
                    <h3 className="text-white text-sm font-bold leading-snug tracking-tight flex-1">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                      <div className="flex gap-3 text-white/20 text-[11px]">
                        <span>{article.readable_publish_date}</span>
                        <span>{article.reading_time_minutes} min read</span>
                      </div>
                      <span className="text-[#00c6ff] text-[11px] font-semibold">Read →</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BlogPreview.tsx
git commit -m "feat: add BlogPreview — 3 Dev.to posts with cover images on homepage"
```

---

## Task 12: TestimonialSection

**Files:**
- Modify: `components/TestimonialSection.tsx`

- [ ] **Step 1: Rewrite TestimonialSection.tsx**

```typescript
// components/TestimonialSection.tsx
"use client";

import { getTestimonials } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";

export default function TestimonialSection() {
  const testimonials = getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="mb-12 text-center">
          <p className="section-label" style={{ display: "block", textAlign: "center" }}>
            Kind Words
          </p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Testimonials</h2>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <StaggerItem key={t.name}>
                <div className="glass-card p-6 flex flex-col gap-4 h-full">
                  <div className="text-[#00c6ff]/20 font-serif text-5xl leading-none">&ldquo;</div>
                  <p className="text-white/40 text-sm leading-relaxed italic flex-1">{t.text}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-9 h-9 rounded-full bg-[#00c6ff]/10 border border-[#00c6ff]/20 flex items-center justify-center text-[#00c6ff]/50 text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate">{t.name}</p>
                      <p className="text-white/25 text-[11px] truncate">{t.role}</p>
                    </div>
                    {t.linkedinUrl && (
                      <a
                        href={t.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00c6ff]/40 border border-[#00c6ff]/15 px-2 py-0.5 rounded text-[10px] hover:text-[#00c6ff]/60 transition-colors flex-shrink-0"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/TestimonialSection.tsx
git commit -m "feat: rewrite TestimonialSection — reads from portfolio.json, hides when empty"
```

---

## Task 13: ContactSection

**Files:**
- Modify: `components/ContactSection.tsx`

- [ ] **Step 1: Rewrite ContactSection.tsx**

```typescript
// components/ContactSection.tsx
"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { getPersonalInfo } from "@/lib/data";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const personalInfo = getPersonalInfo();

  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY!;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const result = await emailjs.send(serviceId, templateId, formData, publicKey);
      if (result.text === "OK") {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(true);
      } else {
        alert("Failed to send your message. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const socials = [
    { icon: faLinkedin, label: "LinkedIn", handle: "iamfaham", url: personalInfo.social.linkedin },
    { icon: faGithub, label: "GitHub", handle: "iamfaham", url: personalInfo.social.github },
    { icon: faXTwitter, label: "Twitter / X", handle: "iamfaham", url: personalInfo.social.twitter },
  ];

  return (
    <section className="relative w-full py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="mb-12 text-center">
          <p className="section-label" style={{ display: "block", textAlign: "center" }}>
            Say Hello
          </p>
          <h2 className="text-white text-5xl font-extrabold tracking-[-1.5px]">Get in Touch</h2>
          <p className="text-white/25 text-sm mt-2.5 leading-relaxed max-w-md mx-auto">
            Have a project in mind or just want to talk AI? Drop a message and I&apos;ll get back to you.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-[1fr_280px] gap-5 items-start">
          {/* Form */}
          <div className="glass-card p-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {(
                [
                  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ] as const
              ).map(({ name, label, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-white/25 text-[11px] tracking-widest uppercase">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/70 text-sm placeholder:text-white/20 outline-none focus:border-[#00c6ff]/30 focus:bg-[#00c6ff]/[0.02] transition-colors"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/25 text-[11px] tracking-widest uppercase">Message</label>
                <textarea
                  name="message"
                  placeholder="What&apos;s on your mind?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/70 text-sm placeholder:text-white/20 outline-none focus:border-[#00c6ff]/30 focus:bg-[#00c6ff]/[0.02] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSending || isSubmitted}
                className="bg-[#00c6ff]/10 border border-[#00c6ff]/30 text-[#00c6ff] py-3 rounded-xl text-sm font-semibold hover:bg-[#00c6ff]/18 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : isSubmitted ? "Sent!" : "Send Message →"}
              </button>
            </form>
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            <div className="glass-card p-5">
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-3.5">Find me on</p>
              <div className="flex flex-col gap-2.5">
                {socials.map(({ icon, label, handle, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#00c6ff]/20 transition-colors"
                  >
                    <FontAwesomeIcon icon={icon} className="text-white/40 text-base w-5 flex-shrink-0" />
                    <span className="text-white/50 text-xs font-medium">{label}</span>
                    <span className="text-[#00c6ff]/50 text-[11px] ml-auto">{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <p className="text-white/20 text-[10px] tracking-[2px] uppercase mb-2">Or email directly</p>
              <p className="text-[#00c6ff] text-sm font-semibold">m.faham.s@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify full build**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Run dev and do a full visual check**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Navbar is fixed at top, becomes opaque on scroll
- Hero: role chip, gradient name animation, stat strip with 3 values, scroll hint
- About: two-column on desktop, photo + quick-facts left, text + interests right
- Projects: loading spinner then featured card (2-wide) + 2 regular cards, star/fork counts
- Capabilities: 5 cards, wide LLM card
- Experience: vertical timeline with glowing dot on first entry
- Blog Preview: 3 cards with cover images from Dev.to (may be empty if no articles found)
- Testimonials: hidden (testimonials array is empty)
- Contact: form left, socials + email right

- [ ] **Step 4: Commit**

```bash
git add components/ContactSection.tsx
git commit -m "feat: rewrite ContactSection — two-column layout with socials panel"
```

---

## Task 14: Final cleanup and production build

- [ ] **Step 1: Delete Sidebar.tsx**

```bash
# PowerShell
Remove-Item "components\Sidebar.tsx"
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: build completes successfully. Fix any TypeScript or build errors before proceeding.

- [ ] **Step 3: Add resume PDF**

Place your resume at `public/resume.pdf` so the Navbar Resume button works.

- [ ] **Step 4: Add testimonials to portfolio.json once you have them**

In `data/portfolio.json`, populate the `testimonials` array:
```json
"testimonials": [
  {
    "name": "Full Name",
    "role": "Their Title, Company",
    "text": "Paste recommendation text here.",
    "linkedinUrl": "https://linkedin.com/in/theirhandle"
  }
]
```
The section auto-shows when the array is non-empty.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio redesign — glassmorphism dark, capabilities section, blog preview, timeline experience"
```
