import { useImmer } from 'use-immer';
import { createContext, useContext, type ReactNode } from 'react';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/constants/animation-sequence';
import type { AnimationSequenceState } from '@/types/animation-sequence';

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
