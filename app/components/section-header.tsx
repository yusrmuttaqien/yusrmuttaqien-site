import classMerge from '@/app/utils/class-merge';

export default function SectionHeader({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <header
      className={classMerge(
        'flex flex-col gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)]',
        'lg:flex-row lg:gap-0 lg:justify-between'
      )}
    >
      <p className="body-subheading text-green-dynamic shrink-0">{subtitle}</p>
      <h2 className="h2-normal lg:w-[clamp(37.375rem,_28.0252rem_+_17.9372vw,_42.375rem)]">
        {title}
      </h2>
    </header>
  );
}
