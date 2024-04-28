import type { ReactNode } from 'react';
import type { Updater } from 'use-immer';

export type MeasurementInitialState = {
  navbarHeight: number | undefined;
};
export type MeasurementState = {
  state: MeasurementInitialState;
  setState: Updater<MeasurementInitialState>;
};
export type MeasurementProps = {
  children: ReactNode;
};
