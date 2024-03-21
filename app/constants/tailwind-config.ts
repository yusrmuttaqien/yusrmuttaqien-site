import type { ScreenSize } from '@/app/types/tailwind-config';

const SCREEN_SIZE_SM = '320';
const SCREEN_SIZE_MD = '430';
const SCREEN_SIZE_LG = '834';
const SCREEN_SIZE_XL = '1280';
const SCREEN_SIZE_2XL = '1512';

export const COLOR_GREEN = { DEFAULT: '#336633', light: '#4E844E' };
export const COLOR_GREY = '#333333';
export const COLOR_BEIGE = '#F5F5F5';

export const SIZING_CONTAINER_DEFAULT = 'clamp(1.125rem, 0.0341rem + 5.4545vw, 1.5rem)';
export const SIZING_CONTAINER_LG = 'clamp(1.5rem, -6.4473rem + 15.2466vw, 5.75rem)';

export function scrSize(screen: ScreenSize, withUnit?: boolean, modifier: number = 0): string {
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
