import type { WaitList } from '~/types/composables-states';

export const useWaitList = () => useState<WaitList>('wait-list', () => ({}));
