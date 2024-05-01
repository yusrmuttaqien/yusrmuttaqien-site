import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import useMarqueeInteractive from '@/hooks/marquee-interactive';
import type { MarqueeProps } from '@/types/marquee';

export const styles = tv({
  slots: {
    container: 'overflow-hidden whitespace-nowrap',
    wrapper: 'flex items-center gap-4',
  },
});

export default function Marquee(props: MarqueeProps) {
  const { children, baseVelocity, className, name } = props;
  const { scope, x, reps } = useMarqueeInteractive({ baseVelocity });
  const { container, wrapper } = styles();

  return (
    <div
      className={container({ className: className?.container })}
      data-framer={`marquee${name ? '-' + name : ''}`}
      ref={scope}
    >
      <motion.div className={wrapper({ className: className?.wrapper })} style={{ x }}>
        <div className="inline">{children}</div>
        {Array.from({ length: reps }).map((_, idx) => (
          <div className="inline" key={idx}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
