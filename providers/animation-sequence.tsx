import { useImmer } from 'use-immer';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { ANIMATION_SEQUENCE_INITIAL_STATE } from '@/constants/animation-sequence';
import type { AnimationSequenceState, AnimationSequenceProps } from '@/types/animation-sequence';

const AnimationSequenceContext = createContext<AnimationSequenceState>({
  state: ANIMATION_SEQUENCE_INITIAL_STATE,
  setState: () => {},
});

export default function AnimationSequenceProvider(props: AnimationSequenceProps) {
  const { children } = props;
  const router = useRouter();
  const [state, setState] = useImmer(ANIMATION_SEQUENCE_INITIAL_STATE);

  useIsomorphicLayoutEffect(() => {
    const bindedAnnouncerOn = _toggle.bind(null, true);
    const bindedAnnouncerOff = _toggle.bind(null, false);

    function _toggle(e: boolean) {
      setState((draft) => {
        draft.announcer.announcing = e;
      });
    }

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
