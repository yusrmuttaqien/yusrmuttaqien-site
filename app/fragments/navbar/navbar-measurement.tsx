'use client';

import { useLayoutEffect } from 'react';
import { useMeasurementCtx } from '@/app/providers/measurements';
import debounce from '@/app/utils/debounce';
import { ID_NAVBAR_YUSR_MUTTAQIEN } from '@/app/constants/navbar';

export default function NavbarMeasurement() {
  const { setState } = useMeasurementCtx();

  useLayoutEffect(() => {
    function measure() {
      const navbar = document.getElementById('navbar')?.offsetHeight || undefined;
      const navbarYusrMuttaqien =
        document.getElementById(ID_NAVBAR_YUSR_MUTTAQIEN)?.offsetHeight || undefined;
      const navbarTotal = navbar && navbarYusrMuttaqien ? navbar + navbarYusrMuttaqien : undefined;

      if (!navbarYusrMuttaqien) {
        requestAnimationFrame(measure);
      }

      setState((draft) => {
        draft.navbarHeight = navbar;
        draft.navbarYusrMuttaqienHeight = navbarYusrMuttaqien;
        draft.navbarTotalHeight = navbarTotal;
      });
    }

    const debouncedMeasure = debounce(measure, 100);
    window.addEventListener('resize', debouncedMeasure);
    measure();

    return () => window.removeEventListener('resize', debouncedMeasure);
  }, [setState]);

  return null;
}
