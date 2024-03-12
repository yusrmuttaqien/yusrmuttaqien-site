import classMerge from '@/app/utils/class-merge';

export default function Tag({ text, className }: { text: string; className?: string }) {
  return (
    <figure
      className={classMerge(
        'border-grey/50 border dark:border-beige/50',
        'px-[clamp(0.465rem,_-0.0005rem_+_2.3273vw,_0.625rem)]',
        'pb-[clamp(0.1862rem,_0.0008rem_+_0.9273vw,_0.25rem)]',
        'pt-[calc(clamp(0.1862rem,_0.0008rem_+_0.9273vw,_0.25rem)+.2em)]',
        className
      )}
    >
      <p className="body-tag uppercase select-none">{text}</p>
    </figure>
  );
}
