import { tv } from 'tailwind-variants';
import classMerge from '@/utils/class-merge';
import type { MasteriesHeaderProps } from '@/types/home';

export const styles = tv({
  slots: {
    header: classMerge(
      'flex flex-col gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)]',
      'lg:flex-row lg:gap-0 lg:justify-between'
    ),
    subheadingGroup: 'shrink-0',
    subheading: 'body-subheading text-green-dynamic',
    title: 'h2-normal lg:w-[clamp(37.375rem,_28.0252rem_+_17.9372vw,_42.375rem)]',
    subheadingChildren: '',
    headerChildren: '',
  },
});

export default function HomeMasteriesHeader(props: MasteriesHeaderProps) {
  const { subtitle, title, children, className } = props;
  const {
    header,
    subheadingGroup,
    subheading,
    title: titleClass,
    subheadingChildren,
    headerChildren,
  } = styles();

  return (
    <header className={header({ className: className?.header })}>
      <div className={subheadingGroup({ className: className?.subheadingGroup })}>
        <p
          data-framer="masteries-header-subtitle"
          className={subheading({ className: className?.subheading })}
        >
          {subtitle}
        </p>
        {children && (
          <div
            data-framer="masteries-header-children"
            className={subheadingChildren({ className: className?.subheadingChildren })}
          >
            {children}
          </div>
        )}
      </div>
      <h2
        data-framer="masteries-header-title"
        className={titleClass({ className: className?.title })}
      >
        {title}
      </h2>
      {children && (
        <div
          data-framer="masteries-header-children"
          className={headerChildren({ className: className?.headerChildren })}
        >
          {children}
        </div>
      )}
    </header>
  );
}
