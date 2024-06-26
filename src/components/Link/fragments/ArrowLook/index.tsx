import { tv } from 'tailwind-variants';
import Arrow from '@/svg/Arrow';
import classMerge from '@/utils/classMerge';
import type { ArrowLookProps } from '@/components/Link/fragments/ArrowLook/type';

export const ARROW_LOOK_STYLES = tv({
  slots: {
    container: 'flex gap-1 items-center group/look',
    text: 'inline-block body trim-helvetiva-neue',
  },
});

export default function ArrowLook(props: ArrowLookProps) {
  const { children, isActive, isDisabled, className } = props;
  const { container, text } = ARROW_LOOK_STYLES();

  return (
    <div
      className={container({
        className: classMerge(isDisabled && 'text-dynamic-[grey_50]', className?.container),
      })}
    >
      <p className={text({ className: classMerge(isActive && 'font-bold', className?.text) })}>
        {children}
      </p>
      {/* TODO: Animate layout and exit */}
      {!isActive && !isDisabled && (
        <div className={classMerge('overflow-hidden relative')}>
          <Arrow
            className={classMerge(
              'h-[1em] aspect-square transition-none delay-150',
              'group-hover/look:hoverable:translate-x-full',
              'group-hover/look:hoverable:transition-transform',
              'group-hover/look:hoverable:-translate-y-full'
            )}
          />
          <Arrow
            className={classMerge(
              'h-[1em] aspect-square -translate-x-full translate-y-full',
              'delay-300 absolute inset-0 transition-none',
              'group-hover/look:hoverable:translate-x-0',
              'group-hover/look:hoverable:transition-transform',
              'group-hover/look:hoverable:translate-y-0'
            )}
          />
        </div>
      )}
    </div>
  );
}
