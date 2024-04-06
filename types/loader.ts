interface SequencesReady {
  part: 'ready';
  scaleFrom?: never;
  scaleTo?: never;
}
interface SequencesGo {
  part: 'go';
  scaleFrom: number;
  scaleTo: number;
}

export type SequencesProps = SequencesGo | SequencesReady;
