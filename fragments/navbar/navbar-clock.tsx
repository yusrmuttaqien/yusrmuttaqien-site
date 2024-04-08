import { useState, memo, useRef, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
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
  const colonRef = useRef<HTMLSpanElement>(null);
  const [time, setTime] = useState({ hour: ['0', '0'], minute: ['0', '0'] });

  useIsomorphicLayoutEffect(() => {
    const colon = colonRef.current as HTMLSpanElement;
    let interval: NodeJS.Timeout;

    function stopBlink() {
      colon.classList.remove('animate-navbar-clock-blink');
      colon.removeEventListener('animationiteration', stopBlink);
    }
    function clear() {
      colon.addEventListener('animationiteration', stopBlink);
      clearInterval(interval);
    }
    function runInterval() {
      interval = setInterval(() => {
        setTime(getDate());
      }, 1000);

      colon.classList.add('animate-navbar-clock-blink');
    }

    window.addEventListener('blur', clear);
    window.addEventListener('focus', runInterval);
    runInterval();

    return () => {
      window.removeEventListener('focus', runInterval);
      window.removeEventListener('blur', clear);
    };
  }, []);

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
      <AnimateDigit
        className="mx-[.3ch] animate-navbar-clock-blink"
        digit=":"
        sign=":"
        ref={colonRef}
      />
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

function getDate() {
  const formatedDate = new Intl.DateTimeFormat('id-ID', {
    timeStyle: 'long',
  }).format(new Date());
  const splitedDate = formatedDate.split('.');

  function splitDigit(digits: string) {
    return digits.split('').map((digit) => digit);
  }

  return {
    hour: splitDigit(splitedDate[0]),
    minute: splitDigit(splitedDate[1]),
  };
}
