import { tv } from 'tailwind-variants';

export default function classMerge(...classes: (string | undefined | null | false)[]) {
  return tv({ base: classes })();
}
