import { useCallback, useRef, type RefObject } from 'react';
import { useMeasurementCtx } from '@/providers/measurements';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';
import { MEASURE_NAVBAR_TRIES } from '@/constants/navbar';
import { ID_YUSR_MUTTAQIEN_PLACEHOLDER } from '@/constants/yusr-muttaqien';

export default function useNavbarMeasure(el: RefObject<HTMLDivElement | undefined>) {
  const retries = useRef(0);
  const { setState } = useMeasurementCtx();

  const _measure = useCallback((cb?: ((isComplete: boolean) => void) | null) => {
    requestAnimationFrame(() => {
      const navHeight = el.current?.offsetHeight || undefined;
      const navYusrMuttaqienHeight =
        (
          el.current?.querySelector(
            '#' + ID_YUSR_MUTTAQIEN_PLACEHOLDER + 'navbar'
          ) as HTMLDivElement
        )?.offsetHeight || undefined;

      cb?.(!!navYusrMuttaqienHeight);
      setState((draft) => {
        draft.navbarHeight = (navHeight || 0) + (navYusrMuttaqienHeight || 0);
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
