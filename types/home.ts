import { styles as MarquesStyles } from '@/fragments/home/home-masteries/home-masteries-marquee';
import type { AnimationSequence, AnimationControls } from 'framer-motion';
import type { ReactNode } from 'react';
import type { HowSteps } from '@/types/content';

export type HeroSequencesProps = {
  part: 'ready' | 'go';
};
export type MasteriesSequencesProps = {
  part: 'ready' | 'go';
  extraSequence?: AnimationSequence;
  marqueeX?: number;
};
export type ProjectsSequencesProps = {
  part: 'ready' | 'go';
  title2ML?: number;
};
export type MasteriesListProps = {
  title: string;
  contents: string[];
  idx: number;
};
export type MasteriesMarqueeProps = {
  children: ReactNode;
  baseVelocity: number;
  className?: Partial<typeof MarquesStyles.slots>;
  name?: string;
};
export type ProjectsCardProps = {
  className?: string;
  content: {
    image: string;
    title: string;
    type: string;
  };
};
export type HowDesktopCardProps = {
  className?: string;
  active: keyof HowSteps | undefined;
  control: AnimationControls;
};
