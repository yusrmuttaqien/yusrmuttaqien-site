import { useCallback, useRef } from 'react';
import { useMeasurementCtx } from '@/providers/measurements';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';
import { MEASURE_NAVBAR_TRIES } from '@/constants/navbar';
import type { MeasureProps, MeasureMeasure } from '@/types/navbar';

export default function useNavbarMeasure(props: MeasureProps) {
  const { root } = props;
  const retries = useRef(0);
  const { setState } = useMeasurementCtx();

  const _measure = useCallback((cb?: MeasureMeasure) => {
    requestAnimationFrame(() => {
      const height = root.current?.offsetHeight;
      const navYm = root.current?.children.item(1)?.children.item(0)?.children;
      const ymHeight = (navYm?.item(navYm.length - 1) as HTMLDivElement)?.offsetHeight;

      cb?.(!!ymHeight);
      setState((draft) => {
        draft.navbarHeight = (height || 0) + (ymHeight || 0);
      });
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    const debouncedMeasure = debounce(_measure, 100);
    const bindedMeasure = _measure.bind(null, (isComplete) => {
      isComplete && window.removeEventListener('scroll', bindedMeasure);
    });

    function _bruteMeasure(isComplete: boolean) {
      if (isComplete) {
        window.removeEventListener('scroll', bindedMeasure);
      } else {
        retries.current += 1;

        retries.current <= MEASURE_NAVBAR_TRIES &&
          requestAnimationFrame(() => _measure(_bruteMeasure));
      }
    }

    window.addEventListener('resize', debouncedMeasure.bind(null, null));
    window.addEventListener('scroll', bindedMeasure);
    _measure(_bruteMeasure);

    return () => {
      window.removeEventListener('resize', debouncedMeasure.bind(null, null));
      window.removeEventListener('scroll', bindedMeasure);
    };
  }, []);
}
