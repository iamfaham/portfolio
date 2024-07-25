// tailwind.config.ts
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
    },
  },
  plugins: [],
};

export default config;
