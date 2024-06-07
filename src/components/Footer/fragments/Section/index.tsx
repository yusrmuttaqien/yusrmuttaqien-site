import { tv } from 'tailwind-variants';
import classMerge from '@/utils/classMerge';
import type { SectionProps } from '@/components/Footer/fragments/Section/type';

export const SECTION_STYLES = tv({
  slots: {
    container: classMerge(
      'border border-dynamic-[grey_20] flex flex-col p-[0.625rem] gap-4',
      'lg:flex-row lg:justify-between lg:gap-16'
    ),
    title: 'trim-helvetiva-neue font-semibold text-dynamic-[grey_60]',
  },
});

export default function Section(props: SectionProps) {
  const { title, children, className } = props;
  const { container, title: titleStyle } = SECTION_STYLES();

  return (
    <section className={container({ className: className?.container })}>
      <h2 className={titleStyle({ className: className?.title })}>{title}</h2>
      {children}
    </section>
  );
}
