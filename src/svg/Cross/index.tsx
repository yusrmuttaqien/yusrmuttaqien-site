import type { CrossProps } from '@/svg/Cross/type';

export default function Cross(props: CrossProps) {
  return (
    <svg {...props} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.83066 2.13818L5.46877 5.50008M2.10687 8.86197L5.46877 5.50008M5.46877 5.50008L8.83066 8.86197M5.46877 5.50008L2.10687 2.13818"
        stroke="currentColor"
        strokeWidth="0.77957"
        strokeLinecap="square"
      />
    </svg>
  );
}
