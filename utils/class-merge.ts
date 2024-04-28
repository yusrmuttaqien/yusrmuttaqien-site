import { tv } from 'tailwind-variants';
import type { ClassMerge } from '@/types/utils';

export default function classMerge(...classes: ClassMerge) {
  return tv({ base: classes })();
}
