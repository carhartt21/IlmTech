import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes that must stay public.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/unlock') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }

  const configuredPassword = process.env.ILMTECH_SITE_PASSWORD;

  // Check if the pathname already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    const locale = locales.find(
      (candidate) => pathname === `/${candidate}` || pathname.startsWith(`/${candidate}/`)
    );

    if (!locale || !configuredPassword) {
      return;
    }

    const isLanding = pathname === `/${locale}`;
    const isUnlock = pathname === `/${locale}/unlock`;
    const passwordCookie = request.cookies.get('ilmtech_site_access')?.value;
    const isAuthenticated = passwordCookie === configuredPassword;

    if (!isLanding && !isUnlock && !isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/unlock`;
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

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
  matcher: ['/((?!_next|favicon\\.ico|icon\\.svg|images).*)'],
};
