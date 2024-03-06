import { fluidExtractor, fluidCorePlugins, defaultThemeScreensInRems } from 'fluid-tailwind';
import type { Config } from 'tailwindcss';

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
      ...defaultThemeScreensInRems,
      tablet: '52.125rem',
    },
  },
  plugins: [fluidCorePlugins],
};
export default config;
