import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import debounce from '@/utils/debounce';
// import limitMove from '@/utils/limitMove';

export default function useInteractive() {
  const scope = useRef<HTMLDivElement>(null);
  const scopeClientRect = useRef<DOMRect | null>(null);
  // const xMesh = useMotionValue(0);
  // const yMesh = useMotionValue(0);
  // const xSpringMesh = useSpring(xMesh);
  // const ySpringMesh = useSpring(yMesh);
  const xHighlight = useMotionValue(0);
  const yHighlight = useMotionValue(0);
  const xSpringHighlight = useSpring(xHighlight);
  const ySpringHighlight = useSpring(yHighlight);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;
    const debouncedGetClientRect = debounce(_getClientRect, 100);

    function _moveHighlight(e: MouseEvent) {
      const { top, left, height, width } = scopeClientRect.current as DOMRect;
      const { offsetHeight, offsetWidth } = root.querySelector('#highlight') as HTMLDivElement;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const relativeX = e.pageX - centerX - offsetWidth / 2;
      const relativeY = e.pageY - centerY - offsetHeight / 2;

      xHighlight.set(relativeX);
      yHighlight.set(relativeY);
    }
    // TODO: Add interactive gradient for mesh
    // function _moveMesh(e: MouseEvent) {
    //   const { pageX, pageY } = e;
    //   const { top, left, height, width } = scopeClientRect.current as DOMRect;
    //   const { offsetHeight, offsetWidth } = root.querySelector('#pattern') as HTMLDivElement;

    //   xMesh.set(
    //     limitMove({
    //       anchor: pageX,
    //       preoffset: left,
    //       offset: offsetWidth - left * 2 + width,
    //       limit: offsetWidth - width / 2 / 9000,
    //     })
    //   );
    //   yMesh.set(
    //     limitMove({
    //       anchor: pageY,
    //       preoffset: top,
    //       offset: offsetHeight - top * 2 + height,
    //       limit: height - offsetHeight / 2 / 100,
    //     })
    //   );
    // }
    function _trackMouse(e: MouseEvent) {
      root.offsetHeight !== scopeClientRect.current?.height && _getClientRect();
      _moveHighlight(e);
      // _moveMesh(e);
    }
    function _getClientRect() {
      scopeClientRect.current = root.getBoundingClientRect();
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
    // xMesh: xSpringMesh,
    // yMesh: ySpringMesh,
  };
}
