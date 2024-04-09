// TODO: Update to able receive element as selector

import { useRef } from 'react';
import { useRouter } from 'next/router';
import SplitType, { type SplitTypeOptions } from 'split-type';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';

export default function useSplitType(selector: string, options: Partial<SplitTypeOptions>) {
  const { locale } = useRouter();
  const instance = useRef<SplitType | null>(null);

  useIsomorphicLayoutEffect(() => {
    instance.current = new SplitType(selector, options);
    const el = document.querySelector(selector) as HTMLElement;
    const debouncedCalculate = debounce(() => {
      requestAnimationFrame(() => {
        instance.current?.split(options);
      });
    }, 100);

    el.style.fontKerning = 'none';
    window.addEventListener('resize', debouncedCalculate);

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
      el.style.fontKerning = 'unset';
      instance.current?.revert();
    };
  }, [locale]);

  return instance;
}
