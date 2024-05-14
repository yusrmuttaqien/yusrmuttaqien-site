import { useRef } from 'react';
import type { LongPressProps, PushInteractive } from '@/types/long-press';

export function useLongPress(props: LongPressProps) {
  const { onStart, onFinish, threshold = 400, onInterrupt } = props;
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
    }, threshold);
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
