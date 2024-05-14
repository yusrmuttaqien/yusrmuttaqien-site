import type { MouseEvent, TouchEvent } from 'react';

export type PushInteractive = MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>;
export type LongPressProps = {
  onStart?: (e: PushInteractive) => void;
  onFinish?: (e: PushInteractive) => void;
  threshold?: number;
  onInterrupt?: (e: PushInteractive) => void;
};
