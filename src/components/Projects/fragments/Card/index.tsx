import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useInteractive } from '@/components/Projects/fragments/Card/hooks/interactive';
import Link from '@/components/Link';
import Image from '@/components/Image';
import classMerge from '@/utils/classMerge';
import { defaulti18n } from '@/constants/i18n';
import type { CardProps } from '@/components/Projects/fragments/Card/type';
import type { i18nLocales } from '@/types/i18n';

const FIGCAPTION_STYLES = classMerge(
  'flex justify-between gap-8 bg-dynamic-[beige_95] backdrop-blur-md p-2'
);
const FIGCAPTION_P_STYLES = 'trim-helvetiva-neue-height whitespace-pre-wrap';

export default function Card(props: CardProps) {
  const { locale } = useRouter();
  const { scope } = useInteractive();
  const { src, alt, title, year, category, collaborator, className, href } = props;

  return (
    <figure ref={scope} className={classMerge('space-y-2 isolate', className)}>
      <figcaption id="infos-0" className={classMerge(FIGCAPTION_STYLES, 'items-end')}>
        <p className={FIGCAPTION_P_STYLES}>{collaborator}</p>
        <p className={classMerge(FIGCAPTION_P_STYLES, 'shrink-0')}>{year}</p>
      </figcaption>
      <div>
        <div className="relative mb-2">
          <Image src={src} alt={alt} className={{ container: 'aspect-[171/230] w-full' }} />
          <div
            className={classMerge(
              'absolute bottom-[0.625rem] right-[0.625rem] top-[0.625rem] grid place-content-end',
              'pointer-events-none'
            )}
          >
            <div
              id="actions-wrapper"
              className={classMerge(
                'bg-dynamic-[beige_95] p-[0.625rem] backdrop-blur-md sticky',
                'gap-[0.625rem] flex flex-col items-end pointer-events-auto',
                'bottom-[calc(var(--limit-bottom)_+_0.625rem)] clip-path-inset-bottom'
              )}
            >
              {href.map((link, index, array) => {
                const isLast = index === array.length - 1;
                const title = link[0][(locale as i18nLocales) || defaulti18n];

                return (
                  <Fragment key={title}>
                    <Link href={link[1]} isDisabled={link[1] === '#'}>
                      {title}
                    </Link>
                    {!isLast && <span className="h-px bg-dynamic-grey w-full" />}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <figcaption
          id="infos-1"
          className={classMerge(
            FIGCAPTION_STYLES,
            'items-start bottom-0 top-[var(--limit-top)] sticky z-10'
          )}
        >
          <p className={classMerge(FIGCAPTION_P_STYLES, 'font-bold')}>{title}</p>
          <p className={classMerge(FIGCAPTION_P_STYLES, 'text-right')}>{category}</p>
        </figcaption>
      </div>
    </figure>
  );
}
