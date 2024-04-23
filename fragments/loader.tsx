import useLoaderExit from '@/hooks/loader-exit';
import classMerge from '@/utils/class-merge';

const style = 'rounded-full origin-center border-[2px]';

export default function Loader() {
  const scope = useLoaderExit();

  return (
    <div ref={scope} className="fixed inset-0 isolate z-[102] cursor-wait overflow-hidden">
      <div
        data-framer="loader-outer"
        className={classMerge(
          'translate-center aspect-square w-screen max-w-[100vh] transition-transform ease-out-expo duration-1000',
          'scale-50 -translate-x-1/2 -translate-y-1/2 border-grey-dynamic-[40] border-[0.1875rem]',
          'animate-loader-outer-bubble-out',
          style
        )}
      >
        <div
          data-framer="loader-inner"
          className={classMerge(
            'h-full aspect-square border-grey-dynamic-[40]',
            'animate-loader-inner-radiate-out border-[0.1875rem]',
            style
          )}
        />
      </div>
    </div>
  );
}
