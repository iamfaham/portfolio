# Portfolio Redesign — Design Spec
**Date:** 2026-05-06
**Status:** Approved

---

## Overview

Full visual and structural overhaul of iamfaham.me. Goal: more modern, realistic, and distinctive. Direction: centered hero + glassmorphism dark aesthetic using the existing cyan/teal palette on pure black, with Framer Motion scroll-triggered animations replacing CSS scroll-snap.

---

## Global Changes

- **Scroll behaviour:** Remove CSS scroll-snap. Switch to continuous scroll. Framer Motion handles all section entrance animations (fade + slide-up on scroll into view).
- **Background:** Pure black (`#000`) with a dot-grid overlay (`radial-gradient` 1px dots at 32px intervals, 3% opacity). Ambient cyan/teal glow blobs per section via `position: fixed` blurred divs.
- **Cards:** Consistent glass card style across all sections — `rgba(255,255,255,0.025)` background, `rgba(255,255,255,0.07)` border, 16px border-radius, 1px top highlight gradient in cyan.
- **Palette:** Unchanged from original — black base, `#00c6ff` cyan primary, `#03DAC6` teal secondary, `#E0E0E0` body text.
- **Typography:** Section headers use a small uppercase cyan label above the main title. No em-dashes anywhere.
- **Nav:** Top horizontal navbar (replaces right-side floating dots). Resume download button top-right.

---

## Section-by-Section Design

### 1. Navbar (new)
- Full-width, borderless top bar with subtle bottom border (`rgba(255,255,255,0.04)`).
- Left: `Faham.` logo mark.
- Centre: nav links — About, Projects, Experience, Blog, Contact.
- Right: Resume download button styled as a cyan-tinted ghost button.

### 2. Hero
- **Layout:** Single centered column.
- **Elements (top to bottom):**
  1. Role chip — `AI · ML · GenAI Developer`, cyan pill border.
  2. Large title — `Hi, I'm` in muted weight above, `Syed Mohammed Faham` in the existing animated gradient (`#00c6ff → #00ffcc → #00c6ff`, cycling via `gradient-animation` keyframes).
  3. Tagline — 1–2 lines describing what he builds, `rgba(255,255,255,0.3)`.
  4. Two CTAs — `View My Work →` (cyan ghost button) and `Get in Touch` (plain ghost).
  5. Stat strip — glass pill with 3 stats: **AI Projects**, **Technologies**, **GitHub Stars**. No "Years of Experience".
  6. Scroll hint — thin vertical line fading to transparent, `scroll` label beneath.
- **Background:** Dot-grid + single large cyan glow blob centred above.

### 3. About
- **Layout:** Two-column — 220px left, flexible right.
- **Left column:**
  - Profile photo in a rounded card (20px radius, cyan border tint).
  - Quick-facts glass card: Based in (Buffalo, US), Focus (AI / ML / GenAI), Available for (Freelance & Full-time), Contact email.
- **Right column:**
  - 3 text paragraphs from `portfolio.json` personal.about fields. Key phrases highlighted in `rgba(0,198,255,0.8)`.
  - Horizontal divider.
  - Interests tags row: Generative AI, Agentic Systems, LLMs, Strategy Games.
  - Blog link: `Read my latest blogs on Dev.to →` in cyan.

### 4. Projects
- **Layout:** 3-column grid.
- **Featured card:** The first project in `portfolio.json` is always treated as featured. Spans 2 columns, brighter top-border gradient, `★ Featured` cyan badge.
- **All cards contain:** Name, description, topic tags (from GitHub API), star count, fork count, `View on GitHub →` link. No language row.
- **Data source:** Existing `getProjects()` / `githubService` — no changes needed.
- **CTA below grid:** `Explore more on GitHub →` ghost button.

### 5. Capabilities (replaces Skills)
- **Layout:** 3-column grid with one wide card (span 2).
- **Wide card:** LLM Applications, AI Agents & Agentic Systems — the primary domain.
- **Other cards:** Computer Vision, ML & Reinforcement Learning, AI-Powered Backends, Full-Stack Development.
- **Card structure:** Emoji icon, domain name, 1–2 sentence description (no em-dashes), tool tags in cyan.
- **Data source:** Hardcoded in component (not driven by `portfolio.json` — domains are curated, not a list).

