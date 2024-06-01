import Link from '@/components/Link';
import { useRouter } from 'next/router';
import { i18nOptions } from '@/constants/i18n';
import classMerge from '@/utils/classMerge';
import type { LanguangeProps } from '@/components/Navbar/fragments/Language/type';

export default function Language(props: LanguangeProps) {
  const { className } = props;
  const { asPath, locale } = useRouter();

  return (
    <div className={classMerge('flex gap-2', className)} id="language">
      {i18nOptions.map((lang) => (
        <Link
          key={lang}
          href={asPath}
          locale={lang}
          lang={lang}
          scroll={false}
          replace
          look="custom"
        >
          <span
            className={classMerge(
              'trim-helvetiva-neue transition-[font-weight]',
              lang === locale && 'font-bold'
            )}
          >
            {lang}
          </span>
        </Link>
      ))}
    </div>
  );
}
