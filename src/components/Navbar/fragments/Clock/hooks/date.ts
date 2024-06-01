import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useClockStore } from '@/components/Navbar/context';
import getDate from '@/components/Navbar/fragments/Clock/utils/getDate';
import allEqual from '@/components/Navbar/fragments/Clock/utils/allEqual';
import type { ClockState } from '@/components/Navbar/type';

export default function useDate() {
  const dateRef = useRef<ClockState>();
  const { updateHour, updateMinute, updateSecond, updateAll } = useClockStore(
    (state) => state.updater
  );

  useIsomorphicLayoutEffect(() => {
    function _update(initial: boolean) {
      const date = getDate();
      !dateRef.current && (dateRef.current = date);

      if (initial) {
        updateAll(date);
      } else {
        !allEqual({ arr1: date.hour, arr2: dateRef.current.hour }) && updateHour(date.hour);
        !allEqual({ arr1: date.minute, arr2: dateRef.current.minute }) && updateMinute(date.minute);
        !allEqual({ arr1: date.second, arr2: dateRef.current.second }) && updateSecond(date.second);
        dateRef.current = date;
      }

      requestAnimationFrame(_update.bind(null, false));
    }

    _update(true);
  }, []);
}
