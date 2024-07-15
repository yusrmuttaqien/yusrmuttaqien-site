import { useInteractive } from '@/components/DisplayCard/hooks/interactive';
import Image from '@/components/Image';
import classMerge from '@/utils/classMerge';
import { DisplayCardProps } from '@/components/DisplayCard/type';
import Hrefs from '@/components/DisplayCard/fragments/Hrefs';

const FIGCAPTION_STYLES = classMerge(
  'flex justify-between gap-8 bg-dynamic-[beige_95] backdrop-blur-md p-2'
);
const FIGCAPTION_P_STYLES = 'trim-helvetiva-neue-height whitespace-pre-wrap';

export default function DisplayCard(props: DisplayCardProps) {
  const { className, image = {}, id = '', project, content } = props;
  const { placeholder, ...restImage } = image;

  const { scope } = useInteractive();
  const { src, alt, bottomLeft, topRight, bottomRight, topLeft, hrefs } = {
    src: project?.src || content?.src || 'https://source.unsplash.com/random',
    alt: project?.alt || content?.alt || 'unsplash',
    bottomRight: project?.category?.[0] || content?.bottomRight?.[0] || 'bottomLeft',
    topRight: project?.year || content?.topRight || 'topRight',
    bottomLeft: project?.title || content?.bottomLeft || 'bottomRight',
    topLeft: project?.collaborator?.[0] || content?.topLeft?.[0] || 'topLeft',
    hrefs: project?.hrefs || content?.hrefs || [],
  };

  return (
    <figure ref={scope} className={classMerge('space-y-2 isolate', className)} id={id}>
      <figcaption id="infos-0" className={classMerge(FIGCAPTION_STYLES, 'items-end')}>
        <p className={FIGCAPTION_P_STYLES}>{topLeft}</p>
        <p className={classMerge(FIGCAPTION_P_STYLES, 'shrink-0')}>{topRight}</p>
      </figcaption>
      <div>
        <div className="relative mb-2">
          <Image
            {...restImage}
            src={src}
            alt={alt}
            className={{ container: 'aspect-[171/230] w-full' }}
            placeholder={!src.toString().includes('https') && placeholder ? placeholder : 'empty'}
          />
          <Hrefs hrefs={hrefs} />
        </div>
        <figcaption
          id="infos-1"
          className={classMerge(
            FIGCAPTION_STYLES,
            'items-start bottom-0 top-[var(--limit-top)] sticky z-10'
          )}
        >
          <p className={classMerge(FIGCAPTION_P_STYLES, 'font-bold')}>{bottomLeft}</p>
          <p className={classMerge(FIGCAPTION_P_STYLES, 'text-right')}>{bottomRight}</p>
        </figcaption>
      </div>
    </figure>
  );
}
