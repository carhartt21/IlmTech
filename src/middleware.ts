import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (hasLocale) return;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferred = acceptLanguage.split(',').find((lang) => {
    const code = lang.split(';')[0].trim().substring(0, 2).toLowerCase();
    return locales.includes(code as typeof locales[number]);
  });
  const detectedLocale = preferred
    ? (preferred.split(';')[0].trim().substring(0, 2).toLowerCase() as typeof locales[number])
    : defaultLocale;

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|icon\\.svg|images).*)'],
};
