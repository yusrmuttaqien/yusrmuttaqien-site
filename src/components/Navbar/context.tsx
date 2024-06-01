import { useStore } from 'zustand';
import { createContext, useRef, useContext } from 'react';
import { createClockStore } from '@/components/Navbar/store';
import type { ClockStore } from '@/components/Navbar/type';
import type { ClockStoreApi, ClockStoreProviderProps } from '@/components/Navbar/type';

const ClockStoreContext = createContext<ClockStoreApi | undefined>(undefined);

export default function ClockStoreProvider(props: ClockStoreProviderProps) {
  const { children } = props;
  const storeRef = useRef<ClockStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createClockStore();
  }

  return (
    <ClockStoreContext.Provider value={storeRef.current}>{children}</ClockStoreContext.Provider>
  );
}

export function useClockStore<T>(selector: (store: ClockStore) => T): T {
  const clockStoreContext = useContext(ClockStoreContext);

  if (!clockStoreContext) {
    throw new Error(`useClockStore must be used within ClockStoreProvider`);
  }

  return useStore(clockStoreContext, selector);
}
