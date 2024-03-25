import type { MotionStyle } from 'framer-motion';
import { contentStyles } from '@/app/fragments/main-projects/card/main-projects-card';

export type CardContentWrapperProps = {
  toggleCover: () => void;
  textSizePlaceholder: string;
  children?: React.ReactNode;
};

export type CardCoverProps = {
  className?: string;
  style?: MotionStyle;
  toggleCover: () => void;
  content: { countText: string; title: string; tags: string[] };
};

export type MainProjectsCardProps = {
  idx: number;
  title: string;
  children: React.ReactNode;
  tags: string[];
  className?: Partial<typeof contentStyles.slots>;
};
