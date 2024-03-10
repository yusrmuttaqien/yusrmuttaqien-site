'use client';

import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import classMerge from '@/app/utils/class-merge';
import { bgVariant } from '@/app/constants/main-projects-paginator';
import { LAYOUT_PROJECTS_PAGINATION_BUTTON } from '@/app/constants/framer-motion';
import type { MenuButtonProps } from '@/app/types/main-projects-paginator';

const menuBtnStyles = tv({
  slots: {
    wrapper: 'isolate relative',
    button: classMerge(
      'body-normal transition-colors w-full text-left',
      'relative hoverable:hover:text-beige dark:hoverable:hover:text-grey',
      'unhoverable:underline disabled:text-grey/20 disabled:pointer-events-none'
    ),
  },
});
const btnStyle = classMerge(
  'pt-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)/2)] pb-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)/4)] px-[.8em]',
  'lg:px-[calc(clamp(2rem,_3.87rem_+_-3.5874vw,_1rem)/2)] lg:pb-0 lg:pt-[.2em]'
);

export default function MainProjectsPaginator() {
  return (
    <div className="flex justify-between items-center">
      <p className="text-grey/60 dark:text-beige/60 body-normal">List 01/10</p>
      <menu className={'flex flex-col lg:flex-row'}>
        <MenuButton className={{ button: btnStyle }} text="Previous List" />
        <MenuButton className={{ button: btnStyle }} text="Next List" />
        <MenuButton className={{ button: btnStyle }} disabled text="Preview Off" />
      </menu>
    </div>
  );
}

function MenuButton({
  text,
  disabled,
  className,
}: MenuButtonProps & { className?: Partial<typeof menuBtnStyles.slots> }) {
  const [isHovered, setHovered] = useState(false);
  const { isHover } = useMediaQueryCtx();
  const { wrapper, button } = menuBtnStyles();

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
      className={wrapper({ className: className?.wrapper })}
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
      <button className={button({ className: className?.button })} disabled={disabled}>
        {text}
      </button>
    </li>
  );
}
