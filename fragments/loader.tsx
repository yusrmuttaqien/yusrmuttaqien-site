import useLoaderEntry from '@/hooks/loader-entry';
import classMerge from '@/utils/class-merge';

const style = 'rounded-full origin-center border-[2px]';

export default function Loader() {
  const scope = useLoaderEntry();

  return (
    <div ref={scope} className="fixed inset-0 isolate z-[102] cursor-wait overflow-hidden">
      <div
        data-framer="loader-outer"
        className={classMerge(
          'translate-center aspect-square w-screen max-w-[100vh] transition-transform ease-out-expo duration-1000',
          'scale-50 -translate-x-1/2 -translate-y-1/2 border-grey/30 dark:border-beige/30 border-[3px]',
          'animate-loader-bubble-out',
          style
        )}
      >
        <div
          data-framer="loader-inner"
          className={classMerge(
            'h-full aspect-square border-grey/40 dark:border-beige/40',
            'animate-loader-scale-radiate-out border-[3px]',
            style
          )}
        />
      </div>
    </div>
  );
}
