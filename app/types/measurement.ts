import { Updater } from 'use-immer';
import { MEASUREMENT_INITIAL_STATE } from '@/app/constants/measurements';

export type MeasurementState = {
  state: typeof MEASUREMENT_INITIAL_STATE;
  setState: Updater<typeof MEASUREMENT_INITIAL_STATE>;
};
