import type { MotionProps } from 'framer-motion';

export function VARIANT(state: 'close' | 'open'): MotionProps {
  const isClose = state === 'close';

  return {
    initial: { opacity: 0, y: isClose ? '-90%' : '90%' },
    animate: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: isClose ? '-90%' : '90%' },
  };
}
