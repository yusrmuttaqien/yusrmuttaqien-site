import { stagger, type AnimationSequence } from 'framer-motion';

export function TIMELINE_ENTRY(screenMode: 'mobile' | 'desktop'): {
  visible: AnimationSequence;
  invisible: AnimationSequence;
} {
  const invisible: AnimationSequence = [
    ['#title span', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#clock', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#booking', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#availibility', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#language', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#menu-toggle', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
  ];

  if (screenMode === 'desktop') {
    return {
      visible: [
        ['#title span', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { delay: stagger(0.1) }],
        ['#clock', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#booking', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.2' }],
        ['#availibility', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#language', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#menu-toggle', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { duration: 0 }],
      ],
      invisible: invisible,
    };
  } else {
    return {
      visible: [
        ['#title span:nth-child(1)', { opacity: 1, filter: 'blur(0px)', y: '0px' }],
        ['#clock', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#booking', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.2' }],
        ['#menu-toggle', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#availibility', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { duration: 0 }],
        ['#language', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { duration: 0 }],
        [
          '#title span:nth-child(2)',
          { opacity: 1, filter: 'blur(0px)', y: '0px' },
          { duration: 0 },
        ],
      ],
      invisible: invisible,
    };
  }
}
