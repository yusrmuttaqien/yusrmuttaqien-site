import type { MotionStyle } from 'framer-motion';

export type CardContentWrapperProps = {
  className?: string;
  toggleCover: () => void;
  textSizePlaceholder: string;
  children?: React.ReactNode;
};

export type CardCoverProps = {
  className?: string;
  style?: MotionStyle;
  toggleCover: () => void;
  content: { countText: string; title: string };
};
