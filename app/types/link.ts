import Nextlink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import type { AnimationSequenceState } from '@/app/types/animation-sequence';

export interface LinkProps extends ComponentPropsWithoutRef<typeof Nextlink> {
  announcing?: AnimationSequenceState['state']['announcing'];
}
