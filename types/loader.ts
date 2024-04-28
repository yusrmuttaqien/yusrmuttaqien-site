import type { EntryStatus } from '@/types/animation-sequence';
import type { AnimationSequence } from 'framer-motion';

interface SequencesReady {
  status: 'ready';
  scaleFrom?: never;
  scaleTo?: never;
}
interface SequencesGo {
  status: 'running';
  scaleFrom: number;
  scaleTo: number;
}

export type Sequences = SequencesGo | SequencesReady;
export type SequencesSequence = Partial<Record<EntryStatus, AnimationSequence>>;
