import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { i18nOptions, defaulti18n } from '@/app/constants/i18n';
import { type NextRequest, NextResponse } from 'next/server';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18nOptions;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  return match(languages, locales, defaulti18n);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameIsMissingLocale = i18nOptions.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
