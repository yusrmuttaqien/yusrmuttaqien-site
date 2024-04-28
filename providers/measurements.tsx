import { useImmer } from 'use-immer';
import { createContext, useContext } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import camelToKebabCase from '@/utils/camel-to-kebab';
import { MEASUREMENT_INITIAL_STATE } from '@/constants/measurements';
import type { MeasurementState, MeasurementProps } from '@/types/measurement';

const MeasurementContext = createContext<MeasurementState>({
  state: MEASUREMENT_INITIAL_STATE,
  setState: () => {},
});

export default function MeasurementProvider(props: MeasurementProps) {
  const { children } = props;
  const [state, setState] = useImmer(MEASUREMENT_INITIAL_STATE);
  useIsomorphicLayoutEffect(() => {
    Object.entries(state).map(([key, value]) => {
      const variable = camelToKebabCase(key);

      document.documentElement.style.setProperty(`--${variable}`, value?.toString() + 'px' || null);
    });
  }, [state]);

  return (
    <MeasurementContext.Provider value={{ state, setState }}>
      {children}
    </MeasurementContext.Provider>
  );
}

export function useMeasurementCtx() {
  return useContext(MeasurementContext);
}
