import { memo, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useNavbarClock from '@/hooks/navbar/navbar-clock';
import classMerge from '@/utils/class-merge';
import { VARIANT_CLOCK_NUM } from '@/constants/navbar';
import type { AnimatedDigitProps } from '@/types/navbar';

const AnimateDigit = memo(
  forwardRef<HTMLSpanElement, AnimatedDigitProps>(function AnimateDigit(
    { digit, variant = {}, sign, className },
    ref
  ) {
    return (
      <span className={classMerge('relative inline-block', className)} ref={ref}>
        <AnimatePresence>
          <motion.span className="absolute left-0 top-0" key={sign} {...variant}>
            {digit}
          </motion.span>
        </AnimatePresence>
        <span className="opacity-0">{digit}</span>
      </span>
    );
  })
);

export default function NavbarClock({ className }: { className?: string }) {
  const time = useNavbarClock();

  return (
    <p className={className} data-framer="clock">
      <AnimateDigit
        digit={time.hour[0]}
        variant={VARIANT_CLOCK_NUM}
        sign={`hur-0-${time.hour[0]}`}
      />
      <AnimateDigit
        digit={time.hour[1]}
        variant={VARIANT_CLOCK_NUM}
        sign={`hur-1-${time.hour[1]}`}
      />
      <AnimateDigit className="mx-[.3ch] animate-navbar-clock-blink" digit=":" sign=":" />
      <AnimateDigit
        digit={time.minute[0]}
        variant={VARIANT_CLOCK_NUM}
        sign={`min-0-${time.minute[0]}`}
      />
      <AnimateDigit
        digit={time.minute[1]}
        variant={VARIANT_CLOCK_NUM}
        sign={`min-1-${time.minute[1]}`}
      />
      <AnimateDigit className="ml-[1ch]" digit="WIB" sign="WIB" />
    </p>
  );
}
