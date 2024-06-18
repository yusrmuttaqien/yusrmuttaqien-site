import { cubicBezier, type AnimationSequence } from 'framer-motion';
import type { RefObject } from 'react';

export const SCROLL_DISTANCE = 0.8;
export function TIMELINE_SCROLLER(scope: RefObject<HTMLButtonElement>): {
  visible: AnimationSequence;
  invisible: AnimationSequence;
} {
  const root = scope.current as HTMLButtonElement;

  return {
    visible: [
      [root, { filter: 'blur(0px)', y: 0, opacity: 1 }],
      ['#arrow-solid', { y: '0%' }, { at: '-0.2' }],
    ],
    invisible: [
      ['#arrow-solid', { y: '-200%' }, { duration: 0.3, ease: cubicBezier(0.25, 1, 0.5, 1) }],
      [root, { filter: 'blur(16px)', y: -20, opacity: 0 }, { at: '-0.25' }],
      ['#arrow-solid', { y: '200%', rotate: '-45deg' }, { duration: 0 }],
      [root, { y: 40 }, { duration: 0 }],
    ],
  };
}
