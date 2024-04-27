import Link from 'next/link';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { i18nOptions, i18nOptionsCursorEmoji } from '@/constants/i18n';
import classMerge from '@/utils/class-merge';
import type { LangSwitchProps, LangProps } from '@/types/navbar';

export default function NavbarLang(props: LangProps) {
  const { className } = props;

  return (
    <div>
      {i18nOptions.map((locale, idx) => (
        <Switch key={locale} idx={idx} locale={locale} className={className} />
      ))}
    </div>
  );
}

function Switch(props: LangSwitchProps) {
  const { locale, className, idx } = props;
  const { asPath, locale: currentLocale } = useRouter();
  const { setState } = useAnimationSequenceCtx();
  const totalSupportedLocales = i18nOptions.length;
  const isLastLocale = idx === totalSupportedLocales - 1;
  const isActive = locale === currentLocale;

  useIsomorphicLayoutEffect(() => {
    setState((draft) => {
      draft.announcer.announcing = false;
    });
  }, [currentLocale]);

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
