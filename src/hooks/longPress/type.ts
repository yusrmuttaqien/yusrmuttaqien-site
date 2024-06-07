import type { MouseEvent, TouchEvent } from 'react';

export type PushInteractive = MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>;
export type LongPress = {
  onStart?: (e: PushInteractive) => void;
  onFinish?: (e: PushInteractive) => void;
  onInterrupt?: (e: PushInteractive) => void;
  wait?: number;
};
