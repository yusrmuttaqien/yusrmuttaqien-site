import { stagger, type AnimationSequence } from 'framer-motion';

export const TIMELINE_ENTRY: { visible: AnimationSequence; invisible: AnimationSequence } = {
  visible: [
    ['#project-title-0', { opacity: 1, filter: 'blur(0px)', y: '0px' }],
    ['#project-title-1', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.15' }],
    ['#project-card', { opacity: 1 }, { delay: stagger(0.15), at: '-0.15' }],
  ],
  invisible: [
    ['#project-title-0', { opacity: 0, filter: 'blur(16px)', y: '-30px' }],
    ['#project-title-1', { opacity: 0, filter: 'blur(16px)', y: '30px' }],
    ['#project-card', { opacity: 0 }],
  ],
};
