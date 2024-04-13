import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import classMerge from '@/utils/class-merge';

export default function Announcer() {
  const control = useAnimationControls();
  const {
    state: {
      announcer: { announcing },
    },
  } = useAnimationSequenceCtx();

  useEffect(() => {
    if (announcing) {
      control.start(
        { scale: 1 },
        { repeat: Infinity, repeatType: 'reverse', duration: 1.5, ease: 'easeInOut' }
      );
    } else {
      control.start({ scale: 0 }, { duration: 1.5, ease: 'easeInOut' });
    }
  }, [announcing, control]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={control}
      className={classMerge(
        'fixed top-0 left-0 right-0 z-[101]',
        'mask-image-[radial-gradient(circle,_rgba(2,0,36,1)_0%,_rgba(0,212,255,0)_100%)]'
      )}
    >
      <span className="bg-grey/80 dark:bg-beige/80 w-full h-[0.0938rem] block" />
    </motion.div>
  );
}
