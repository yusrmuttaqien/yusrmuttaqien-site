import { useRouter } from 'next/router';
import { useRef, useState, useCallback } from 'react';
import SplitType from 'split-type';
import { useMediaQueryCtx } from '@/providers/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';
import type { SplitTypeProps } from '@/types/split-type';

export default function useSplitType(props: SplitTypeProps) {
  const { selector, options } = props;
  const { locale } = useRouter();
  const isDisengaged = useRef(false);
  const lastLocale = useRef<string>();
  const currentLocale = useRef<string>();
  const { isValidated } = useMediaQueryCtx();
  const [lastRun, setLastRun] = useState<number>(0);
  const splitInstance = useRef<SplitType | null>(null);
  const observerInstance = useRef<MutationObserver | null>(null);
  const debouncedResplit = useCallback(debounce(_resplit, 100), []);

  function _resplit() {
    splitInstance.current?.split(options);
    !isDisengaged.current && setLastRun(Date.now());
  }
  function _disengage() {
    observerInstance.current?.disconnect();
    observerInstance.current = null;
    isDisengaged.current = true;
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;
    if (!splitInstance.current) {
      requestAnimationFrame(() => {
        splitInstance.current = SplitType.create(selector, options);
      });
    }
    const el = document.querySelector(selector) as HTMLElement;
    el.style.fontKerning = 'none';

    window.addEventListener('resize', debouncedResplit);

    if (!observerInstance.current) {
      isDisengaged.current = false;
      observerInstance.current = new MutationObserver(() => {
        if (lastLocale.current === currentLocale.current) return;

        lastLocale.current = currentLocale.current;
        _resplit();
      });

      observerInstance.current.observe(el as Node, {
        childList: true,
      });
      _resplit();
    }

    return () => {
      _disengage();
      window.removeEventListener('resize', debouncedResplit);
    };
  }, [isValidated]);
  useIsomorphicLayoutEffect(() => {
    SplitType.clearData();

    if (isDisengaged.current) {
      splitInstance.current = null;

      window.removeEventListener('resize', debouncedResplit);
    } else {
      currentLocale.current = locale;
    }
  }, [locale]);

  return { instance: splitInstance, resplit: _resplit, lastRun, disconnect: _disengage };
}
