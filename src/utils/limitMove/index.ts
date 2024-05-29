import type { LimitMove } from '@/utils/limitMove/type';

export default function limitMove(props: LimitMove) {
  const { anchor, preoffset = 0, offset, limit = 0 } = props;

  if (limit) {
    return Math.min(Math.max(anchor - (preoffset + offset / 2), -limit), limit);
  } else {
    return anchor - (preoffset + offset / 2);
  }
}
