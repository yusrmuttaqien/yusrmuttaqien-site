'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import { useMeasurementCtx } from '@/app/providers/measurements';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import debounce from '@/app/utils/debounce';
import { ID_NAVBAR_YUSR_MUTTAQIEN } from '@/app/constants/navbar';

export default function NavbarMeasurement() {
  const isCompleteCalculated = useRef(false);
  const {
    setState: measurementState,
    state: { navbarTotalHeight },
  } = useMeasurementCtx();
  const {
    state: { bigTitlePos },
  } = useAnimationSequenceCtx();
  const isShowTitle = !bigTitlePos.hero && !bigTitlePos.footer && bigTitlePos.navbar;

  const _measure = useCallback(() => {
    const navbar = document.getElementById('navbar')?.offsetHeight || undefined;
    const navbarYusrMuttaqien =
      document.getElementById(ID_NAVBAR_YUSR_MUTTAQIEN)?.offsetHeight || undefined;
    const navbarTotal = navbar && navbarYusrMuttaqien ? navbar + navbarYusrMuttaqien : undefined;

    measurementState((draft) => {
      draft.navbarHeight = navbar;
      draft.navbarYusrMuttaqienHeight = navbarYusrMuttaqien;
      draft.navbarTotalHeight = navbarTotal;
    });
  }, [measurementState]);

  useLayoutEffect(() => {
    const debouncedMeasure = debounce(_measure, 100);

    window.addEventListener('resize', debouncedMeasure);

    return () => window.removeEventListener('resize', debouncedMeasure);
  }, [_measure]);

  useLayoutEffect(() => {
    if (isCompleteCalculated.current) return;

    _measure();
    navbarTotalHeight && (isCompleteCalculated.current = true);
  }, [_measure, isShowTitle, navbarTotalHeight]);

  return null;
}
