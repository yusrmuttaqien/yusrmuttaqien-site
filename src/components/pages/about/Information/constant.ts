import { stagger, cubicBezier, type AnimationSequence } from 'framer-motion';

export const TIMELINE_ENTRY: { visible: AnimationSequence; invisible: AnimationSequence } = {
  visible: [
    ['#section', { opacity: 1 }, { delay: stagger(0.1) }],
    ['#yusril-muttaqien', { opacity: 1 }, { at: '-0.1' }],
  ],
  invisible: [
    ['#section', { opacity: 0 }],
    ['#yusril-muttaqien', { opacity: 0 }],
  ],
};
