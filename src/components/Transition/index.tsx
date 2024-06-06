import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { VARIANT } from '@/components/Transition/constant';
import type { TransitionProps } from '@/components/Transition/type';

export const TRANSITION_STYLES = tv({
  slots: {
    main: 'relative z-20',
    container: 'isolate',
  },
});

export default function Transition(props: TransitionProps) {
  const { children, className, ...rest } = props;
  const { main, container } = TRANSITION_STYLES();

  return (
    <motion.div
      id="below-fold-main"
      {...VARIANT}
      className={container({ className: className?.container })}
      {...rest}
    >
      <main className={main({ className: className?.main })}>{children}</main>
      <Footer className={{ footer: 'z-0', contact: 'z-10' }} />
    </motion.div>
  );
}
