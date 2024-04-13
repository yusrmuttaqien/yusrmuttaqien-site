import { useImmer } from 'use-immer';
import { useRouter } from 'next/router';
import { createContext, useContext, type ReactNode } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/constants/animation-sequence';
import type { AnimationSequenceState } from '@/types/animation-sequence';

const AnimationSequenceContext = createContext<AnimationSequenceState>({
  state: ANIMATION_SEQUENCE_INITIAL_STATE,
  setState: () => {},
});

export default function AnimationSequenceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useImmer(ANIMATION_SEQUENCE_INITIAL_STATE);

  function _announcerToggle(e: boolean) {
    setState((draft) => {
      draft.announcer.announcing = e;
    });
  }

  useIsomorphicLayoutEffect(() => {
    const bindedAnnouncerOn = _announcerToggle.bind(null, true);
    const bindedAnnouncerOff = _announcerToggle.bind(null, false);

    router.events.on('routeChangeStart', bindedAnnouncerOn);
    router.events.on('routeChangeError', bindedAnnouncerOff);

    return () => {
      router.events.off('routeChangeStart', bindedAnnouncerOn);
      router.events.off('routeChangeError', bindedAnnouncerOff);
    };
  }, []);

  return (
    <AnimationSequenceContext.Provider value={{ state, setState }}>
      {children}
    </AnimationSequenceContext.Provider>
  );
}

export function useAnimationSequenceCtx() {
  return useContext(AnimationSequenceContext);
}
