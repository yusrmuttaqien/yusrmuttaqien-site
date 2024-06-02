import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import type { MediaQueryStore, MediaQueryState } from '@/stores/mediaQuery/type';

export const initialState: MediaQueryState = {
  isValidated: undefined,
  isXL: undefined,
  isHoverable: undefined,
  isDarkMode: undefined,
  isXL1380: undefined,
};
export const createMediaQueryStore = (initState: MediaQueryState = initialState) => {
  return createStore<MediaQueryStore>()(
    immer((set) => ({
      ...initState,
      validate: () => set((draft) => void (draft.isValidated = true)),
      update: (key, value) => set((draft) => void (draft[key] = value)),
      bulkUpdate: (values) =>
        set((draft) => {
          for (const key in values) {
            draft[key as keyof MediaQueryState] = values[key as keyof MediaQueryState];
          }
        }),
    }))
  );
};
