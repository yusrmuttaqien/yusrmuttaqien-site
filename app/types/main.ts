import { contentStyles } from '@/app/fragments/main/main-projects/card/main-projects-card';
import type { ReactNode } from 'react';
import type { MotionStyle } from 'framer-motion';

export type MainMasteriesArticleProps = {
  title: string;
  contents: string[];
};
export type MainHeroAnimateProps = {
  className?: string;
  children?: ReactNode;
};
export type CardContentWrapperProps = {
  toggleCover: VoidFunction;
  textSizePlaceholder: string;
  children?: React.ReactNode;
};
export type CardCoverProps = {
  className?: string;
  style?: MotionStyle;
  toggleCover: VoidFunction;
  content: { countText: string; title: string; tags: string[] };
};
export type MainProjectsCardProps = {
  idx: number;
  title: string;
  children: React.ReactNode;
  tags: string[];
  className?: Partial<typeof contentStyles.slots>;
};
export type MenuButtonProps = {
  text: string;
  disabled?: boolean;
};
