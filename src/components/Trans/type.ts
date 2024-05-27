import type { AnimatePresenceProps } from 'framer-motion';

interface TransCommonProps {
  comps: Record<string, (v: string) => any>;
  string: string;
  name: string;
  classNames?: Record<string, string>;
  withPresence?: boolean;
}

export type TransProps<T> = T extends { withPresence: true }
  ? TransCommonProps & AnimatePresenceProps
  : TransCommonProps;
