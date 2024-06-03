import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import debounce from '@/utils/debounce';

export default function useInteractive() {
  const scope = useRef<HTMLDivElement>(null);
  const scopeClientRect = useRef<DOMRect | null>(null);
  const xHighlight = useMotionValue(0);
  const yHighlight = useMotionValue(0);
  const xSpringHighlight = useSpring(xHighlight);
  const ySpringHighlight = useSpring(yHighlight);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;
    const debouncedGetClientRect = debounce(_getClientRect, 100);

    function _moveHighlight(e: MouseEvent) {
      const { top, left, height, width } = scopeClientRect.current as DOMRect;
      const { offsetHeight, offsetWidth, classList } = root.querySelector(
        '#highlight'
      ) as HTMLDivElement;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const relativeX = e.clientX - centerX - offsetWidth / 2;
      const relativeY = e.clientY - centerY - offsetHeight / 2;

      xHighlight.set(relativeX);
      yHighlight.set(relativeY);
      classList.remove('opacity-0');
    }
    function _trackMouse(e: MouseEvent) {
      root.offsetHeight !== scopeClientRect.current?.height && _getClientRect();
      _moveHighlight(e);
      // TODO: Add interactive gradient for mesh
    }
    function _getClientRect() {
      requestAnimationFrame(() => {
        scopeClientRect.current = root.getBoundingClientRect();
      });
    }

    _getClientRect();
    root.addEventListener('mousemove', _trackMouse);
    window.addEventListener('resize', debouncedGetClientRect);

    return () => {
      root.removeEventListener('mousemove', _trackMouse);
      window.removeEventListener('resize', debouncedGetClientRect);
    };
  }, []);

  return {
    scope,
    xHighlight: xSpringHighlight,
    yHighlight: ySpringHighlight,
  };
}
