import { useAnimate, cubicBezier, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import { useMediaQueryCtx } from '@/providers/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import { EASE_IN_OUT_QUART_NUM } from '@/constants/tailwind-config';
import type { Sequences, SequencesSequence } from '@/types/loader';

export default function useLoaderExit() {
  const [scope, animate] = useAnimate();
  const {
    state: { isPageReady },
    setState,
  } = useAnimationSequenceCtx();
  const { isValidated } = useMediaQueryCtx();

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const outer = root.children.item(0) as HTMLDivElement;
    const inner = outer.children.item(0) as HTMLDivElement;

    function _hide() {
      outer?.removeEventListener('transitionend', _hide);
      root.classList.add('hidden');
    }
    function _exit() {
      const { clientHeight, clientWidth } = document.documentElement;
      const scaleFrom = +getComputedStyle(outer as HTMLElement).transform.split(',')[3];
      let scaleTo = Math.sqrt((clientWidth * clientWidth) / 4 + (clientHeight * clientHeight) / 4);
      scaleTo = Math.ceil(scaleTo) / (Math.min(clientHeight, clientWidth) / 4);

      outer?.addEventListener('transitionend', _hide);
      animate(sequences({ status: 'running', scaleFrom, scaleTo })).then(() => {
        setState((draft) => {
          draft.isLoader = false;
        });
      });
    }
    function _intercept() {
      if (!isValidated || !isPageReady) return;

      inner?.removeEventListener('animationiteration', _intercept);
      outer?.classList.remove('animate-loader-outer-bubble-out');
      inner?.classList.remove('animate-loader-inner-radiate-out');
      animate(sequences({ status: 'ready' })).then(_exit);
    }

    inner?.addEventListener('animationiteration', _intercept);

    return () => {
      inner?.removeEventListener('animationiteration', _intercept);
    };
  }, [isValidated, isPageReady]);

  return { scope };
}

function sequences(props: Sequences): AnimationSequence {
  const { status, scaleFrom, scaleTo } = props;

  const SEQUENCE: SequencesSequence = {
    ready: [
      [gFD('loader-outer'), { scale: 0.5, x: '-50%', y: '-50%' }, { duration: 0 }],
      [gFD('loader-inner'), { scale: 0 }, { duration: 0 }],
      [
        gFD('loader-inner'),
        { scale: 1 },
        { duration: 0.5, ease: cubicBezier(...EASE_IN_OUT_QUART_NUM) },
      ],
      [
        gFD('loader-outer'),
        { scale: 0.47, x: '-50%', y: '-50%' },
        { duration: 0.5, ease: cubicBezier(...EASE_IN_OUT_QUART_NUM), at: '<' },
      ],
    ],
    running: [
      [
        gFD('loader-outer'),
        { opacity: 1, scale: scaleFrom, x: '-50%', y: '-50%' },
        { duration: 0 },
      ],
      [
        gFD('loader-outer'),
        { scale: scaleTo, x: '-50%', y: '-50%', opacity: 0.2 },
        { ...FRAMER_DEFAULT_TIMING },
      ],
    ],
  };

  return SEQUENCE[status] || [];
}
