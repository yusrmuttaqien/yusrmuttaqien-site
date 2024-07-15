import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from '@/components/Link';
import classMerge from '@/utils/classMerge';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';
import type { HrefsProps } from '@/components/DisplayCard/fragments/Hrefs/type';

export default function Hrefs(props: HrefsProps) {
  const { hrefs } = props;
  const { locale } = useRouter();

  if (!hrefs.length) return null;

  return (
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
        {hrefs.map((link, index, array) => {
          if (!link[0] || !link[1]) return null;

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
  );
}
