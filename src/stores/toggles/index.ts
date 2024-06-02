import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import type { TogglesStore, TogglesState } from '@/stores/toggles/type';

export const initialState: TogglesState = {
  isLoader: true,
  isNavMenu: false,
  isNavYM: false,
};
export const createTogglesStore = (initState: TogglesState = initialState) => {
  return createStore<TogglesStore>()(
    immer((set) => ({
      ...initState,
      set: (key, value) => set((draft) => void (draft[key] = value)),
      toggle: (key) => set((draft) => void (draft[key] = !draft[key])),
    }))
  );
};
