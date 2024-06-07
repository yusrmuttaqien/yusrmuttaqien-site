import type { Wrap } from '@/utils/wrap/type';

export default function wrap(props: Wrap) {
  const { min, max, v } = props;
  const rangeSize = max - min;

  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}
