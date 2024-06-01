import Arrow from '@/components/Link/fragments/Arrow';
import classMerge from '@/utils/classMerge';
import type { ArrowLookProps } from '@/components/Link/fragments/ArrowLook/type';

export default function ArrowLook(props: ArrowLookProps) {
  const { children, isActive, isDisabled } = props;

  return (
    <div
      className={classMerge(
        'flex gap-1 items-center group',
        isDisabled && 'text-dynamic-[grey_40]'
      )}
    >
      <p className={classMerge('inline-block body trim-helvetiva-neue', isActive && 'font-bold')}>
        {children}
      </p>
      <div className={classMerge('overflow-hidden relative', isActive && 'text-dynamic-[grey_40]')}>
        <Arrow
          className={classMerge(
            'h-[1em] aspect-square transition-none delay-150',
            !isDisabled && !isActive && 'group-hover:hoverable:translate-x-full',
            !isDisabled && !isActive && 'group-hover:hoverable:transition-transform',
            !isDisabled && !isActive && 'group-hover:hoverable:-translate-y-full'
          )}
        />
        <Arrow
          className={classMerge(
            'h-[1em] aspect-square -translate-x-full translate-y-full',
            'delay-300 absolute inset-0 transition-none',
            !isDisabled && !isActive && 'group-hover:hoverable:translate-x-0',
            !isDisabled && !isActive && 'group-hover:hoverable:transition-transform',
            !isDisabled && !isActive && 'group-hover:hoverable:translate-y-0'
          )}
        />
      </div>
    </div>
  );
}
