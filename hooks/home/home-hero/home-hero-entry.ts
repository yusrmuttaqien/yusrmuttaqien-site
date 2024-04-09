import { useRef, useState } from 'react';
import { useAnimate, useInView, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { HeroSequencesProps } from '@/types/home';

export default function useHomeHeroEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const isReady = useRef(false);
  const [isComplete, setComplete] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (isInView && !isLoader && !isComplete) {
      const root = scope.current as HTMLElement;

      root.classList.remove('invisible');
      animate(Sequences({ part: 'go' })).then(() => {
        setComplete(true);
      });
    } else if (!isReady.current) {
      animate(Sequences({ part: 'ready' })).then(() => {
        isReady.current = true;
      });
    }
  }, [isInView, isLoader, isComplete]);

  return { scope, isComplete };
}

function Sequences(props: HeroSequencesProps): AnimationSequence {
  const { part } = props;

  const SEQUENCE: AnimationSequence[] = [
    [
      [gFD('blueprint-cross'), { opacity: 0, scale: 0.5 }, { duration: 0 }],
      [gFD('blueprint-centre-inner'), { opacity: 0, scale: 0 }, { duration: 0 }],
      [gFD('blueprint-centre-outer'), { opacity: 0, scale: 0 }, { duration: 0 }],
      [gFD('home-hero-header'), { opacity: 0, scale: 1.01 }, { duration: 0 }],
    ],
    [
      [
        gFD('blueprint-centre-outer'),
        { opacity: 1, scale: 1.1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.25' },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 1, scale: 1.1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.8' },
      ],
      [
        gFD('blueprint-cross'),
        { opacity: 1, scale: 1.5 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.5' },
      ],
      [
        gFD('blueprint-centre-outer'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.7' },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.8' },
      ],
      [
        gFD('home-hero-header'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.3, at: '-0.7' },
      ],
    ],
  ];

  return part === 'ready' ? SEQUENCE[0] : SEQUENCE[1];
}
