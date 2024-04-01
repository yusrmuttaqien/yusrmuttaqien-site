'use client';

import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import classMerge from '@/app/utils/class-merge';
import { VARIANT_PAGINATION_BTN_BG, LAYOUT_PROJECTS_PAGINATION_BUTTON } from '@/app/constants/main';
import type { MenuButtonProps } from '@/app/types/main';
import type { ProjectsPagination } from '@/app/types/contents';

const menuBtnStyles = tv({
  slots: {
    wrapper: 'isolate relative',
    button: classMerge(
      'body-normal transition-colors w-full text-left unhoverable:underline',
      'relative hoverable:hover:text-beige dark:hoverable:hover:text-grey',
      'disabled:text-grey/20 dark:disabled:text-beige/20 disabled:pointer-events-none',
      'hoverable:active:bg-beige/30 hoverable:active:dark:bg-grey/20'
    ),
  },
});
const btnStyle = classMerge(
  'pt-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)/2)] pb-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)/4)] px-[.8em]',
  'lg:px-[calc(clamp(2rem,_3.87rem_+_-3.5874vw,_1rem)/2)] lg:pb-0 lg:pt-[.2em]'
);

export default function MainProjectsPaginator({ t }: { t: ProjectsPagination }) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-grey/60 dark:text-beige/60 body-normal">{t.list} 01/10</p>
      <menu className={'flex flex-col lg:flex-row'}>
        <MenuButton className={{ button: btnStyle }} text={t.previousList} />
        <MenuButton className={{ button: btnStyle }} text={t.nextList} />
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
  function _onClick() {
    if (disabled) return;

    navigator.vibrate(100);
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
            {...VARIANT_PAGINATION_BTN_BG}
          >
            <span
              className={classMerge('block w-full h-full', 'bg-grey dark:bg-beige')}
              id="background"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={button({ className: className?.button })}
        disabled={disabled}
        onClick={_onClick}
      >
        {text}
      </button>
    </li>
  );
}
