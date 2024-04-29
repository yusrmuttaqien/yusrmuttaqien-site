import type { AnimationSequenceInitialState } from '@/types/animation-sequence';

export const ANIMATION_SEQUENCE_INITIAL_STATE: AnimationSequenceInitialState = {
  isPageReady: false,
  isLoader: true,
  visitedEndpoint: new Set(),
  yusrMuttaqien: {
    hero: false,
    footer: false,
    navbar: true,
  },
  announcer: { announcing: false },
};
