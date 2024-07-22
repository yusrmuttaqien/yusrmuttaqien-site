import { createContext, useRef, useContext } from 'react';
import { INITIAL_VALUES } from '@/contexts/statics/constant';
import type { StaticsProviderProps, StaticsStatic, StaticsValue } from '@/contexts/statics/type';

const StaticsContext = createContext<StaticsStatic | undefined>(undefined);

export default function StaticsProvider(props: StaticsProviderProps) {
  const { children } = props;
  const storeRef = useRef<StaticsValue>(INITIAL_VALUES);

  return <StaticsContext.Provider value={storeRef}>{children}</StaticsContext.Provider>;
}

export function useStatics(): StaticsStatic {
  const staticsContext = useContext(StaticsContext);

  if (!staticsContext) {
    throw new Error(`useStatics must be used within StaticsProvider`);
  }

  return staticsContext;
}
