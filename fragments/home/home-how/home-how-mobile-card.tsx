import Image from '@/components/image';
import classMerge from '@/utils/class-merge';
import type { HowMobileCardProps } from '@/types/home';

export default function HomeHowMobileCard({ image, desc, name, className }: HowMobileCardProps) {
  return (
    <figure
      className={classMerge(
        'border border-grey-dynamic-[20]',
        'p-[0.625rem] space-y-[0.625rem]',
        className
      )}
    >
      <Image
        src={image}
        alt={`coc-preview-${name}`}
        className={{ container: 'w-full aspect-video' }}
      />
      <figcaption>{desc}</figcaption>
    </figure>
  );
}
