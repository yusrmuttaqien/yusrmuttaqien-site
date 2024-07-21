import { useRef } from 'react';
import { AnimatePresence, motion, useIsomorphicLayoutEffect } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import useContent from '@/components/Navbar/hooks/content';
import classMerge from '@/utils/classMerge';
import { VARIANT } from '@/components/Navbar/fragments/MenuToggle/constant';
import type { MenuToggleProps } from '@/components/Navbar/fragments/MenuToggle/type';

const TOGGLE_STYLES = 'inline-block absolute top-0 right-0 whitespace-nowrap';

export default function MenuToggle(props: MenuToggleProps) {
  const { className } = props;
  const { menuOpen, menuClose } = useContent();
  const isXL = useMediaQueryStore((store) => store.isXL);
  const { toggle, isNavMenu, set } = useTogglesStore((store) => ({
    toggle: store.toggle,
    isNavMenu: store.isNavMenu,
    set: store.set,
  }));

  function _toggleMenu() {
    toggle('isNavMenu');
  }

  useIsomorphicLayoutEffect(() => {
    isXL && isNavMenu && set('isNavMenu', false);
  }, [isXL, isNavMenu]);

  return (
    <button
      id="menu-toggle"
      className={classMerge('trim-helvetiva-neue overflow-hidden space-x-[.5ch]', className)}
      onClick={_toggleMenu}
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
