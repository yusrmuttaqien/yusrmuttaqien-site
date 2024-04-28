import type { MoveToProps } from '@/types/utils';

export default function moveTo(props: MoveToProps) {
  const { anchor, preoffset = 0, offset, boundary = 0 } = props;

  if (boundary) {
    return Math.min(Math.max(anchor - (preoffset + offset / 2), -boundary), boundary);
  } else {
    return anchor - (preoffset + offset / 2);
  }
}
