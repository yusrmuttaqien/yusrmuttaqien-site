import { createStore } from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';
import type { ClockState, ClockStore } from '@/components/Navbar/type';

export const initialState: ClockState = {
  hour: ['0', '0'],
  minute: ['0', '0'],
  second: ['0', '0'],
};
export const createClockStore = (initState: ClockState = initialState) => {
  return createStore<ClockStore>()(
    immer((set) => ({
      ...initState,
      updater: {
        updateAll: (v) =>
          set((draft) => {
            draft.hour = v.hour;
            draft.minute = v.minute;
            draft.second = v.second;
          }),
        updateHour: (v) =>
          set((draft) => {
            draft.hour = v;
          }),
        updateMinute: (v) =>
          set((draft) => {
            draft.minute = v;
          }),
        updateSecond: (v) =>
          set((draft) => {
            draft.second = v;
          }),
      },
    }))
  );
};
