import Lenis from '@studio-freight/lenis';
import { InitLenis } from '~/types/lenis';

export function initLenis(options?: InitLenis) {
  const lenisInstance = new Lenis(options as typeof Lenis.prototype.options);

  function raf(time: number) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenisInstance;
}
