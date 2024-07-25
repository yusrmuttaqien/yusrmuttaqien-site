import type { AnimationSequence, AnimationScope } from 'framer-motion';

export function TIMELINE_ENTRY(scope: AnimationScope): {
  visible: AnimationSequence;
  invisible: AnimationSequence;
} {
  return {
    visible: [[scope.current, { opacity: 1 }]],
    invisible: [[scope.current, { opacity: 0 }]],
  };
}
