import { stagger, type AnimationSequence, type DOMKeyframesDefinition } from 'framer-motion';

export const EMAIL = 'idyusril@gmail.com';
export const TIMELINE_ENTRY_CONTACT: Record<'visible' | 'invisible', DOMKeyframesDefinition> = {
  visible: { y: '0%' },
  invisible: { y: '100%' },
};
export const TIMELINE_ENTRY_FOOTER: { visible: AnimationSequence; invisible: AnimationSequence } = {
  visible: [
    ['#section', { opacity: 1 }, { delay: stagger(0.05) }],
    ['#yusr-banner', { opacity: 1 }, { at: '-0.1' }],
  ],
  invisible: [
    ['#section', { opacity: 0 }],
    ['#yusr-banner', { opacity: 0 }],
  ],
};
