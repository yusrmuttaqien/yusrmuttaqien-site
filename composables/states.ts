import { SplashStatus } from '@/types';

export const useSplash = () =>
  useState<{ status: SplashStatus }>('splash', () => ({ status: SplashStatus.animateIn }));
