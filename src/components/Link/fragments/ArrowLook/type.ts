import { ARROW_LOOK_STYLES } from '@/components/Link/fragments/ArrowLook';
import type { ReactNode } from 'react';

export type ArrowLookProps = {
  children: ReactNode;
  isActive: boolean | undefined;
  isDisabled: boolean | undefined;
  className?: Partial<typeof ARROW_LOOK_STYLES.slots>;
};
