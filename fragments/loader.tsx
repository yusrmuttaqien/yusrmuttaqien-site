import useLoaderAnimate from '@/hooks/loader-animate';
import classMerge from '@/utils/class-merge';
import { ID_LOADER } from '@/constants/loader';

declare global {
  interface Window {
    loader: number;
  }
}

const style = 'rounded-full origin-center border-[2px]';

export default function Loader() {
  const scope = useLoaderAnimate();

  return (
    <div ref={scope} className="fixed inset-0 bg-beige dark:bg-grey isolate z-[102]">
      <div
        id={ID_LOADER}
        data-framer="loader-outer"
        className={classMerge(
          'translate-center aspect-square w-screen max-w-[100vh] transition-transform ease-out-expo duration-1000',
          'scale-50 -translate-x-1/2 -translate-y-1/2 animate-loader-bubble-out',
          'border-grey/20 dark:border-beige/20',
          style
        )}
      >
        <div
          data-framer="loader-inner"
          className={classMerge(
            'h-full aspect-square border-grey/15 dark:border-beige/15',
            'animate-loader-scale-radiate-out',
            style
          )}
        />
      </div>
    </div>
  );
}
