'use client';

import { useImmer } from 'use-immer';
import { createContext, useContext, type ReactNode } from 'react';
import { MEASUREMENT_INITIAL_STATE } from '@/app/constants/measurements';
import type { MeasurementState } from '@/app/types/measurement';

const MeasurementContext = createContext<MeasurementState>({
  state: MEASUREMENT_INITIAL_STATE,
  setState: () => {},
});

export default function MeasurementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useImmer(MEASUREMENT_INITIAL_STATE);

  return (
    <MeasurementContext.Provider value={{ state, setState }}>
      {children}
    </MeasurementContext.Provider>
  );
}

export function useMeasurementCtx() {
  return useContext(MeasurementContext);
}
