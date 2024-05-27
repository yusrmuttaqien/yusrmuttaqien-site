import { useStore } from 'zustand';
import { createContext, useRef, useContext } from 'react';
import { createMeasuresStore } from '@/stores/measures';
import type { MeasuresStore } from '@/stores/measures/type';
import type { MeasuresStoreApi, MeasuresStoreProviderProps } from '@/contexts/measures/type';

const MeasuresStoreContext = createContext<MeasuresStoreApi | undefined>(undefined);

export default function MeasuresStoreProvider(props: MeasuresStoreProviderProps) {
  const { children } = props;
  const storeRef = useRef<MeasuresStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createMeasuresStore();
  }

  return (
    <MeasuresStoreContext.Provider value={storeRef.current}>
      {children}
    </MeasuresStoreContext.Provider>
  );
}

export function useMeasuresStore<T>(selector: (store: MeasuresStore) => T): T {
  const measuresStoreContext = useContext(MeasuresStoreContext);

  if (!measuresStoreContext) {
    throw new Error(`useMeasuresStore must be used within MeasuresStoreProvider`);
  }

  return useStore(measuresStoreContext, selector);
}
