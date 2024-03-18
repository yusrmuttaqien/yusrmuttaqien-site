import { type NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { defaulti18n, i18nOptions } from '@/app/constants/i18n';

function getLocale(request: NextRequest): string | undefined {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const languages = new Negotiator({ headers }).languages(i18nOptions as unknown as string[]);

  return match(languages, i18nOptions, defaulti18n);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const endpoints = pathname.split('/');
  const isPathname = i18nOptions.some((locale) => locale === endpoints[1]);

  if (isPathname) return;

  const locale = getLocale(request);
  const newEndpoints = endpoints[2] ? `/${endpoints[2]}` : '';
  request.nextUrl.pathname = `/${locale}${newEndpoints}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
