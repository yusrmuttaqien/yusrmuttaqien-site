import { ReactNode } from 'react';
import AnimationSequenceProvider from '@/app/providers/animation-sequence';

export default function Providers({ children }: { children: ReactNode }) {
  return <AnimationSequenceProvider>{children}</AnimationSequenceProvider>;
}
