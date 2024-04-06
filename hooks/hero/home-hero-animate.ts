import { useRef } from 'react';
import { useAnimate, useInView, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';

export default function useHomeAnimate() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const isReady = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (isInView && !isLoader) {
      animate(Sequences('go'));
    } else if (!isReady.current) {
      animate(Sequences('ready')).then(() => {
        const root = scope.current as Element;

        isReady.current = true;
        root.classList.remove('invisible');
        (root.querySelector(gFD('blueprint')) as HTMLElement).style.perspective = '100px';
        (root.querySelector(gFD('blueprint-centre')) as HTMLElement).style.perspective = '100px';
      });
    }
  }, [isInView, isLoader]);

  return scope;
}

function Sequences(part: 'ready' | 'go'): AnimationSequence {
  const SEQUENCE: AnimationSequence[] = [
    [
      // #region Blueprint
      [
        gFD('blueprint-cross'),
        { opacity: 0, /* filter: 'blur(30px)', */ scale: 0.5 },
        { duration: 0 },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 0, /* filter: 'blur(10px)', */ scale: 0 },
        { duration: 0 },
      ],
      [
        gFD('blueprint-centre-outer'),
        { opacity: 0, /* filter: 'blur(10px)', */ scale: 0 },
        { duration: 0 },
      ],
      // #endregion
    ],
    [
      // #region Blueprint
      [
        gFD('blueprint-centre-outer'),
        { opacity: 1, /* filter: 'blur(0px)', */ scale: 1.1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.25' },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 1, /* filter: 'blur(0px)', */ scale: 1.1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.8' },
      ],
      [
        gFD('blueprint-cross'),
        { opacity: 1, /* filter: 'blur(0px)', */ scale: 1.5 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.5' },
      ],
      [
        gFD('blueprint-centre-outer'),
        { opacity: 1, /* filter: 'blur(0px)', */ scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.7' },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 1, /* filter: 'blur(0px)', */ scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.8' },
      ],
      // #endregion
    ],
  ];

  return part === 'ready' ? SEQUENCE[0] : SEQUENCE[1];
}
