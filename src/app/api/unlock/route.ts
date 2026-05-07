import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const ACCESS_COOKIE_NAME = 'ilmtech_site_access';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get('password') ?? '');
  const localeValue = String(formData.get('locale') ?? defaultLocale);
  const nextParam = String(formData.get('next') ?? `/${localeValue}`);

  const locale = locales.includes(localeValue as (typeof locales)[number])
    ? localeValue
    : defaultLocale;

  const configuredPassword = process.env.ILMTECH_SITE_PASSWORD;
  if (!configuredPassword) {
    const url = new URL(`/${locale}/unlock`, request.url);
    url.searchParams.set('error', 'config');
    return NextResponse.redirect(url);
  }

  if (password !== configuredPassword) {
    const url = new URL(`/${locale}/unlock`, request.url);
    url.searchParams.set('error', 'invalid');
    url.searchParams.set('next', nextParam);
    return NextResponse.redirect(url);
  }

  const isSafeNext = nextParam.startsWith(`/${locale}`) ? nextParam : `/${locale}`;
  const response = NextResponse.redirect(new URL(isSafeNext, request.url));
  response.cookies.set(ACCESS_COOKIE_NAME, configuredPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}