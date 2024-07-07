import { INITIAL_VALUES } from '@/contexts/statics/constant';
import type { ReactNode, MutableRefObject } from 'react';

export type StaticsValue = typeof INITIAL_VALUES;
export type StaticsStatic = MutableRefObject<StaticsValue>;
export type StaticsProviderProps = {
  children: ReactNode;
};
