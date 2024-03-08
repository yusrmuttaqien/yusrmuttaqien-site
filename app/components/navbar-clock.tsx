'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classMerge from '@/app/utils/class-merge';
import { numVariant, colVariant } from '@/app/constants/navbar-clock';
import type { AnimatedDigitProps } from '@/app/types/navbar-clock';

export default function NavbarClock({ className }: { className?: string }) {
  const [time, setTime] = useState({ hour: ['0', '0'], minute: ['0', '0'], second: ['0', '0'] });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    function clear() {
      clearInterval(interval);
    }
    function runInterval() {
      interval && clear();
      interval = setInterval(() => {
        setTime(getDate());
      }, 1000);
    }

    window.addEventListener('focus', runInterval);
    window.addEventListener('blur', clear);
    runInterval();

    return () => {
      window.removeEventListener('focus', runInterval);
      window.removeEventListener('blur', clear);
      clear();
    };
  }, []);

  return (
    <p className={className}>
      <AnimateDigit digit={time.hour[0]} variant={numVariant} sign={`hur-0-${time.hour[0]}`} />
      <AnimateDigit digit={time.hour[1]} variant={numVariant} sign={`hur-1-${time.hour[1]}`} />
      <AnimateDigit
        className="ml-[.1em] mr-[.1em]"
        digit=":"
        variant={colVariant}
        sign={`col-0-${time.second[1]}`}
      />
      <AnimateDigit digit={time.minute[0]} variant={numVariant} sign={`min-0-${time.minute[0]}`} />
      <AnimateDigit
        digit={time.minute[1]}
        variant={numVariant}
        sign={`min-1-${time.minute[1]}`}
      />{' '}
      WIB
    </p>
  );
}

function AnimateDigit({ digit, variant, sign, className }: AnimatedDigitProps) {
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
    second: splitDigit(splitedDate[2].split(' ')[0]),
  };
}
