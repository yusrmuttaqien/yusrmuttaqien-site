import type { WaitList, SequenceConfig } from '~/types/composables-states';

export const useWaitList = () => useState<WaitList>('wait-list', () => ({}));
export const useSequenceConfig = () =>
  useState<SequenceConfig>('sequence-config', () => ({
    isEnabled: true,
  }));
