import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const {
  scrSize,
  COLOR_BEIGE,
  COLOR_GREEN,
  COLOR_GREY,
} = require('./app/constants/tailwind-config');

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
    plugin(function ({ addComponents }) {
      addComponents({
        '.translate-center': {
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          left: '50%',
          top: '50%',
        },
        '.container': {
          paddingInline: 'clamp(1.125rem, 0.0341rem + 5.4545vw, 1.5rem)',
          maxWidth: '80rem',
          marginInline: 'auto',
          '@screen lg': {
            paddingInline: 'clamp(1.5rem, -6.4473rem + 15.2466vw, 5.75rem)',
          },
        },
        '.body-subheading': {
          textTransform: 'uppercase',
          fontSize: 'clamp(0.75rem, -0.25rem + 5vw, 1.0938rem)',
          fontWeight: '500',
          '@screen md': {
            fontSize: 'clamp(1.0938rem, 0.9275rem + 0.6186vw, 1.25rem)',
          },
        },
        '.text-green-dynamic': {
          color: COLOR_GREEN.DEFAULT,
          '@media (prefers-color-scheme: dark)': {
            color: COLOR_GREEN.light,
          },
        },
        '.h2-normal': {
          fontWeight: '700',
          fontSize: 'clamp(1.4884rem, 0rem + 7.4418vw, 2rem)',
          lineHeight: 'clamp(1.8125rem, -0.0057rem + 9.0909vw, 2.4375rem)',
          '@screen md': {
            fontSize: 'clamp(2rem, 1.7339rem + 0.9901vw, 2.25rem)',
            lineHeight: 'clamp(2.4375rem, 2.1049rem + 1.2376vw, 2.75rem)',
          },
          '@screen lg': {
            fontSize: 'clamp(2.25rem, 1.5488rem + 1.3453vw, 2.625rem)',
            lineHeight: 'clamp(2.75rem, 1.9319rem + 1.5695vw, 3.1875rem)',
          },
        },
      });
    }),
  ],
};

export default config;
