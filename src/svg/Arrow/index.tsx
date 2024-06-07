import type { ArrowProps } from '@/svg/Arrow/type';

export default function Arrow(props: ArrowProps) {
  return (
    <svg {...props} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.88643 2.13809H8.83065M8.83065 2.13809L8.7332 7.98487M8.83065 2.13809L2.10686 8.86188"
        stroke="currentColor"
        strokeWidth="0.77957"
        strokeLinecap="square"
      />
    </svg>
  );
}
