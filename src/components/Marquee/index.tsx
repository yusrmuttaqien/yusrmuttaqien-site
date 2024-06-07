import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import useInteractive from '@/components/Marquee/hooks/interactive';
import type { MarqueeProps } from '@/components/Marquee/type';

export const MARQUEE_STYLES = tv({
  slots: {
    container: 'overflow-hidden whitespace-nowrap',
    wrapper: '',
    child: 'inline-block',
  },
});

export default function Marquee(props: MarqueeProps) {
  const { children, name, className, ...rest } = props;
  const { scope, repeat, x } = useInteractive({ children, ...rest });
  const { container, wrapper, child } = MARQUEE_STYLES();

  return (
    <div
      ref={scope}
      id={`${name}-marquee`}
      className={container({
        className: className?.container,
      })}
    >
      <motion.div id="wrapper" className={wrapper({ className: className?.wrapper })} style={{ x }}>
        <div id="sample" className={child({ className: className?.child })}>
          {children}
        </div>
        {Array.from({ length: repeat }).map((_, index) => (
          <div key={index} className={child({ className: className?.child })}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
