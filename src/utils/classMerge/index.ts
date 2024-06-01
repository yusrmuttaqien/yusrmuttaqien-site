import { tv } from 'tailwind-variants';
import type { ClassMerge } from '@/utils/classMerge/type';

export default function classMerge(...classes: ClassMerge): string {
  return tv({ base: classes })();
}
