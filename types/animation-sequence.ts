import { Updater } from 'use-immer';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/constants/animation-sequence';

export type AnimationSequenceState = {
  state: typeof ANIMATION_SEQUENCE_INITIAL_STATE;
  setState: Updater<typeof ANIMATION_SEQUENCE_INITIAL_STATE>;
};
