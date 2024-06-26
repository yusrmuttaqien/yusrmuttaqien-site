import plugin from 'tailwindcss/plugin';
import clamp from './src/utils/clamp';
import {
  COLOR_BEIGE,
  COLOR_GREEN,
  COLOR_GREY,
  colorPair,
  scrSize,
} from './src/constants/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        helveticaNeue: ['var(--font-helvetica-neue)', 'sans-serif'],
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
      },
      colors: {
        green: COLOR_GREEN,
        grey: COLOR_GREY,
        beige: COLOR_BEIGE,
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      spacing: {
        'half-minimal-navbar': 'calc(100svh / 2 - var(--navbar-docked-minimal-height) / 2)',
      },
      height: {
        'full-total-navbar': 'calc(100svh - var(--navbar-docked-total-height))',
      },
      minHeight: {
        'full-total-navbar': 'calc(100svh - var(--navbar-docked-total-height))',
      },
    },
    screens: {
      sm: scrSize({ screen: 'sm', withUnit: true }),
      md: scrSize({ screen: 'md', withUnit: true }),
      'md-only': { max: scrSize({ screen: 'lg', withUnit: true, modifier: -1 }) },
      lg: scrSize({ screen: 'lg', withUnit: true }),
      'lg-540': '540px',
      'lg-590': '590px',
      'lg-850': '850px',
      'lg-970': '970px',
      'lg-only': { max: scrSize({ screen: 'xl', withUnit: true, modifier: -1 }) },
      xl: scrSize({ screen: 'xl', withUnit: true }),
      'xl-only': { max: scrSize({ screen: 'xl', withUnit: true, modifier: -1 }) },
      '2xl': scrSize({ screen: '2xl', withUnit: true }),
      hoverable: { raw: '(hover: hover)' },
      unhoverable: { raw: '(hover: none)' },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    plugin(({ addComponents, matchUtilities, addUtilities, theme }) => {
      // Type
      addComponents({
        '.body': {
          fontFamily: theme('fontFamily.helveticaNeue'),
          fontSize: clamp({ minValue: 12, maxValue: 14, minViewport: 320, maxViewport: 375 }),
        },
      });
      // Trim
      matchUtilities(
        {
          trim: (family) => {
            let preset: Record<string, { before: string; after: string; lineHeight?: string }> = {
              nohemi: { before: '-0.04em', after: '-0.2em' },
              helveticaNeue: { before: '-0.1em', after: '-0.3em' },
            };
            preset = {
              ...preset,
              nohemiHeight: { ...preset.nohemi, lineHeight: '0.9em' },
              helveticaNeueHeight: { ...preset.helveticaNeue, lineHeight: '1.2em' },
            };
            const selected = preset[family];

            return {
              textTransform: 'uppercase',
              lineHeight: selected.lineHeight || 'unset',
              '&::before': {
                content: '""',
                display: 'table',
                marginBottom: selected.before,
              },
              '&::after': {
                content: '""',
                display: 'table',
                marginTop: selected.after,
              },
            };
          },
        },
        {
          values: {
            'helvetiva-neue': 'helveticaNeue',
            'helvetiva-neue-height': 'helveticaNeueHeight',
            nohemi: 'nohemi',
            'nohemi-height': 'nohemiHeight',
          },
        }
      );
      // Clamp
      matchUtilities(
        {
          'gap-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { gap: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
          'text-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { fontSize: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
        },
        { values: { none: '0 0 0 0' } }
      );
      // Clip-path
      matchUtilities(
        {
          'clip-path-inset': (size) => {
            const [top, right, bottom, left] = size.split(' ');

            return { clipPath: `inset(${top} ${right} ${bottom} ${left})` };
          },
        },
        { values: { bottom: '100% 0% 0% 0%' } }
      );
      // Color
      matchUtilities(
        {
          'border-dynamic': (config) => {
            const [color, opacity] = config.split(' ');

            return colorPair({ property: 'borderColor', color, opacity });
          },
          'text-dynamic': (config) => {
            const [color, opacity] = config.split(' ');

            return colorPair({ property: 'color', color, opacity });
          },
          'bg-dynamic': (config) => {
            const [color, opacity] = config.split(' ');

            return colorPair({ property: 'backgroundColor', color, opacity });
          },
          'fill-dynamic': (config) => {
            const [color, opacity] = config.split(' ');

            return colorPair({ property: 'fill', color, opacity });
          },
          'stroke-dynamic': (config) => {
            const [color, opacity] = config.split(' ');

            return colorPair({ property: 'stroke', color, opacity });
          },
        },
        { values: { grey: 'grey 100', beige: 'beige 100', green: 'green 100' } }
      );
      // Perspective
      addUtilities({
        '.transform-preserve3d': { transformStyle: 'preserve-3d' },
      });
      matchUtilities(
        {
          perspective: (value) => {
            return { perspective: value };
          },
        },
        { values: { '5000': '5000px' } }
      );
      matchUtilities(
        {
          'perspective-origin': (value) => {
            return { perspectiveOrigin: value };
          },
        },
        { values: { left: 'left', right: 'right', center: 'center' } }
      );
    }),
  ],
};
export default config;
