'use client';

import { useLayoutEffect } from 'react';
import { useMeasurementCtx } from '@/app/providers/measurements';
import debounce from '@/app/utils/debounce';

export default function NavbarMeasurement() {
  const { setState } = useMeasurementCtx();

  useLayoutEffect(() => {
    function measure() {
      const target = document.getElementById('navbar');

      setState((draft) => {
        draft.navbarHeight = target?.offsetHeight || undefined;
      });
    }

    const debouncedMeasure = debounce(measure, 100);
    window.addEventListener('resize', debouncedMeasure);
    measure();

    return () => window.removeEventListener('resize', debouncedMeasure);
  }, [setState]);

  return null;
}
