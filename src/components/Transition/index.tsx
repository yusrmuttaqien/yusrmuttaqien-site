import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { useRouter } from 'next/router';
import useScrollLock from '@/hooks/scrollLock';
import Footer from '@/components/Footer';
import getPageID from '@/utils/getPageID';
import { VARIANT, MANUAL_ENABLE_SCROLL } from '@/components/Transition/constant';
import type { TransitionProps, TransitionAnimatable } from '@/components/Transition/type';

export const TRANSITION_LOCK_ID = 'transition';
export const TRANSITION_STYLES = tv({
  slots: {
    main: 'relative z-20',
    container: 'isolate',
  },
});

export default function Transition(props: TransitionProps) {
  const { children, className, ...rest } = props;
  const { main, container } = TRANSITION_STYLES();
  const { lock, unlock } = useScrollLock();
  const { asPath } = useRouter();
  const lenis = useLenis();

  function _goToTop(props: TransitionAnimatable) {
    const { opacity } = props;

    if (opacity === 0) {
      lock(TRANSITION_LOCK_ID, true);
      !asPath.includes('#') && lenis?.scrollTo('top', { duration: 0.05 });
    } else if (opacity === 1) {
      const isManual = MANUAL_ENABLE_SCROLL.some((id) => getPageID() === id);

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
