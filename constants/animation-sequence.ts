import type { AnimationSequenceInitialState } from '@/types/animation-sequence';

export const ANIMATION_SEQUENCE_INITIAL_STATE = {
  isPageReady: false,
  isLoader: true,
  yusrMuttaqien: {
    hero: false,
    footer: false,
    navbar: true,
  },
  announcer: { announcing: false },
} as AnimationSequenceInitialState;
