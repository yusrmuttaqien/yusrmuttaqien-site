import { useAnimate, stagger, type AnimationSequence } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';

export default function useNavbarAnimate() {
  const [scope, animate] = useAnimate();

  useIsomorphicLayoutEffect(() => {
    animate(Sequences());
  }, []);

  return scope;
}

function Sequences(): AnimationSequence {
  return [
    // animate from
    [gFD('location'), { opacity: 0, y: 5 }, { duration: 0 }],
    'initial',
    [gFD('separator'), { opacity: 0, scale: 0.8 }, { duration: 0, at: 'initial' }],
    [gFD('language'), { opacity: 0, y: 5 }, { duration: 0, at: 'initial' }],
    [gFD('clock'), { opacity: 0, y: 5 }, { duration: 0, at: 'initial' }],
    [gFD('yusr-muttaqien'), { opacity: 0, y: 5 }, { duration: 0, at: 'initial' }],
    // animate to
    [gFD('location'), { opacity: 1, y: 0 }],
    [gFD('separator'), { opacity: 1, scale: 1 }, { at: 0.9 }],
    [gFD('language'), { opacity: 1, y: 0 }, { delay: stagger(0.1), at: 0.9 }],
    [gFD('clock'), { opacity: 1, y: 0 }],
    [gFD('yusr-muttaqien'), { opacity: 1, y: 0 }],
  ];
}
