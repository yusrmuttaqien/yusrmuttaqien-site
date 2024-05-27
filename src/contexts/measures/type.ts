import { createMeasuresStore } from '@/stores/measures';
import type { ReactNode } from 'react';

export type MeasuresStoreApi = ReturnType<typeof createMeasuresStore>;
export type MeasuresStoreProviderProps = {
  children: ReactNode;
};
