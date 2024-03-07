type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const SCREEN_SIZE_SM = '20';
const SCREEN_SIZE_MD = '26.875';
const SCREEN_SIZE_LG = '52.125';
const SCREEN_SIZE_XL = '80';
const SCREEN_SIZE_2XL = '94.5';

export const FRAMER_LAYOUT_YUSR_MUTTAQIEN = 'framer-layout-yusr-muttaqien';
export function scrSize(screen: ScreenSize, withUnit?: boolean): string {
  switch (screen) {
    case 'sm':
      return SCREEN_SIZE_SM + (withUnit ? 'rem' : '');
    case 'md':
      return SCREEN_SIZE_MD + (withUnit ? 'rem' : '');
    case 'lg':
      return SCREEN_SIZE_LG + (withUnit ? 'rem' : '');
    case 'xl':
      return SCREEN_SIZE_XL + (withUnit ? 'rem' : '');
    case '2xl':
      return SCREEN_SIZE_2XL + (withUnit ? 'rem' : '');
    default:
      return SCREEN_SIZE_SM + (withUnit ? 'rem' : '');
  }
}
