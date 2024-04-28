import type { Updater } from 'use-immer';
import type { ReactNode } from 'react';

export type AnimationSequenceProps = {
  children: ReactNode;
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
export type AnimationSequenceState = {
  state: AnimationSequenceInitialState;
  setState: Updater<AnimationSequenceInitialState>;
};
export type EntryStatus = 'ready' | 'running' | 'complete' | 'not-ready';
