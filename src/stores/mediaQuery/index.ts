import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import type { MediaQueryStore, MediaQueryState } from '@/stores/mediaQuery/type';

export const initialState = {
  isValidated: false,
  isXL: false,
  isHoverable: false,
  isDarkMode: false,
  isXL1490: false,
  isLG970: false,
};
export const createMediaQueryStore = (initState: MediaQueryState = initialState) => {
  return createStore<MediaQueryStore>()(
    immer((set) => ({
      ...initState,
      validate: () => set((draft) => void (draft.isValidated = true)),
      update: (key, value) => set((draft) => void (draft[key] = value)),
      // TODO: Verify & add batch/bulk update method to every stores
      bulkUpdate: (values) =>
        set((draft) => {
          for (const key in values) {
            draft[key as keyof MediaQueryState] = values[key as keyof MediaQueryState];
          }
        }),
    }))
  );
};
