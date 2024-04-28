import type { ReactNode } from 'react';
import type { LenisOptions } from '@studio-freight/lenis';

export type LenisProps = {
  children: ReactNode;
  options?: LenisOptions;
};
