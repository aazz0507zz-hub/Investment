import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          DEFAULT: '#1a3d2b',
          light: '#2d5a3d',
          dark: '#0f2519',
        },
        charcoal: {
          DEFAULT: '#1c1c1e',
          light: '#2c2c2e',
          medium: '#3a3a3c',
        },
        ivory: {
          DEFAULT: '#faf7f2',
          warm: '#f5f0e8',
          muted: '#ede8df',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#dbb96a',
          dark: '#a8873a',
          pale: '#f5e9c8',
        },
        calm: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
        },
      },
      fontFamily: {
        arabic: ['Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, #0f2519 0%, #1a3d2b 50%, #0f2519 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
