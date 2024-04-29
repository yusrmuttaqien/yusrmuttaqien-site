import type { Updater } from 'use-immer';
import type { ReactNode } from 'react';
import type { AnimationPlaybackControls } from 'framer-motion';

export type AnimationSequenceProps = {
  children: ReactNode;
};
export type AnimationSequenceInitialState = {
  isPageReady: boolean;
  isLoader: boolean;
  visitedEndpoint: Set<string>;
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
export type ResumableAnimate = { instance: AnimationPlaybackControls | null; time: number };
