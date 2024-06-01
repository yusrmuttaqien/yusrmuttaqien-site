import { useStore } from 'zustand';
import { createContext, useRef, useContext } from 'react';
import { createTogglesStore } from '@/stores/toggles';
import type { TogglesStore } from '@/stores/toggles/type';
import type { TogglesStoreApi, TogglesStoreProviderProps } from '@/contexts/toggles/type';

const TogglesStoreContext = createContext<TogglesStoreApi | undefined>(undefined);

export default function TogglesStoreProvider(props: TogglesStoreProviderProps) {
  const { children } = props;
  const storeRef = useRef<TogglesStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createTogglesStore();
  }

  return (
    <TogglesStoreContext.Provider value={storeRef.current}>{children}</TogglesStoreContext.Provider>
  );
}

export function useTogglesStore<T>(selector: (store: TogglesStore) => T): T {
  const togglesStoreContext = useContext(TogglesStoreContext);

  if (!togglesStoreContext) {
    throw new Error(`useTogglesStore must be used within TogglesStoreProvider`);
  }

  return useStore(togglesStoreContext, selector);
}
