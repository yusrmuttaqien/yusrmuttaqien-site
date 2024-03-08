'use client';

import { createContext, useContext, ReactNode } from 'react';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/app/constants/animation-sequence';
import { useImmer, Updater } from 'use-immer';

interface AnimationSequenceState {
  state: typeof ANIMATION_SEQUENCE_INITIAL_STATE;
  setState: Updater<typeof ANIMATION_SEQUENCE_INITIAL_STATE>;
}

const AnimationSequenceContext = createContext<AnimationSequenceState>({
  state: ANIMATION_SEQUENCE_INITIAL_STATE,
  setState: () => {},
});

export default function AnimationSequenceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useImmer(ANIMATION_SEQUENCE_INITIAL_STATE);

  return (
    <AnimationSequenceContext.Provider value={{ state, setState }}>
      {children}
    </AnimationSequenceContext.Provider>
  );
}

export function useAnimationSequence() {
  return useContext(AnimationSequenceContext);
}
