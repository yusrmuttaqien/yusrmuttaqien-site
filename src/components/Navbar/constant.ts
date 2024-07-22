import { stagger, type AnimationSequence } from 'framer-motion';
import type { HostProps } from '@/components/Navbar/type';
import { EASE_OUT_QUART } from '@/constants/motion';

export function TIMELINE_ENTRY(screenMode: 'mobile' | 'desktop'): {
  visible: AnimationSequence;
  invisible: AnimationSequence;
} {
  const invisible: AnimationSequence = [
    ['#location span', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#clock', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#link', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#booking', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#availibility', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#language', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#menu-toggle', { opacity: 0, filter: 'blur(16px)', y: '-20px' }],
    ['#ym-title', { filter: 'blur(16px)', y: '-150%' }],
  ];

  if (screenMode === 'desktop') {
    return {
      visible: [
        ['#ym-title', { filter: 'blur(0px)', y: '-50%' }],
        [
          '#location span',
          { opacity: 1, filter: 'blur(0px)', y: '0px' },
          { delay: stagger(0.1), at: '-0.2' },
        ],
        ['#clock', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        [
          '#link',
          { opacity: 1, filter: 'blur(0px)', y: '0px' },
          { delay: stagger(0.1), at: '-0.2' },
        ],
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
        ['#location span:nth-child(1)', { opacity: 1, filter: 'blur(0px)', y: '0px' }],
        ['#clock', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#booking', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.2' }],
        ['#menu-toggle', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { at: '-0.1' }],
        ['#link', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { duration: 0 }],
        ['#availibility', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { duration: 0 }],
        ['#language', { opacity: 1, filter: 'blur(0px)', y: '0px' }, { duration: 0 }],
        ['#ym-title', { filter: 'blur(0px)', y: '-50%' }, { duration: 0 }],
        [
          '#location span:nth-child(2)',
          { opacity: 1, filter: 'blur(0px)', y: '0px' },
          { duration: 0 },
        ],
      ],
      invisible: invisible,
    };
  }
}
export function TIMELINE_YM_TITLE(scope: HostProps['scope']): {
  visible: AnimationSequence;
  invisible: AnimationSequence;
} {
  const root = scope.current as HTMLElement;
  const YMTitle = root.querySelector('#ym-title') as HTMLElement;
  const location = root.querySelector('#location') as HTMLElement;
  const clock = root.querySelector('#clock') as HTMLElement;
  const YMMarginRight = parseFloat(getComputedStyle(YMTitle).marginRight);
  const YMWidth = YMTitle.offsetWidth + YMMarginRight;

  return {
    visible: [
      [
        YMTitle,
        { x: `0%`, y: '-50%', opacity: 1, filter: 'blur(0px)' },
        { ease: EASE_OUT_QUART, duration: 0.5 },
      ],
      [location, { x: `${YMWidth}px` }, { at: '<', ease: EASE_OUT_QUART, duration: 0.5 }],
      [clock, { x: `${YMWidth}px` }, { at: '<', ease: EASE_OUT_QUART, duration: 0.5 }],
    ],
    invisible: [
      [
        YMTitle,
        { x: `-100%`, y: '-50%', opacity: 0, filter: 'blur(16px)' },
        { ease: EASE_OUT_QUART, duration: 0.5 },
      ],
      [location, { x: `0%` }, { at: '<', ease: EASE_OUT_QUART, duration: 0.5 }],
      [clock, { x: `0%` }, { at: '<', ease: EASE_OUT_QUART, duration: 0.5 }],
    ],
  };
}
