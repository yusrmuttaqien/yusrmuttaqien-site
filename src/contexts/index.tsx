import TogglesStoreProvider from '@/contexts/toggles';
import MeasuresStoreProvider from '@/contexts/measures';
import MediaQueryStoreProvider from '@/contexts/mediaQuery';

export default function Contexts({ children }: { children: React.ReactNode }) {
  return (
    <MediaQueryStoreProvider>
      <TogglesStoreProvider>
        <MeasuresStoreProvider>{children}</MeasuresStoreProvider>
      </TogglesStoreProvider>
    </MediaQueryStoreProvider>
  );
}
