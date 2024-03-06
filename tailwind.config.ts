import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
      tablet: '834px',
    },
  },
  plugins: [],
};
export default config;
