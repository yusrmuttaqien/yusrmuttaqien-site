import { fluidExtractor, fluidCorePlugins } from 'fluid-tailwind';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const { scrSize } = require('./app/constants');

const config: Config = {
  content: {
    files: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract: fluidExtractor(),
  },
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['var(--font-helvetica-neue)', 'sans-serif'],
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
      },
      colors: {
        green: '#336633',
        grey: '#333333',
        beige: '#F5F5F5',
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
    fluidCorePlugins,
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
