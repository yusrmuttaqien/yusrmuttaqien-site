import { useAnimate, stagger, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';

export default function useNavbarAnimate() {
  const [scope, animate] = useAnimate();
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    isLoader && animate(Sequences('ready'));
    !isLoader && animate(Sequences('go'));
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
      [gFD('location'), { opacity: 1, y: 0 }],
      [gFD('separator'), { opacity: 1, scale: 1 }],
      [gFD('language'), { opacity: 1, y: 0 }, { delay: stagger(0.1) }],
      [gFD('yusr-muttaqien'), { opacity: 1, y: 0 }],
      [gFD('clock'), { opacity: 1, y: 0 }],
    ],
  ];

  return part === 'ready' ? SEQUENCE[0] : SEQUENCE[1];
}
