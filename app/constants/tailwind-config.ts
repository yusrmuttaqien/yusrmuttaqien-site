import type { ScreenSize } from '@/app/types/tailwind-config';

const SCREEN_SIZE_SM = '320';
const SCREEN_SIZE_MD = '430';
const SCREEN_SIZE_LG = '834';
const SCREEN_SIZE_XL = '1280';
const SCREEN_SIZE_2XL = '1512';

export const COLOR_GREEN = '#336633';
export const COLOR_GREY = '#333333';
export const COLOR_BEIGE = '#F5F5F5';

export function scrSize(screen: ScreenSize, withUnit?: boolean): string {
  switch (screen) {
    case 'sm':
      return SCREEN_SIZE_SM + (withUnit ? 'px' : '');
    case 'md':
      return SCREEN_SIZE_MD + (withUnit ? 'px' : '');
    case 'lg':
      return SCREEN_SIZE_LG + (withUnit ? 'px' : '');
    case 'xl':
      return SCREEN_SIZE_XL + (withUnit ? 'px' : '');
    case '2xl':
      return SCREEN_SIZE_2XL + (withUnit ? 'px' : '');
    default:
      return SCREEN_SIZE_SM + (withUnit ? 'px' : '');
  }
}
