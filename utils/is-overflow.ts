import type { IsOverflow } from '@/types/utils';

export default function isOverflow(el: IsOverflow) {
  if (!el) return false;

  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
}
