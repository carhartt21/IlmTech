'use client';

import { useI18n } from './I18nProvider';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export default function LanguageToggle() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale: Locale = locale === 'de' ? 'en' : 'de';

  function switchLocale() {
    // Replace the locale prefix in the pathname
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    router.push(segments.join('/'));
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1 rounded-md border border-gray-600 px-2 py-1 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
      aria-label={dict.nav.switchLanguage}
    >
      <span className={locale === 'de' ? 'font-bold text-white' : ''}>DE</span>
      <span className="text-gray-500">|</span>
      <span className={locale === 'en' ? 'font-bold text-white' : ''}>EN</span>
    </button>
  );
}
