'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useImmer } from 'use-immer';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/app/constants/animation-sequence';
import type { AnimationSequenceState } from '@/app/types/animation-sequence';

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

export function useAnimationSequenceCtx() {
  return useContext(AnimationSequenceContext);
}
