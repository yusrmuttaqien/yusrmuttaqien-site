import Lenis from '@studio-freight/lenis';
import type { LenisWrapper, LenisOptions } from '~/types/composables-use-lenis';

const ID_LENIS = 'lenis';

export default function useLenis(wrapper?: LenisWrapper, options: LenisOptions = {}) {
  const sequence = useWaitSequence(ID_LENIS);
  const instance = ref<InstanceType<typeof Lenis> | null>(null);

  function raf(time: number) {
    if (!instance.value) return;

    instance.value.raf(time);
    requestAnimationFrame(raf);
  }

  watch(
    () => ({ isLoaded: instance.value, id: sequence.currentID() }),
    (newState) => {
      if (!newState.isLoaded || !newState.id) return;

      sequence.updateSequence(newState.id, true);
    }
  );

  onMounted(() => {
    instance.value = new Lenis({
      wrapper: wrapper?.(),
      ...options,
    });

    requestAnimationFrame(raf);
  });

  onUnmounted(() => {
    instance.value?.destroy();
  });

  return () => instance.value;
}
