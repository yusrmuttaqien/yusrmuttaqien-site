import type { Wrap } from '@/utils/wrap/type';

export default function wrap(params: Wrap) {
  const { min, max, v } = params;
  const rangeSize = max - min;

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
