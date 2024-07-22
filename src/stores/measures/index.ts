import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import type { MeasuresStore, MeasuresState } from '@/stores/measures/type';

export const initialState = {
  navbarHeight: 0,
  navbarTop: 0,
  navbarMTop: 0,
  navbarMBottom: 0,
};
export const createMeasuresStore = (initState: MeasuresState = initialState) => {
  return createStore<MeasuresStore>()(
    immer((set) => ({
      ...initState,
      note: (key, value) => set((draft) => void (draft[key] = value)),
      noteNavbar: ({ height, top, marginTop, marginBottom }) =>
        set((draft) => {
          draft.navbarHeight = height;
          draft.navbarTop = top;
          draft.navbarMTop = marginTop;
          draft.navbarMBottom = marginBottom;
        }),
    }))
  );
};
