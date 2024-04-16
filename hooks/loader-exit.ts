import { useAnimate, cubicBezier, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import { useMediaQueryCtx } from '@/providers/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import { EASE_IN_OUT_QUART_NUM } from '@/constants/tailwind-config';
import type { SequencesProps } from '@/types/loader';

export default function useLoaderExit() {
  const [scope, animate] = useAnimate();
  const {
    state: { isPageReady },
    setState,
  } = useAnimationSequenceCtx();
  const { isValidated } = useMediaQueryCtx();

  useIsomorphicLayoutEffect(() => {
    const outerEl = scope.current.children.item(0) as HTMLDivElement;
    const innerEl = outerEl.children.item(0) as HTMLDivElement;

    function exit() {
      const { clientHeight, clientWidth } = document.documentElement;
      const scaleFrom = +getComputedStyle(outerEl as HTMLElement).transform.split(',')[3];
      let scaleTo = Math.sqrt((clientWidth * clientWidth) / 4 + (clientHeight * clientHeight) / 4);
      scaleTo = Math.ceil(scaleTo) / (Math.min(clientHeight, clientWidth) / 4);

      animate(Sequences({ part: 'go', scaleFrom, scaleTo })).then(() => {
        setState((draft) => {
          draft.isLoader = false;
        });

        function hide() {
          (scope.current as HTMLElement).classList.add('hidden');

          outerEl?.removeEventListener('transitionend', hide);
        }

        outerEl?.addEventListener('transitionend', hide);
      });
    }
    function intercept() {
      if (!isValidated || !isPageReady) return;

      outerEl?.classList.remove('animate-loader-bubble-out');
      innerEl?.classList.remove('animate-loader-scale-radiate-out');
      innerEl?.removeEventListener('animationiteration', intercept);
      animate(Sequences({ part: 'ready' })).then(exit);
    }

    innerEl?.addEventListener('animationiteration', intercept);

    return () => {
      innerEl?.removeEventListener('animationiteration', intercept);
    };
  }, [isValidated, isPageReady]);

  return scope;
}

function Sequences(props: SequencesProps): AnimationSequence {
  const { part, scaleFrom, scaleTo } = props;

  const SEQUENCE: AnimationSequence[] = [
    [
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
    [
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
  ];

  return part === 'ready' ? SEQUENCE[0] : SEQUENCE[1];
}
