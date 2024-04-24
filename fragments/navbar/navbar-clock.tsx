import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useNavbarClock from '@/hooks/navbar/navbar-clock';
import classMerge from '@/utils/class-merge';
import { VARIANT_CLOCK_NUM } from '@/constants/navbar';
import type { AnimatedDigitProps, NavbarProps } from '@/types/navbar';

const MemoizedAnimateDigit = memo(AnimateDigit);

export default function NavbarClock(props: NavbarProps) {
  const { className } = props;
  const time = useNavbarClock();

  return (
    <p className={className} data-framer="clock">
      <MemoizedAnimateDigit
        digit={time.hour[0]}
        variant={VARIANT_CLOCK_NUM}
        sign={`hur-0-${time.hour[0]}`}
      />
      <MemoizedAnimateDigit
        digit={time.hour[1]}
        variant={VARIANT_CLOCK_NUM}
        sign={`hur-1-${time.hour[1]}`}
      />
      <MemoizedAnimateDigit className="mx-[.3ch] animate-navbar-clock-blink" digit=":" sign=":" />
      <MemoizedAnimateDigit
        digit={time.minute[0]}
        variant={VARIANT_CLOCK_NUM}
        sign={`min-0-${time.minute[0]}`}
      />
      <MemoizedAnimateDigit
        digit={time.minute[1]}
        variant={VARIANT_CLOCK_NUM}
        sign={`min-1-${time.minute[1]}`}
      />
      <MemoizedAnimateDigit className="ml-[1ch]" digit="WIB" sign="WIB" />
    </p>
  );
}

function AnimateDigit(props: AnimatedDigitProps) {
  const { digit, variant = {}, sign, className } = props;

  return (
    <span className={classMerge('relative inline-block', className)}>
      <AnimatePresence>
        <motion.span className="absolute left-0 top-0" key={sign} {...variant}>
          {digit}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0">{digit}</span>
    </span>
  );
}
