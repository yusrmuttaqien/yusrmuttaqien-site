import { useAnimate, stagger, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';

export default function useNavbarEntry() {
  const [scope, animate] = useAnimate();
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    if (isLoader) {
      animate(Sequences('ready'));
    } else {
      (scope.current as HTMLElement).classList.remove('invisible');
      animate(Sequences('go'));
    }
  }, [isLoader]);

  return scope;
}

function Sequences(part: 'ready' | 'go'): AnimationSequence {
  const SEQUENCE: AnimationSequence[] = [
    [
      [gFD('location'), { opacity: 0, y: 5 }, { duration: 0 }],
      [gFD('separator'), { opacity: 0, scale: 0.8 }, { duration: 0 }],
      [gFD('language'), { opacity: 0, y: 5 }, { duration: 0 }],
      [gFD('clock'), { opacity: 0, y: 5 }, { duration: 0 }],
      [gFD('yusr-muttaqien'), { opacity: 0, y: 5 }, { duration: 0 }],
    ],
    [
      [
        gFD('location'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: 0.5 },
      ],
      [
        gFD('separator'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.25' },
      ],
      [
        gFD('language'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.1), at: '-0.25' },
      ],
      [
        gFD('yusr-muttaqien'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.25' },
      ],
      [
        gFD('clock'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.25' },
      ],
    ],
  ];

  return part === 'ready' ? SEQUENCE[0] : SEQUENCE[1];
}