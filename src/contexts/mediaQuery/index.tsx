import { useStore } from 'zustand';
import { createContext, useRef, useContext } from 'react';
import { createMediaQueryStore } from '@/stores/mediaQuery';
import type { MediaQueryStore } from '@/stores/mediaQuery/type';
import type { MediaQueryStoreApi, MediaQueryStoreProviderProps } from '@/contexts/mediaQuery/type';

const MediaQueryStoreContext = createContext<MediaQueryStoreApi | undefined>(undefined);

export default function MediaQueryStoreProvider(props: MediaQueryStoreProviderProps) {
  const { children } = props;
  const storeRef = useRef<MediaQueryStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createMediaQueryStore();
  }

  return (
    <MediaQueryStoreContext.Provider value={storeRef.current}>
      {children}
    </MediaQueryStoreContext.Provider>
  );
}

export function useMediaQueryStore<T>(selector: (store: MediaQueryStore) => T): T {
  const mediaQueryStoreContext = useContext(MediaQueryStoreContext);

  if (!mediaQueryStoreContext) {
    throw new Error(`useMediaQueryStore must be used within MediaQueryStoreProvider`);
  }

  return useStore(mediaQueryStoreContext, selector);
}
