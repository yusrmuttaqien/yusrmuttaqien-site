import { stagger, type AnimationSequence } from 'framer-motion';
import { EASE_OUT_QUART } from '@/constants/motion';

export const TIMELINE_ENTRY: { visible: AnimationSequence; invisible: AnimationSequence } = {
  visible: [
    ['#window', { opacity: 0 }, { duration: 0 }],
    'sync-bottom',
    [
      '#window',
      { opacity: 1, filter: 'blur(0px)', z: '0px', rotateX: '0deg' },
      { ease: EASE_OUT_QUART, duration: 0.8, delay: 0.4 },
    ],
    ['#pattern', { filter: 'blur(0px)' }, { at: '-0.5' }],
    ['#ym-image', { filter: 'blur(0px)' }, { at: '-0.2' }],
    ['#role', { opacity: 1, filter: 'blur(0px)', z: '0px' }, { delay: stagger(0.1), at: '-0.4' }],
    // Bottom 01
    ['#linksTitle', { opacity: 1, filter: 'blur(0px)' }, { delay: 0.8, at: 'sync-bottom' }],
    ['#link', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { delay: stagger(0.1), at: '-0.3' }],
    ['#scroll', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.3' }],
  ],
  invisible: [
    ['#window', { opacity: 0, filter: 'blur(16px)', z: '-1000px', rotateX: '30deg' }],
    ['#pattern', { filter: 'blur(16px)' }],
    ['#ym-image', { filter: 'blur(16px)' }],
    ['#role', { opacity: 0, filter: 'blur(16px)', z: '-500px' }],
    ['#linksTitle', { opacity: 0, filter: 'blur(16px)' }],
    ['#link', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#scroll', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
  ],
};
