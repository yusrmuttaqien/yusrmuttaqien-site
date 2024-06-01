import type { ColorPair, ColorValue, ScrSize, ColorPairResult } from '@/types/tailwind-config';

const SCREEN_SIZE_SM = '320';
const SCREEN_SIZE_MD = '430';
const SCREEN_SIZE_LG = '834';
const SCREEN_SIZE_XL = '1280';
const SCREEN_SIZE_2XL = '1512';

export const COLOR_GREEN = { DEFAULT: '#336633', light: '#4E844E' };
export const COLOR_GREY = { DEFAULT: '#333333', off: '#818181' };
export const COLOR_BEIGE = { DEFAULT: '#F5F5F5', off: '#E0E0E0' };

export function scrSize(param: ScrSize): string {
  const { screen, withUnit = false, modifier = 0 } = param;

  switch (screen) {
    case 'md':
      return (+SCREEN_SIZE_MD + modifier).toString() + (withUnit ? 'px' : '');
    case 'lg':
      return (+SCREEN_SIZE_LG + modifier).toString() + (withUnit ? 'px' : '');
    case 'xl':
      return (+SCREEN_SIZE_XL + modifier).toString() + (withUnit ? 'px' : '');
    case '2xl':
      return (+SCREEN_SIZE_2XL + modifier).toString() + (withUnit ? 'px' : '');
    default:
    case 'sm':
      return (+SCREEN_SIZE_SM + modifier).toString() + (withUnit ? 'px' : '');
  }
}
export function colorValue(param: ColorValue): string {
  const { color, opacity } = param;

  switch (color) {
    case 'green':
      return `${COLOR_GREEN.DEFAULT}${opacity}`;
    case 'green-light':
      return `${COLOR_GREEN.light}${opacity}`;
    case 'grey':
      return `${COLOR_GREY.DEFAULT}${opacity}`;
    case 'grey-off':
      return `${COLOR_GREY.off}${opacity}`;
    case 'beige-off':
      return `${COLOR_BEIGE.off}${opacity}`;
    default:
    case 'beige':
      return `${COLOR_BEIGE.DEFAULT}${opacity}`;
  }
}
export function colorPair(param: ColorPair): ColorPairResult {
  const { property, color, opacity } = param;
  const clampedOpacity = Number(opacity) >= 100 ? '' : opacity;

  switch (color) {
    case 'green':
      return {
        [property]: colorValue({ color: 'green', opacity: clampedOpacity }),
        '@media (prefers-color-scheme: dark)': {
          [property]: colorValue({ color: 'green-light', opacity: clampedOpacity }),
        },
      };
    case 'grey':
      return {
        [property]: colorValue({ color: 'grey', opacity: clampedOpacity }),
        '@media (prefers-color-scheme: dark)': {
          [property]: colorValue({ color: 'beige', opacity: clampedOpacity }),
        },
      };
    default:
    case 'beige':
      return {
        [property]: colorValue({ color: 'beige', opacity: clampedOpacity }),
        '@media (prefers-color-scheme: dark)': {
          [property]: colorValue({ color: 'grey', opacity: clampedOpacity }),
        },
      };
  }
}
