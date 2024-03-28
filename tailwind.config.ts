import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const {
  scrSize,
  COLOR_BEIGE,
  COLOR_GREEN,
  COLOR_GREY,
  EASE_IN_OUT_QUINT_CSS,
  SIZING_CONTAINER_DEFAULT,
  SIZING_CONTAINER_LG,
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
        'helvetica-neue': ['var(--font-helvetica-neue)', 'sans-serif'],
        'roboto-mono': ['var(--font-roboto-mono)', 'sans-serif'],
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
      screens: {
        hoverable: { raw: '(hover: hover)' },
        unhoverable: { raw: '(hover: none)' },
      },
      keyframes: {
        'loader-exit-push-up-show': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'main-push-up-hide': {
          '0%': { transform: 'translateY(0pz)' },
          '100%': { transform: 'translateY(-20vh)' },
        },
        'loader-exit-backdrop-show': {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        },
        'navbar-push-up-hidden': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(calc(var(--navbar-total-height) * -1px))' },
        },
      },
      animation: {
        'loader-exit-push-up-show': `loader-exit-push-up-show .8s ${EASE_IN_OUT_QUINT_CSS} forwards`,
        'main-push-up-hide': `main-push-up-hide 1.3s ${EASE_IN_OUT_QUINT_CSS} forwards`,
        'loader-exit-backdrop-show': `loader-exit-backdrop-show .8s linear forwards`,
        'navbar-push-up-hidden': `navbar-push-up-hidden .8s ${EASE_IN_OUT_QUINT_CSS} forwards`,
      },
    },
    screens: {
      sm: scrSize('sm', true),
      md: scrSize('md', true),
      'md-only': { raw: `(max-width: ${scrSize('lg', true, -1)})` },
      lg: scrSize('lg', true),
      'lg-only': { raw: `(max-width: ${scrSize('xl', true, -1)})` },
      xl: scrSize('xl', true),
      '2xl': scrSize('2xl', true),
    },
  },
  plugins: [
    plugin(function ({ addComponents, addUtilities, theme, matchUtilities }) {
      addComponents({
        '.translate-center': {
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          left: '50%',
          top: '50%',
        },
        '.container': {
          paddingInline: SIZING_CONTAINER_DEFAULT,
          maxWidth: '80rem',
          marginInline: 'auto',
          '@screen lg': {
            paddingInline: SIZING_CONTAINER_LG,
          },
        },
        '.container-b': {
          paddingBottom: SIZING_CONTAINER_DEFAULT,
          '@screen lg': {
            paddingBottom: SIZING_CONTAINER_LG,
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
        '.h3-normal': {
          fontWeight: '500',
          fontSize: 'clamp(1.4881rem, -0.001rem + 7.4455vw, 2rem)',
          lineHeight: 'clamp(1.8125rem, -0.0057rem + 9.0909vw, 2.4375rem)',
        },
        '.body-normal': {
          fontSize: 'clamp(0.7444rem, 0.0007rem + 3.7182vw, 1rem)',
          lineHeight: 'clamp(1rem, -0.4545rem + 7.2727vw, 1.5rem)',
        },
        '.body-tag': {
          fontSize: 'clamp(0.5581rem, 0rem + 2.7907vw, 0.75rem)',
          fontWeight: '200',
          lineHeight: 'clamp(0.6875rem, -0.0398rem + 3.6364vw, 0.9375rem)',
        },
        '.link-email': {
          fontWeight: '500',
          fontSize: 'clamp(1.4884rem, 0rem + 7.4418vw, 2rem)',
          lineHeight: 'clamp(1.8125rem, -0.0057rem + 9.0909vw, 2.4375rem)',
          textDecoration: 'underline',
        },
        '.link-footer': {
          fontWeight: '500',
          fontSize: 'clamp(1.1162rem, -0.0001rem + 5.5818vw, 1.5rem)',
          lineHeight: 'clamp(1.375rem, 0.1023rem + 6.3636vw, 1.8125rem)',
        },
        '.project-title': {
          fontSize: 'clamp(2.9769rem, 0.0005rem + 14.8818vw, 4rem)',
          fontWeight: '800',
          lineHeight: 'clamp(3rem, 0.0909rem + 14.5455vw, 4rem)',
          fontFamily: theme('fontFamily.nohemi'),
          '@screen md': {
            fontSize: 'clamp(4rem, 1.6052rem + 8.9109vw, 6.25rem)',
            lineHeight: 'clamp(4rem, 1.6052rem + 8.9109vw, 6.25rem)',
          },
        },
      });
      addUtilities({
        '.hide-scrollbar': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
      matchUtilities(
        {
          'cursor-emoji': (value: string) => ({
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>${value}</text></svg>") 16 0, auto`,
          }),
          'mask-image': (value: string) => ({
            WebkitMaskImage: value,
            maskImage: value,
          }),
        },
        { respectImportant: true }
      );
    }),
  ],
};

export default config;
