import type { Wrap } from '@/types/utils';

export default function wrap(props: Wrap) {
  const { min, max, v } = props;
  const rangeSize = max - min;

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
