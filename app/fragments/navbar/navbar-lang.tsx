'use client';

import { Fragment, type MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from '@/app/components/link';
import { i18nOptions, i18nOptionsCursorEmoji } from '@/app/constants/i18n';
import classMerge from '@/app/utils/class-merge';

export default function NavbarLang({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const totalSupportedLocales = i18nOptions.length;
  const currentLocale = pathname.split('/')[1];
  const cleanPathname = pathname.replace(`/${currentLocale}`, '');

  function _politeSwitch(link: string) {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      router.replace(link, { scroll: false });
    };
  }

  return (
    <div>
      {i18nOptions.map((locale, idx) => {
        const isLastLocale = idx === totalSupportedLocales - 1;
        const isActive = locale === currentLocale;
        const newLink = `/${locale}${cleanPathname}`;
        const LinkEl = (
          <Link
            href={newLink}
            locale={currentLocale}
            lang={currentLocale}
            key={locale}
            className={classMerge(
              'uppercase',
              i18nOptionsCursorEmoji[idx],
              isActive
                ? 'opacity-100 underline !cursor-not-allowed'
                : 'opacity-50 hoverable:hover:opacity-80 transition-opacity',
              className
            )}
            onClick={_politeSwitch(newLink)}
          >
            {locale}
          </Link>
        );

        return isLastLocale ? (
          LinkEl
        ) : (
          <Fragment key={locale}>
            {LinkEl}
            <span className={classMerge('mx-[.5ch] pointer-events-none', className)}>/</span>
          </Fragment>
        );
      })}
    </div>
  );
}
