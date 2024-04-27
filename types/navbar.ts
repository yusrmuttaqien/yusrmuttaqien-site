import type { EntryStatus } from '@/types/animation-sequence';
import type { MotionProps, AnimationSequence } from 'framer-motion';
import type { RefObject } from 'react';

export type ClockDigitProps = {
  digit: string;
  variant?: MotionProps;
  sign: string;
  className?: string;
};
export type LangProps = {
  className?: string;
};
export type LangSwitchProps = {
  locale: string;
  className?: string;
  idx: number;
};
export type ClockProps = {
  className?: string;
};
export type Sequences = {
  status: EntryStatus;
};
export type SequencesSequence = Partial<Record<EntryStatus, AnimationSequence>>;
export type MeasureProps = {
  root: RefObject<HTMLDivElement | undefined>;
};
export type MeasureMeasure = ((isComplete: boolean) => void) | null;
