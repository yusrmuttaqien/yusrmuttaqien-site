import { ReactLenis } from '@studio-freight/react-lenis';
import type { LenisProviderProps } from '@/types/lenis';

export default function LenisProvider({ children, options }: LenisProviderProps) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
