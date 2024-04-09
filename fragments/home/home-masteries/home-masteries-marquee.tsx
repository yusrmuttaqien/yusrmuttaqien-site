import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import useHomeMasteriesMarquee from '@/hooks/home/home-masteries/home-masteries-marquee';
import type { MasteriesMarqueeProps } from '@/types/home';

export const styles = tv({
  slots: {
    container: 'overflow-hidden whitespace-nowrap',
    wrapper: 'flex items-center gap-4',
  },
});

export default function HomeMasteriesMarquee({
  children,
  baseVelocity,
  className,
  name,
}: MasteriesMarqueeProps) {
  const { scope, x, reps } = useHomeMasteriesMarquee(children, baseVelocity);
  const { container, wrapper } = styles();

  return (
    <div
      className={container({ className: className?.container })}
      data-framer={`home-masteries-marquee${name ? '-' + name : ''}`}
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
