import {
  stagger,
  type AnimationScope,
  type AnimationSequence,
  type DOMKeyframesDefinition,
} from 'framer-motion';

export const TIMELINE_MAIN: Record<'visible' | 'invisible', DOMKeyframesDefinition> = {
  visible: { z: '-150px', opacity: 1 },
  invisible: { z: '0px', opacity: 1 },
};
export function TIMELINE_MENU(
  scope: AnimationScope,
  invisibleVariant: 'initialize' | 'animate' = 'initialize'
): Record<'visible' | 'invisible', AnimationSequence> {
  const invisibleDepth = invisibleVariant === 'initialize' ? '-300px' : '300px';
  const invisibleBlur = invisibleVariant === 'initialize' ? 'blur(0px)' : 'blur(16px)';

  return {
    visible: [
      [scope.current, { backdropFilter: 'blur(16px)' }],
      [
        '#link',
        { z: '0px', filter: 'blur(0px)', opacity: 1 },
        { delay: stagger(0.05), at: '-0.3' },
      ],
      ['#language', { z: '0px', filter: 'blur(0px)', opacity: 1 }, { at: '-0.3' }],
      ['#availibility', { filter: 'blur(0px)', opacity: 1 }, { at: '-0.3' }],
      ['#availibility', { filter: 'blur(0px)', opacity: 0 }, { duration: 0 }],
      ['#availibility', { filter: 'blur(0px)', opacity: 0 }, { duration: 0, delay: 0.2 }],
      ['#availibility', { filter: 'blur(0px)', opacity: 1 }, { duration: 0, delay: 0.1 }],
      ['#availibility', { filter: 'blur(0px)', opacity: 0 }, { duration: 0 }],
      ['#availibility', { filter: 'blur(0px)', opacity: 1 }, { duration: 0, delay: 0.1 }],
    ],
    invisible: [
      ['#link', { z: invisibleDepth, filter: 'blur(16px)', opacity: 0 }, { delay: stagger(0.05) }],
      ['#language', { z: invisibleDepth, filter: 'blur(16px)', opacity: 0 }, { at: '-0.3' }],
      ['#availibility', { filter: invisibleBlur, opacity: 0 }, { at: '-0.3' }],
      [scope.current, { backdropFilter: 'blur(0px)' }, { at: '-0.3' }],
    ],
  };
}
