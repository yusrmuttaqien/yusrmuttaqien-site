import { initialState } from '@/stores/toggles';
import type { Updater } from 'use-immer';

export type TogglesState = typeof initialState;
export type TogglesActions = {
  set: (key: keyof TogglesState, value: boolean) => void;
  toggle: (key: keyof TogglesState) => void;
  batch: (fn: (set: Updater<TogglesState>) => void) => void;
};
export type TogglesStore = TogglesState & TogglesActions;
