import { styles as COCStyles } from '@/fragments/home/home-projects/home-projects-coc';
import { styles as MarquesStyles } from '@/fragments/home/home-masteries/home-masteries-marquee';
import type { AnimationSequence } from 'framer-motion';
import type { ReactNode, HTMLAttributes } from 'react';

export type HeroSequencesProps = {
  part: 'ready' | 'go';
};
export type MasteriesSequencesProps = {
  part: 'ready' | 'go';
  extraSequence?: AnimationSequence;
  marqueeX?: number;
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
export type ProjectsCOCProps = {
  className?: Partial<typeof COCStyles.slots>;
} & Omit<HTMLAttributes<HTMLOrSVGElement>, 'className'>;
export type ProjectsCardProps = {
  className?: string;
  content: {
    image: string;
    title: string;
    type: string;
  };
};
