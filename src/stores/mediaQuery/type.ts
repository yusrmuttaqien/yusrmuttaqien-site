import { initialState } from '@/stores/mediaQuery';

export type MediaQueryState = typeof initialState;
export type MediaQueryActions = {
  update: (key: keyof MediaQueryState, value: boolean) => void;
  bulkUpdate: (values: Partial<Record<keyof MediaQueryState, any>>) => void;
  validate: () => void;
};
export type MediaQueryStore = MediaQueryState & MediaQueryActions;
