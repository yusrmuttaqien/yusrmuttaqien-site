import { useRef } from 'react';
import { AnimatePresence, motion, useIsomorphicLayoutEffect } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import useContent from '@/components/Navbar/hooks/content';
import classMerge from '@/utils/classMerge';
import { VARIANT } from '@/components/Navbar/fragments/MenuToggle/constant';
import type { MenuToggleProps } from '@/components/Navbar/fragments/MenuToggle/type';

const TOGGLE_STYLES = 'inline-block absolute top-0 right-0 whitespace-nowrap';
const TOGGLE_INTERVAL = 300;

export default function MenuToggle(props: MenuToggleProps) {
  const { className } = props;
  const lastClick = useRef(0);
  const { menuOpen, menuClose } = useContent();
  const isXL = useMediaQueryStore((store) => store.isXL);
  const { toggle, isNavMenu, set } = useTogglesStore((store) => ({
    toggle: store.toggle,
    isNavMenu: store.isNavMenu,
    set: store.set,
  }));

  function _debouncedToggle() {
    const last = lastClick.current;
    const now = Date.now();

    if (now - last < TOGGLE_INTERVAL) return;

    lastClick.current = now;
    toggle('isNavMenu');
  }

  useIsomorphicLayoutEffect(() => {
    isXL && isNavMenu && set('isNavMenu', false);
  }, [isXL, isNavMenu]);

  return (
    <button
      className={classMerge('trim-helvetiva-neue overflow-hidden space-x-[.5ch]', className)}
      onClick={_debouncedToggle}
    >
      <span className="relative inline-block">
        <AnimatePresence initial={false}>
          {isNavMenu ? (
            <motion.span {...VARIANT('close')} key="close" className={TOGGLE_STYLES}>
              {menuClose}
            </motion.span>
          ) : (
            <motion.span {...VARIANT('open')} key="open" className={TOGGLE_STYLES}>
              {menuOpen}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="invisible">000000</span>
      </span>
      <span>menu</span>
    </button>
  );
}