### 6. Experience
- **Layout:** Vertical timeline. Max-width 760px, centred.
- **Timeline line:** 1px left-side line, `linear-gradient` from `rgba(0,198,255,0.4)` to transparent.
- **Dots:** Bright glowing cyan dot for most recent role, dimmed (`rgba(0,198,255,0.2)`) for older ones.
- **Card structure:** Role (bold), duration badge (cyan pill, top-right), company (muted italic), description, tech tags.
- **Data source:** `portfolio.json` experience array — no structural changes needed.

### 7. Blog Preview (new homepage section)
- **Layout:** 3-column grid.
- **Card structure:** Cover image (160px tall, from Dev.to API `cover_image` field), topic tag, title, date + read time, `Read →` link.
- **Header:** `Latest Posts` with `View all on Dev.to →` link top-right.
- **Data source:** Dev.to public API — reuse logic from existing `BlogCards` component, limit to 3 posts.

### 8. Testimonials (new)
- **Layout:** 3-column grid.
- **Card structure:** Large `"` quote mark (cyan, 48px), italic quote text, footer with initials avatar + name + role + LinkedIn badge link.
- **Data source:** New `testimonials` array in `portfolio.json`. Schema:
  ```json
  {
    "name": "string",
    "role": "string",
    "text": "string",
    "linkedinUrl": "string"
  }
  ```
- Add typed accessor `getTestimonials()` in `lib/data.ts`.

### 9. Contact
- **Layout:** Two-column — form left, info panel right.
- **Form card:** Name, Email, Message fields with labelled inputs; cyan `Send Message →` button. EmailJS unchanged.
- **Right panel:**
  - Social links card — LinkedIn, GitHub, X/Twitter as clickable rows with handle shown.
  - Email card — direct email address in cyan.

---

## Animations

All handled via Framer Motion:
- Section entrance: `opacity: 0, y: 30` → `opacity: 1, y: 0` on scroll into view (react-intersection-observer already installed).
- Cards stagger with `0.1s` delay between children.
- Hero title: existing `blur-in` animation kept.
- Name gradient: existing `gradient-animation` keyframes kept.
- Stat strip: count-up animation on first view (optional, stretch goal).

---

## New Data in portfolio.json

```json
"testimonials": [
  {
    "name": "",
    "role": "",
    "text": "",
    "linkedinUrl": ""
  }
]
```

User fills these from LinkedIn recommendations before launch.

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `app/globals.css` | Remove scroll-snap rules, keep as comments. Add dot-grid base style. |
| `app/page.tsx` | Remove scroll-container wrapper. Add new section order including Testimonials and Blog Preview. |
| `app/layout.tsx` | No changes needed. |
| `components/Sidebar.tsx` | Replace with horizontal `Navbar` component. |
| `components/HeroSection.tsx` | Full rewrite to centered layout. |
| `components/AboutSection.tsx` | Full rewrite to two-column layout. |
| `components/ProjectsSection.tsx` | Rewrite card rendering. Remove language row. Add featured card logic. |
| `components/SkillsSection.tsx` | Delete. Replace with `CapabilitiesSection.tsx`. |
| `components/CapabilitiesSection.tsx` | New component. Hardcoded domain cards. |
| `components/ExperienceSection.tsx` | Rewrite to vertical timeline layout. |
| `components/BlogPreview.tsx` | New component. Fetches 3 posts from Dev.to API (`https://dev.to/api/articles?username=iamfaham&per_page=3`), renders image cards using `cover_image` field. |
| `components/TestimonialSection.tsx` | Rewrite existing component to read from `portfolio.json` testimonials array. |
| `components/ContactSection.tsx` | Rewrite to two-column layout. |
| `lib/data.ts` | Add `getTestimonials()` accessor and `Testimonial` interface. |
| `data/portfolio.json` | Add `testimonials` array. |
