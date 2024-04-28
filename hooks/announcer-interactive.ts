import { useAnimationControls } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';

export default function useAnnouncerInteractive() {
  const control = useAnimationControls();
  const {
    state: {
      announcer: { announcing },
    },
  } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    if (announcing) {
      control.start(
        { scale: 1 },
        { repeat: Infinity, repeatType: 'reverse', duration: 1.5, ease: 'easeInOut' }
      );
    } else {
      control.start({ scale: 0 }, { duration: 1.5, ease: 'easeInOut' });
    }
  }, [announcing, control]);

  return { control };
}
