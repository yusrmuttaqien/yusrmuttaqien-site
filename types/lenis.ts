import type { ReactNode } from 'react';
import type { LenisOptions } from '@studio-freight/lenis';

export type LenisProviderProps = {
  children: ReactNode;
  options?: LenisOptions;
};
