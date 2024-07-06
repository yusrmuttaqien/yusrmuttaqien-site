import { tv } from 'tailwind-variants';
import classMerge from '@/utils/classMerge';
import type { SectionBoxProps } from '@/components/SectionBox/type';

export const SECTION_BOX_STYLES = tv({
  slots: {
    container: classMerge(
      'border border-dynamic-[grey_20] flex flex-col p-[0.625rem] gap-4',
      'lg:flex-row lg:justify-between lg:gap-16'
    ),
    title: 'trim-helvetiva-neue font-semibold text-dynamic-[grey_60]',
  },
});

export default function SectionBox(props: SectionBoxProps) {
  const { title, children, className, id, sectionRef } = props;
  const { container, title: titleStyle } = SECTION_BOX_STYLES();

  return (
    <section ref={sectionRef} id={id} className={container({ className: className?.container })}>
      <h2 className={titleStyle({ className: className?.title })}>{title}</h2>
      {children}
    </section>
  );
}
