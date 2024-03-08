import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const { scrSize, COLOR_BEIGE, COLOR_GREEN, COLOR_GREY } = require('./app/constants');

const config: Config = {
  content: {
    files: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['var(--font-helvetica-neue)', 'sans-serif'],
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
      },
      colors: {
        green: COLOR_GREEN,
        grey: COLOR_GREY,
        beige: COLOR_BEIGE,
      },
      backdropBlur: {
        8: '8px',
      },
    },
    screens: {
      sm: scrSize('sm', true),
      md: scrSize('md', true),
      lg: scrSize('lg', true),
      xl: scrSize('xl', true),
      '2xl': scrSize('2xl', true),
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.translate-center': {
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          left: '50%',
          top: '50%',
        },
      });
    }),
  ],
};

export default config;
