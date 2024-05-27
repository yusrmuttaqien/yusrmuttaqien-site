import { createClockStore } from '@/components/Navbar/store';
import { classes } from '@/components/Navbar';
import type { ReactNode } from 'react';

export type NavbarProps = {
  className?: Partial<typeof classes.slots>;
};
export type ClockStoreApi = ReturnType<typeof createClockStore>;
export type ClockStoreProviderProps = {
  children: ReactNode;
};
export type ClockState = {
  hour: string[];
  minute: string[];
  second: string[];
};
export type ClockActions = {
  updater: {
    updateAll: (v: ClockState) => void;
    updateHour: (v: string[]) => void;
    updateMinute: (v: string[]) => void;
    updateSecond: (v: string[]) => void;
  };
};
export type ClockStore = ClockState & ClockActions;
export type Links = 'home' | 'about' | 'projects' | 'techStack';
