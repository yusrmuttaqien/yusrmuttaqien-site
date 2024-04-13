import Link from 'next/link';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { i18nOptions, i18nOptionsCursorEmoji } from '@/constants/i18n';
import classMerge from '@/utils/class-merge';
import type { LangProps } from '@/types/navbar';

export default function NavbarLang({ className }: { className?: string }) {
  return (
    <div>
      {i18nOptions.map((locale, idx) => (
        <Lang key={locale} idx={idx} locale={locale} className={className} />
      ))}
    </div>
  );
}

function Lang({ locale, className, idx }: LangProps) {
  const { asPath, locale: currentLocale } = useRouter();
  const totalSupportedLocales = i18nOptions.length;
  const isLastLocale = idx === totalSupportedLocales - 1;
  const isActive = locale === currentLocale;

  return (
    <Fragment key={locale}>
      <div className="inline-block" data-framer="language">
        <div
          className={classMerge(
            'transition-opacity',
            isActive ? 'opacity-100' : 'opacity-50 hoverable:hover:opacity-80'
          )}
        >
          <Link
            href={asPath}
            locale={locale}
            lang={locale}
            replace
            scroll={false}
            className={classMerge(
              'uppercase',
              i18nOptionsCursorEmoji[idx],
              isActive ? 'underline !cursor-not-allowed' : '',
              className
            )}
          >
            {locale}
          </Link>
        </div>
      </div>
      {!isLastLocale && (
        <span
          className={classMerge('mx-[.5ch] pointer-events-none inline-block', className)}
          data-framer="language"
        >
          /
        </span>
      )}
    </Fragment>
  );
}
