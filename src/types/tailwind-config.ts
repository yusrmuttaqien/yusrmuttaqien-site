import type { RecursiveKeyValuePair } from 'tailwindcss/types/config';

export type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ScrSize = {
  screen: ScreenSize;
  withUnit?: boolean;
  modifier?: number;
};
export type ColorValue = {
  color: string;
  opacity: string;
};
export type ColorPair = {
  property: string;
} & ColorValue;
export type ColorPairResult = RecursiveKeyValuePair<string, string | string[] | null>;
