import { ReactLenis } from '@studio-freight/react-lenis';
import TogglesStoreProvider from '@/contexts/toggles';
import MeasuresStoreProvider from '@/contexts/measures';
import MediaQueryStoreProvider from '@/contexts/mediaQuery';

export default function Contexts({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <MediaQueryStoreProvider>
        <TogglesStoreProvider>
          <MeasuresStoreProvider>{children}</MeasuresStoreProvider>
        </TogglesStoreProvider>
      </MediaQueryStoreProvider>
    </ReactLenis>
  );
}
