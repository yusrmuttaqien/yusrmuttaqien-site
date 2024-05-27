import type { ArrowProps } from '@/components/Link/fragments/Arrow/type';

export default function Arrow(props: ArrowProps) {
  const { className } = props;

  return (
    <svg className={className} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.25 0.5C10.25 0.361929 10.1381 0.25 10 0.25L7.75 0.25C7.61193 0.25 7.5 0.361928 7.5 0.5C7.5 0.638071 7.61193 0.75 7.75 0.75L9.75 0.75L9.75 2.75C9.75 2.88807 9.86193 3 10 3C10.1381 3 10.25 2.88807 10.25 2.75L10.25 0.5ZM1.17678 9.67678L10.1768 0.676777L9.82322 0.323223L0.823223 9.32322L1.17678 9.67678Z"
        fill="currentColor"
      />
    </svg>
  );
}
