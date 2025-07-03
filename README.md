# Developer Portfolio – Modern Next.js Template

This is a modern, interactive portfolio website template for developers. Clone it, update `portfolio.json`, and use it freely. The site showcases projects, skills, experience, and contact information in a visually engaging and responsive format. All content is easily customizable via a single JSON file.

## ✨ Features

- **Animated full-page sections** for Hero, About, Projects, Skills, Experience, and Contact
- **Smooth scroll and swipe navigation** (desktop and mobile)
- **Animated cursor and magic UI effects**
- **Responsive design** for all devices
- **Dynamic blog fetching** from Dev.to with animated loader
- **All data (projects, skills, experience, etc.) is managed via a single JSON file for easy updates**
- **Modern UI/UX** with Tailwind CSS, Framer Motion, and custom components

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [EmailJS](https://www.emailjs.com/) (for contact form)

## 📁 Project Structure

- `app/` – Next.js app directory (pages, layout, global styles)
- `components/` – All UI and section components
- `components/magicui/` – Custom animated UI elements
- `components/ui/` – Additional UI utilities (e.g., smooth cursor)
- `lib/` – Data access and utility functions
- `data/portfolio.json` – All portfolio content (projects, skills, experience, personal info, color map)
- `public/` – Static assets (images, favicon, etc.)

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Customization

- **Edit `data/portfolio.json`** to update your projects, skills, experience, and personal info. This is the only file you need to change to personalize the portfolio for yourself.
- **Images:** Place your profile and project images in the `public/` directory and reference them in the JSON or components.
- **Styling:** Tweak Tailwind classes or add new styles in `app/globals.css`.

## 🔍 SEO Configuration

For proper SEO, update these files with your domain information:

- **`next-sitemap.config.js`** - Set your `siteUrl`
- **`public/robots.txt`** - Update the Host and Sitemap URLs
- **`public/sitemap.xml`** and **`public/sitemap-0.xml`** - Update `siteUrl` references in `next-sitemap.config.js` and it will generate these files automatically on build

The sitemap will be automatically generated when you build the project.

## 📬 Contact

The contact form uses [EmailJS](https://www.emailjs.com/). Set your EmailJS keys in your environment variables for it to work.

---

**This project is a modern developer portfolio template. Clone it, update `portfolio.json`, and make it your own!**
