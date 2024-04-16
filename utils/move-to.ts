import type { MoveToProps } from '@/types/move-to';

export default function moveTo({ anchor, preoffset = 0, offset, boundary = 0 }: MoveToProps) {
  if (boundary) {
    return Math.min(Math.max(anchor - (preoffset + offset / 2), -boundary), boundary);
  } else {
    return anchor - (preoffset + offset / 2);
  }
}
