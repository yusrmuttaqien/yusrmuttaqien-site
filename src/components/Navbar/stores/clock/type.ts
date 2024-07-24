import { createClockStore, initialState } from '@/components/Navbar/stores/clock';

export type ClockStoreApi = ReturnType<typeof createClockStore>;
export type ClockState = typeof initialState;
export type ClockActions = {
  updater: {
    updateAll: (v: ClockState) => void;
    updateHour: (v: string[]) => void;
    updateMinute: (v: string[]) => void;
    updateSecond: (v: string[]) => void;
  };
};
export type ClockStore = ClockState & ClockActions;
