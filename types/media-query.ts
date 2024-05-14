import osType from '@/utils/os-type';
import type { ReactNode } from 'react';

export type MediaQueryProps = {
  query: string;
  revalidate?: number;
};
export type MediaQueryProviderProps = {
  children: ReactNode;
};
export type MediaQueryInitialState = {
  isScreenLargeDesktop: boolean | undefined;
  isScreenDesktop: boolean | undefined;
  isScreenTablet: boolean | undefined;
  isScreenFrom550: boolean | undefined;
  isDeviceMobile: boolean | undefined;
  isHover: boolean | undefined;
  isValidated: boolean;
  os: ReturnType<typeof osType> | undefined;
};
