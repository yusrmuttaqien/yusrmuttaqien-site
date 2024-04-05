import { useAnimate, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';

export default function useLoaderAnimate() {
  const [scope, animate] = useAnimate();
  const { setState } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    const outerEl = document.querySelector(gFD('loader-outer'));
    const innerEl = document.querySelector(gFD('loader-inner'));

    function exit() {
      const { clientHeight, clientWidth } = document.documentElement;
      const scaleFrom = +getComputedStyle(outerEl as Element).transform.split(',')[3];
      let scaleTo = Math.sqrt((clientWidth * clientWidth) / 4 + (clientHeight * clientHeight) / 4);
      scaleTo = Math.ceil(scaleTo) / 2 / 200;

      animate(Sequences('go', scaleFrom, scaleTo)).then(() => {
        function vanish() {
          setState((draft) => {
            draft.isLoader = false;
          });
          (scope.current as Element).classList.add('hidden');

          outerEl?.removeEventListener('transitionend', vanish);
        }

        outerEl?.addEventListener('transitionend', vanish);
      });
    }
    function intercept() {
      clearInterval(window.loader);
      outerEl?.classList.remove('animate-loader-bubble-out');
      innerEl?.classList.remove('animate-loader-scale-radiate-out');
      innerEl?.removeEventListener('animationiteration', intercept);

      animate(Sequences('ready')).then(exit);
    }

    innerEl?.addEventListener('animationiteration', intercept);
  }, []);

  return scope;
}

function Sequences<T extends 'ready' | 'go'>(
  part: T,
  ...rest: T extends 'go' ? [scaleFrom: number, scaleTo: number] : [unset?: never]
): AnimationSequence {
  const SEQUENCE: AnimationSequence[] = [
    [
      [gFD('loader-inner'), { scale: 0 }, { duration: 0 }],
      [gFD('loader-inner'), { scale: 1 }, { duration: 0.5, ease: 'easeOut' }],
      [gFD('loader-outer'), { opacity: 0.6 }],
    ],
    [
      [gFD('loader-outer'), { opacity: 1, scale: rest[0], x: '-50%', y: '-50%' }, { duration: 0 }],
      [
        gFD('loader-outer'),
        { scale: rest[1], x: '-50%', y: '-50%' },
        { ease: 'easeOut', duration: 0.3 },
      ],
    ],
  ];

  return part === 'ready' ? SEQUENCE[0] : SEQUENCE[1];
}
