import { Updater } from 'use-immer';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/constants/animation-sequence';

export type AnimationSequenceState = {
  state: typeof ANIMATION_SEQUENCE_INITIAL_STATE;
  setState: Updater<typeof ANIMATION_SEQUENCE_INITIAL_STATE>;
};
export type AnimationSequenceInitialState = {
  isPageReady: boolean;
  isLoader: boolean;
  yusrMuttaqien: {
    hero: boolean;
    footer: boolean;
    navbar: boolean;
  };
  announcer: { announcing: boolean | 'manually' };
};
export type EntryStatus = 'ready' | 'running' | 'complete' | 'not-ready';
