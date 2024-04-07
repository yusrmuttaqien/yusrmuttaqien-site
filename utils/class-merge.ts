import { tv } from 'tailwind-variants';

export default function classMerge(...classes: (string | undefined | null)[]) {
  return tv({ base: classes })();
}