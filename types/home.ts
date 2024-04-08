import type { AnimationSequence } from 'framer-motion';

export type HeroSequencesProps = {
  part: 'ready' | 'go';
};
export type MasteriesSequencesProps = {
  part: 'ready' | 'go';
  extraSequence?: AnimationSequence;
};
export type MasteriesListProps = {
  title: string;
  contents: string[];
  idx: number;
};
