import { ReactLenis } from '@studio-freight/react-lenis';
import type { LenisProps } from '@/types/lenis';

export default function LenisProvider(props: LenisProps) {
  const { children, options } = props;

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
