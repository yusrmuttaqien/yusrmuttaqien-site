'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/app/components/link';
import { i18nOptions, i18nOptionsCursorEmoji } from '@/app/constants/i18n';
import { ID_NAVBAR } from '@/app/constants/navbar';
import classMerge from '@/app/utils/class-merge';

export default function NavbarLang({ className }: { className?: string }) {
  const pathname = usePathname();
  const totalSupportedLocales = i18nOptions.length;
  const currentLocale = pathname.split('/')[1];
  const cleanPathname = pathname.replace(`/${currentLocale}`, '');

  function _retractNavbar() {
    const navbar = document.getElementById(ID_NAVBAR);
    navbar?.classList.add('animate-navbar-push-up-hide');
  }

  return (
    <div>
      {i18nOptions.map((locale, idx) => {
        const isLastLocale = idx === totalSupportedLocales - 1;
        const isActive = locale === currentLocale;
        const newLink = `/${locale}${cleanPathname}`;
        const LinkEl = (
          <div className="inline-block" data-framer="nav-langs" key={locale}>
            <Link
              href={newLink}
              locale={currentLocale}
              lang={currentLocale}
              replace
              scroll={false}
              className={classMerge(
                'uppercase',
                i18nOptionsCursorEmoji[idx],
                isActive
                  ? 'opacity-100 underline !cursor-not-allowed'
                  : 'opacity-50 hoverable:hover:opacity-80 transition-opacity',
                className
              )}
              onClick={_retractNavbar}
            >
              {locale}
            </Link>
          </div>
        );

        return isLastLocale ? (
          LinkEl
        ) : (
          <Fragment key={locale}>
            {LinkEl}
            <span
              className={classMerge('mx-[.5ch] pointer-events-none inline-block', className)}
              data-framer="nav-langs"
            >
              /
            </span>
          </Fragment>
        );
      })}
    </div>
  );
}
