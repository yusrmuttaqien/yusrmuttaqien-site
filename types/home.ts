import useHomeHeroInteractive from '@/hooks/home/home-hero/home-hero-interactive';
import { styles as MasteriesStyles } from '@/fragments/home/home-masteries/home-masteries';
import { styles as MasteriesHeaderStyles } from '@/fragments/home/home-masteries/home-masteries-header';
import type { AnimationSequence, AnimationControls } from 'framer-motion';
import type { ReactNode, HTMLAttributes, RefObject, MutableRefObject } from 'react';
import type { HowSteps } from '@/types/content';
import type { EntryStatus } from '@/types/animation-sequence';
import type { ScreenSize } from '@/types/tailwind-config';

// #region Hero
export type HeroProps = {
  className?: string;
};
export type HeroBlueprintProps = {
  className?: string;
  framerStyles: ReturnType<typeof useHomeHeroInteractive>['bpUnits'];
} & HTMLAttributes<HTMLDivElement>;
export type HeroBlueprintCrossProps = { framerStyles: HeroBlueprintProps['framerStyles']['cross'] };
export type HeroBlueprintCentreProps = {
  framerStyles: HeroBlueprintProps['framerStyles']['centre'];
};
export type HeroYusrMuttaqienProps = {
  root: RefObject<HTMLDivElement>;
};
export type HeroSequences = {
  status: EntryStatus;
};
export type HeroInteractiveProps = {
  status: MutableRefObject<EntryStatus>;
};
export type HeroSequencesSequence = Partial<Record<EntryStatus, AnimationSequence>>;
// #endregion Hero

// #region Masteries
export type MasteriesSequencesSequence = Partial<Record<EntryStatus, AnimationSequence>>;
export type MasteriesSequences = {
  status: EntryStatus;
  marqueeX?: number;
};
export type MasteriesListProps = {
  title: string;
  contents: string[];
  idx: number;
};
export type MasteriesProps = {
  className?: Partial<typeof MasteriesStyles.slots>;
};
export type MasteriesHeaderProps = {
  subtitle: string;
  title: string;
  children?: ReactNode;
  className?: Partial<typeof MasteriesHeaderStyles.slots>;
};
// #endregion Masteries

// #region Projects
export type ProjectsSequencesSequence = Partial<Record<EntryStatus, AnimationSequence>>;
export type ProjectsSequences = {
  status: EntryStatus;
  title2ML?: number;
};
export type ProjectsCardProps = {
  className?: string;
  content: {
    image: string;
    title: string;
    type: string;
  };
};
export type ProjectsProps = {
  className?: string;
};
// #endregion Projects

// #region How
export type HowDesktopCardProps = {
  className?: string;
  active: keyof HowSteps | undefined;
  control: AnimationControls;
};
export type HowMobileCardProps = {
  image: string;
  desc: string;
  name: string;
  className?: string;
};
export type HowDesktopCardImageProps = {
  image: string;
  name: string;
};
export type HowDesktopCardDescProps = {
  desc: string;
  name: string;
};
export type HowDesktopProps = {
  root: RefObject<HTMLDivElement>;
  status: MutableRefObject<EntryStatus>;
};
export type HowMobileHowsProps = {
  image: string;
  desc: string;
  name: string;
};
export type HowProps = {
  className?: string;
};
export type HowDesktopInteractiveProps = {
  root: RefObject<HTMLDivElement>;
  status: MutableRefObject<EntryStatus>;
};
export type HowSequences = {
  status: EntryStatus;
  screen: MutableRefObject<ScreenSize | undefined>;
};
export type HowSequencesSequence = Partial<
  Record<ScreenSize, Partial<Record<EntryStatus, AnimationSequence>>>
>;
// #endregion How
