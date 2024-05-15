import type { EntryStatus } from '@/types/animation-sequence';
import type { YusrMuttaqienProps } from '@/types/yusr-muttaqien';
import type { AnimationSequence, MotionValue } from 'framer-motion';
import type { ReactNode, RefObject, Ref } from 'react';

export type FooterYusrMuttaqienParam = {
  isInView: MotionValue<boolean>;
};
export type FooterEntryParam = {
  isInView: MotionValue<boolean>;
};
export type FooterYusrMuttaqienProps = {
  className?: YusrMuttaqienProps['className'];
  isInView: MotionValue<boolean>;
};
export type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};
export type FooterProps = {
  scope?: RefObject<HTMLDivElement> | Ref<HTMLDivElement>;
  className?: string;
  isInView: MotionValue<boolean>;
};
export type FooterSequences = {
  status: EntryStatus;
};
export type FooterSequencesSequence = Partial<Record<EntryStatus, AnimationSequence>>;
