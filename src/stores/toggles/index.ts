import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import type { TogglesStore, TogglesState } from '@/stores/toggles/type';

export const initialState = {
  isLoader: true,
  isNavMenu: false,
  isNavYM: false,
  isTransition: false,
  isIndexHeroEntry: true,
  loaderQueue: {
    all: {},
  },
};
export const createTogglesStore = (initState: TogglesState = initialState) => {
  return createStore<TogglesStore>()(
    immer((set) => ({
      ...initState,
      // @ts-expect-error
      set: (key, value) => set((draft) => void (draft[key] = value)),
      // @ts-expect-error
      toggle: (key) => set((draft) => void (draft[key] = !draft[key])),
      batch: (fn) => fn(set),
    }))
  );
};
