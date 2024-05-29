import type { AnimatePresenceProps } from 'framer-motion';

export type TransComp = Record<string, (v: string) => any>;

interface TransCommonProps {
  comps: TransComp;
  string: string;
  name: string;
  classNames?: Record<string, string>;
  withPresence?: boolean;
}

export type TransProps<T> = T extends { withPresence: true }
  ? TransCommonProps & AnimatePresenceProps
  : TransCommonProps;
