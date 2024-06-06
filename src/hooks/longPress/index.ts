import { useRef } from 'react';
import type { LongPress, PushInteractive } from '@/hooks/longPress/type';

export function useLongPress(params?: LongPress) {
  const { onStart, onFinish, onInterrupt, wait = 400 } = params || {};
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isCancelled = useRef(false);

  function _initiate(e: PushInteractive) {
    e.preventDefault();
    timer.current && clearTimeout(timer.current);
    isCancelled.current = false;

    onStart?.(e);
    timer.current = setTimeout(() => {
      timer.current = null;
      onFinish?.(e);
    }, wait);
  }
  function _cancel(e: PushInteractive) {
    if (isCancelled.current) {
      isCancelled.current = true;
      onInterrupt?.(e);
    }

    timer.current && clearTimeout(timer.current);
    timer.current = null;
  }

  return {
    onMouseDown: _initiate,
    onTouchStart: _initiate,
    onMouseUp: _cancel,
    onMouseLeave: _cancel,
    onTouchEnd: _cancel,
  };
}
