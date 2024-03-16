import { tv } from 'tailwind-variants';
import classMerge from '@/app/utils/class-merge';
import type { SectionHeaderProps } from '@/app/types/section-header';

const styles = tv({
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

export default function SectionHeader({
  subtitle,
  title,
  children,
  className,
}: SectionHeaderProps & { className?: Partial<typeof styles.slots> }) {
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
        <p className={subheading({ className: className?.subheading })}>{subtitle}</p>
        {children && (
          <div className={subheadingChildren({ className: className?.subheadingChildren })}>
            {children}
          </div>
        )}
      </div>
      <h2 className={titleClass({ className: className?.title })}>{title}</h2>
      {children && (
        <div className={headerChildren({ className: className?.headerChildren })}>{children}</div>
      )}
    </header>
  );
}
