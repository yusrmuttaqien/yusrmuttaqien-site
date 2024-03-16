'use client';

import { useRef, useLayoutEffect, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Tag from '@/app/components/tag';
import isOverflow from '@/app/utils/is-overflow';
import classMerge from '@/app/utils/class-merge';

const overflowStyle = 'block w-10 h-full from-beige dark:from-grey transition-transform';

export default function MainProjectsCardTags({ tags }: { tags: string[] }) {
  const isOverflowing = useRef(false);
  const tagWrapper = useRef<HTMLDivElement>(null);
  const tagContainer = useRef<HTMLDivElement>(null);
  const overflowLPos = useMotionValue('-100%');
  const overflowRPos = useMotionValue('100%');
  const _startResizeOrDrag = useCallback(() => {
    if (!isOverflowing.current) return;

    const currentPos = _getPos();

    switch (currentPos) {
      case 'end':
        overflowLPos.set('0%');
        overflowRPos.set('100%');
        break;
      case 'middle':
        overflowLPos.set('0%');
        overflowRPos.set('0%');
        break;
      case 'start':
      default:
        overflowLPos.set('-100%');
        overflowRPos.set('0%');
        break;
    }
  }, [overflowLPos, overflowRPos]);

  function _getPos(): 'start' | 'end' | 'middle' {
    const transformX = tagContainer.current?.style.transform;
    if (transformX === '' || transformX === 'none') return 'middle';

    const wrapperPos = tagWrapper.current?.clientWidth || 0;
    const containerPos = tagContainer.current?.clientWidth || 0;
    const xPos = parseInt(transformX?.split('(')[1].split(')')[0] || '');
    const diff = containerPos - wrapperPos;
    const isStart = xPos > 0;
    const isEnd = xPos * -1 >= diff;

    return isStart ? 'start' : isEnd ? 'end' : 'middle';
  }

  useLayoutEffect(() => {
    function whenResize() {
      const currentOverflow = isOverflow(tagWrapper.current);
      isOverflowing.current = currentOverflow;

      if (currentOverflow) {
        _startResizeOrDrag();
      } else {
        overflowLPos.set('-100%');
        overflowRPos.set('100%');
      }
    }

    window.addEventListener('resize', whenResize);
    whenResize();

    return () => window.removeEventListener('resize', whenResize);
  }, [_startResizeOrDrag, overflowLPos, overflowRPos]);

  return (
    <div className="relative">
      <div className="absolute -inset-1 pointer-events-none overflow-hidden z-10">
        <motion.span
          style={{ x: overflowLPos }}
          className={classMerge('float-start bg-gradient-to-r', overflowStyle)}
        />
        <motion.span
          style={{ x: overflowRPos }}
          className={classMerge('float-end bg-gradient-to-l', overflowStyle)}
        />
      </div>
      <div ref={tagWrapper} id="tag-wrapper" className="max-w-fit overflow-hidden">
        <motion.div
          className="flex gap-[clamp(0.465rem,_-0.0005rem_+_2.3273vw,_0.625rem)] w-fit hover:cursor-ew-resize"
          drag="x"
          dragConstraints={tagWrapper}
          id="tag-container"
          ref={tagContainer}
          onDrag={_startResizeOrDrag}
        >
          {tags.map((tag) => (
            <Tag text={tag} key={tag} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
