import Image from '@/components/Image';
import classMerge from '@/utils/classMerge';
import type { CardProps } from '@/components/Projects/fragments/Card/type';

const FIGCAPTION_STYLES = classMerge(
  'flex justify-between gap-8 bg-dynamic-[beige_95] backdrop-blur-md p-2'
);
const FIGCAPTION_P_STYLES = 'trim-helvetiva-neue-height whitespace-pre-wrap';

export default function Card(props: CardProps) {
  const { src, alt, title, year, category, collaborator, className } = props;

  return (
    <figure className={classMerge('space-y-2 isolate', className)}>
      <figcaption className={classMerge(FIGCAPTION_STYLES, 'items-end')}>
        <p className={FIGCAPTION_P_STYLES}>{collaborator}</p>
        <p className={classMerge(FIGCAPTION_P_STYLES, 'shrink-0')}>{year}</p>
      </figcaption>
      <Image src={src} alt={alt} className={{ container: 'aspect-[171/230] w-full' }} />
      <figcaption className={classMerge(FIGCAPTION_STYLES, 'items-start bottom-0 sticky z-10')}>
        <p className={classMerge(FIGCAPTION_P_STYLES, 'font-bold')}>{title}</p>
        <p className={classMerge(FIGCAPTION_P_STYLES, 'text-right')}>{category}</p>
      </figcaption>
    </figure>
  );
}
