import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useLenis } from '@studio-freight/react-lenis';
import useScrollLock from '@/hooks/scrollLock';
import { useTogglesStore } from '@/contexts/toggles';
import { useMeasuresStore } from '@/contexts/measures';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import { useStatics } from '@/contexts/statics';
import Footer from '@/components/Footer';
import getPageID from '@/utils/getPageID';
import {
  VARIANT,
  MANUAL_ENABLE_SCROLL,
  TRANSITION_LOCK_ID,
} from '@/components/Transition/constant';
import type { TransitionProps, TransitionAnimatable } from '@/components/Transition/type';

export const TRANSITION_STYLES = tv({
  slots: {
    main: 'min-h-full-total-navbar relative z-20',
    container: 'isolate',
  },
});
export default function Transition(props: TransitionProps) {
  const { children, className, ...rest } = props;
  const statics = useStatics();
  const { main, container } = TRANSITION_STYLES();
  const { isHoverable, isXL } = useMediaQueryStore((state) => ({
    isHoverable: state.isHoverable,
    isXL: state.isXL,
  }));
  const { navbarHeight, navbarTop } = useMeasuresStore((state) => ({
    navbarHeight: state.navbarHeight,
    navbarTop: state.navbarTop,
  }));
  const set = useTogglesStore((state) => state.set);
  const { lock, unlock } = useScrollLock();
  const { asPath } = useRouter();
  const lenis = useLenis();

  function _goToTop(props: TransitionAnimatable) {
    const { opacity } = props;
    const target = asPath.includes('#') ? `#${asPath.split('#')[1]}` : 'top';
    const config = {
      duration: 0.4,
      offset: target === 'top' ? 0 : -(navbarHeight + navbarTop * 2),
    };

    if (opacity === 0) {
      lock(TRANSITION_LOCK_ID, true);
      set('isTransition', true);

      if (target === 'top') {
        if (isHoverable && isXL) {
          requestAnimationFrame(() => {
            lenis?.scrollTo(target, config);
          });
        } else {
          window.scrollTo(0, 0);
        }
      }
    } else if (opacity === 1) {
      const isManual = MANUAL_ENABLE_SCROLL.some((id) => getPageID() === id);
      const isFirstLoad = statics.current.isFirstLoad;

      set('isTransition', false);

      if (target !== 'top') {
        unlock(TRANSITION_LOCK_ID, true);

        if (!isFirstLoad) lenis?.scrollTo(target, config);
      }

      statics.current.isFirstLoad = false;

      if (isManual) return;
      unlock(TRANSITION_LOCK_ID, true);
    }
  }

  return (
    <motion.div
      id="below-fold-main"
      {...VARIANT}
      className={container({ className: className?.container })}
      onAnimationComplete={_goToTop}
      {...rest}
    >
      <main className={main({ className: className?.main })}>{children}</main>
      <Footer className={{ footer: 'z-0', contact: 'z-10' }} />
    </motion.div>
  );
}
