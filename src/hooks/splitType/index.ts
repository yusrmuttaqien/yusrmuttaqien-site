import SplitType from 'split-type';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import type { SplitTypeParams } from '@/hooks/splitType/type';

export default function useSplitType(params: SplitTypeParams) {
  const { selector = '', options } = params;
  const scope = useRef<HTMLElement>(null);
  const instance = useRef<SplitType | null>(null);

  function _resplit() {
    SplitType.clearData();
    requestAnimationFrame(() => {
      instance.current?.split(options);
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!scope.current && !selector) return;
    if (!instance.current) {
      instance.current = SplitType.create(scope.current || selector, options);
    }
    if (scope.current) {
      const el = scope.current;

      el.style.fontKerning = 'none';
    } else if (selector) {
      const el = document.querySelectorAll(selector);
      el.forEach((el) => ((el as HTMLElement).style.fontKerning = 'none'));
    }

    return SplitType.clearData;
  }, []);

  return { scope, resplit: _resplit };
}
