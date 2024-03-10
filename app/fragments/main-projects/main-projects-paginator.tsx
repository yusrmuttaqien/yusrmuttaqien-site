'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import classMerge from '@/app/utils/class-merge';
import { bgVariant } from '@/app/constants/main-projects-paginator';
import { LAYOUT_PROJECTS_PAGINATION_BUTTON } from '@/app/constants/framer-motion';

export default function MainProjectsPaginator() {
  return (
    <div className="flex justify-between items-center">
      <p className="text-grey/60 dark:text-beige/60 body-normal">List 01/10</p>
      <menu>
        <MenuButton text="Previous List" />
        <MenuButton text="Next List" />
        <MenuButton disabled text="Preview Off" />
      </menu>
    </div>
  );
}

function MenuButton({ text, disabled }: { text: string; disabled?: boolean }) {
  const [isHovered, setHovered] = useState(false);
  const { isHover } = useMediaQueryCtx();

  function _toggleHover(state: boolean) {
    return function () {
      if (disabled || !isHover) {
        setHovered(false);
        return;
      }

      setHovered(state);
    };
  }

  return (
    <li
      className="isolate relative menu"
      onMouseEnter={_toggleHover(true)}
      onMouseLeave={_toggleHover(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            layoutId={LAYOUT_PROJECTS_PAGINATION_BUTTON}
            {...bgVariant}
          >
            <span
              className={classMerge('block w-full h-full', 'bg-grey dark:bg-beige')}
              id="background"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={classMerge(
          'body-normal transition-colors w-full text-left',
          'relative hoverable:hover:text-beige dark:hoverable:hover:text-grey',
          'unhoverable:underline disabled:text-grey/20 disabled:pointer-events-none'
        )}
        disabled={disabled}
      >
        {text}
      </button>
    </li>
  );
}
