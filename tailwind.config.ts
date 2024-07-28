// tailwind.config.ts
/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#121212',
        'light-gray': '#E0E0E0',
        'soft-purple': '#BB86FC',
        'teal': '#03DAC6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgba(18, 18, 18, 0.7), rgba(0, 0, 0, 1))',
      },
      animation: {
        meteor: "meteor 5s linear infinite",
        pulse: "pulse var(--duration) ease-out infinite",
        backgroundPositionSpin:
        "background-position-spin 3000ms infinite alternate",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--pulse-color)" },
          "50%": { boxShadow: "0 0 0 8px var(--pulse-color)" },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
