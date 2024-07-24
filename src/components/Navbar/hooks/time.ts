import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useClockStore } from '@/components/Navbar/contexts/clock';
import getTime from '@/utils/getTime';
import arrEqual from '@/utils/arrEqual';
import type { ClockState } from '@/components/Navbar/stores/clock/type';

export default function useTime() {
  const timeRef = useRef<ClockState>();
  const { updateHour, updateMinute, updateSecond, updateAll } = useClockStore(
    (state) => state.updater
  );

  useIsomorphicLayoutEffect(() => {
    function _update(initial: boolean) {
      const time = getTime();

      if (initial) {
        updateAll(time);
      } else {
        !arrEqual({ arr1: time.hour, arr2: timeRef.current?.hour }) && updateHour(time.hour);
        !arrEqual({ arr1: time.minute, arr2: timeRef.current?.minute }) &&
          updateMinute(time.minute);
        !arrEqual({ arr1: time.second, arr2: timeRef.current?.second }) &&
          updateSecond(time.second);
      }

      timeRef.current = time;
      requestAnimationFrame(_update.bind(null, false));
    }

    _update(true);
  }, []);
}
