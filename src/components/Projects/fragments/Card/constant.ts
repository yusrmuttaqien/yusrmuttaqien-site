import type { AnimationSequence } from 'framer-motion';

export const TIMELINE_ACTION: { visible: AnimationSequence; invisible: AnimationSequence } = {
  visible: [['#actions-wrapper', { clipPath: 'inset(0% 0% 0% 0%)' }]],
  invisible: [['#actions-wrapper', { clipPath: 'inset(100% 0% 0% 0%)' }]],
};
