'use client';

import { useLayoutEffect, useCallback } from 'react';
import { useMeasurementCtx } from '@/app/providers/measurements';
import debounce from '@/app/utils/debounce';
import { ID_NAVBAR_YUSR_MUTTAQIEN } from '@/app/constants/navbar';

export default function NavbarMeasurement() {
  const { setState: measurementState } = useMeasurementCtx();

  const _measure = useCallback(
    (cb?: ((isComplete: boolean) => void) | null) => {
      const navbar = document.getElementById('navbar')?.offsetHeight || undefined;
      const navbarYusrMuttaqien =
        document.getElementById(ID_NAVBAR_YUSR_MUTTAQIEN)?.offsetHeight || undefined;
      const navbarTotal = navbar && navbarYusrMuttaqien ? navbar + navbarYusrMuttaqien : undefined;

      cb?.(!!navbarTotal);
      measurementState((draft) => {
        draft.navbarHeight = navbar;
        draft.navbarYusrMuttaqienHeight = navbarYusrMuttaqien;
        draft.navbarTotalHeight = navbarTotal;
      });
    },
    [measurementState]
  );

  useLayoutEffect(() => {
    const debouncedMeasure = debounce(_measure, 100);
    const bindedMeasure = _measure.bind(null, (isComplete) => {
      isComplete && window.removeEventListener('scroll', bindedMeasure);
    });

    window.addEventListener('resize', debouncedMeasure.bind(null, null));
    window.addEventListener('scroll', bindedMeasure);
    _measure();

    return () => {
      window.removeEventListener('resize', debouncedMeasure.bind(null, null));
      window.removeEventListener('scroll', bindedMeasure);
    };
  }, [_measure]);

  return null;
}
