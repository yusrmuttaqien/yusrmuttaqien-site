import { createTogglesStore } from '@/stores/toggles';
import type { ReactNode } from 'react';

export type TogglesStoreApi = ReturnType<typeof createTogglesStore>;
export type TogglesStoreProviderProps = {
  children: ReactNode;
};
