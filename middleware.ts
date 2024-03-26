import * as locales from 'locale-codes';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import { defaulti18n, i18nOptions } from '@/app/constants/i18n';

function getLocale(request: NextRequest): string | undefined {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const languages = new Negotiator({ headers }).languages(i18nOptions as unknown as string[]);

  return match(languages, i18nOptions, defaulti18n);
}

export function middleware(request: NextRequest) {
  const {
    nextUrl: { pathname },
    headers,
  } = request;
  const referer = (headers.get('referer') || '/').split('/');
  const endpoints = pathname.split('/');
  const isValidRefLocale = locales.getByTag(referer[3]) !== undefined;
  const isValidLocale = locales.getByTag(endpoints[1]) !== undefined;
  const isAvailableRefLocale = i18nOptions.some((locale) => locale === referer[3]);
  const isAvailableLocale = i18nOptions.some((locale) => locale === endpoints[1]);

  if (isValidLocale && isAvailableLocale) return;
  if (isValidLocale && !isAvailableLocale) {
    const locale = getLocale(request);

    request.nextUrl.pathname = `/${locale}/${endpoints
      .slice(2)
      .filter((n) => n)
      .join('/')}`;
    return NextResponse.redirect(request.nextUrl);
  }
  if (isValidRefLocale && isAvailableRefLocale) {
    request.nextUrl.pathname = `/${referer[3]}/${endpoints
      .slice(1)
      .filter((n) => n)
      .join('/')}`;
    return NextResponse.redirect(request.nextUrl);
  } else {
    const locale = getLocale(request);

    request.nextUrl.pathname = `/${locale}/${endpoints
      .slice(1)
      .filter((n) => n)
      .join('/')}`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|apple-icon.png|icon.png).*)'],
};
