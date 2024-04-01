import { inView } from 'framer-motion';
import { ID_YUSR_MUTTAQIEN_PLACEHOLDER } from '@/app/constants/yusr-muttaqien';

export default function YusrMuttaqienPlaceholderObserver(
  id: string,
  cb: VoidFunction,
  config: Parameters<typeof inView>[2]
) {
  let stopObserve: VoidFunction;

  function startObserve() {
    const el = document.getElementById(ID_YUSR_MUTTAQIEN_PLACEHOLDER + id);

    stopObserve = inView(el as HTMLElement, cb, config);

    return el;
  }

  if (!startObserve()) {
    requestAnimationFrame(startObserve);
  } else {
    // @ts-ignore:next-line
    return stopObserve;
  }
}
