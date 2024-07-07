import { createMediaQueryStore } from '@/stores/mediaQuery';
import type { ReactNode } from 'react';

export type MediaQueryStoreApi = ReturnType<typeof createMediaQueryStore>;
export type MediaQueryStoreProviderProps = {
  children: ReactNode;
};
