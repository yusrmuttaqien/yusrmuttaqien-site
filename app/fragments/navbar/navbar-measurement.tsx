'use client';

import { useLayoutEffect, useCallback, useRef } from 'react';
import { useMeasurementCtx } from '@/app/providers/measurements';
import debounce from '@/app/utils/debounce';
import { ID_NAVBAR_YUSR_MUTTAQIEN, ID_NAVBAR } from '@/app/constants/navbar';

const RETRIES = 2;

export default function NavbarMeasurement() {
  const timeRetries = useRef(0);
  const { setState: measurementState } = useMeasurementCtx();

  const _measure = useCallback((cb?: ((isComplete: boolean) => void) | null) => {
    const navbar = document.getElementById(ID_NAVBAR)?.offsetHeight || undefined;
    const navbarYusrMuttaqien =
      document.getElementById(ID_NAVBAR_YUSR_MUTTAQIEN)?.offsetHeight || undefined;
    const navbarTotal = navbarYusrMuttaqien ? (navbar || 0) + (navbarYusrMuttaqien || 0) : navbar;

    cb?.(!!navbarYusrMuttaqien);
    measurementState((draft) => {
      draft.navbarHeight = navbar;
      draft.navbarYusrMuttaqienHeight = navbarYusrMuttaqien;
      draft.navbarTotalHeight = navbarTotal;
    });
  }, []);

  useLayoutEffect(() => {
    const debouncedMeasure = debounce(_measure, 100);
    const bindedMeasure = _measure.bind(null, (isComplete) => {
      isComplete && window.removeEventListener('scroll', bindedMeasure);
    });

    function _bruteMeasure(isComplete: boolean) {
      if (isComplete) {
        window.removeEventListener('scroll', bindedMeasure);
      } else {
        timeRetries.current += 1;

        timeRetries.current <= RETRIES && requestAnimationFrame(() => _measure(_bruteMeasure));
      }
    }

    window.addEventListener('resize', debouncedMeasure.bind(null, null));
    window.addEventListener('scroll', bindedMeasure);
    _measure(_bruteMeasure);

    return () => {
      window.removeEventListener('resize', debouncedMeasure.bind(null, null));
      window.removeEventListener('scroll', bindedMeasure);
    };
  }, [_measure]);

  return null;
}
