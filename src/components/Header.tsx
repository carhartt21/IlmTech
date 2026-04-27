'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import { useI18n } from './I18nProvider';

/** Sticky sub-navigation for AI Services section */
export function SubNav() {
  const { locale, dict } = useI18n();
  const t = dict.nav;
  const pathname = usePathname();

  const aiLinks = [
    { href: `/${locale}/ai-services`, label: t.aiServicesHub },
    { href: `/${locale}/ai-services/home-ai`, label: t.aiHomeAgent },
    { href: `/${locale}/ai-services/workflow`, label: t.aiWorkflow },
    { href: `/${locale}/ai-services/infrastruktur`, label: t.aiInfrastruktur },
    { href: `/${locale}/ai-services/consulting`, label: t.aiConsulting },
  ];

  const isAiPage = pathname.startsWith(`/${locale}/ai-services`);
  if (!isAiPage) return null;

  return (
    <div className="sticky top-16 z-40 border-b border-white/5 bg-primary-dark/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-6 h-10 overflow-x-auto">
          {aiLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs whitespace-nowrap transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-accent-blue font-medium'
                  : 'text-text-muted hover:text-accent-blue'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, dict } = useI18n();
  const t = dict.nav;
  const pathname = usePathname();

  const isAiPage = pathname.startsWith(`/${locale}/ai-services`);

  const aiLinks = [
    { href: `/${locale}/ai-services`, label: t.aiServicesHub },
    { href: `/${locale}/ai-services/home-ai`, label: t.aiHomeAgent },
    { href: `/${locale}/ai-services/workflow`, label: t.aiWorkflow },
    { href: `/${locale}/ai-services/infrastruktur`, label: t.aiInfrastruktur },
    { href: `/${locale}/ai-services/consulting`, label: t.aiConsulting },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-dark/80 backdrop-blur-md border-b border-white/5">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent-blue focus:text-white focus:px-4 focus:py-2 focus:rounded">
        {locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className="text-sm text-text-muted hover:text-accent-blue transition-colors duration-200"
            >
              {t.home}
            </Link>
            <Link
              href={`/${locale}/smart-home`}
              className={`text-sm transition-colors duration-200 ${
                pathname.startsWith(`/${locale}/smart-home`) ? 'text-accent-blue' : 'text-text-muted hover:text-accent-blue'
              }`}
            >
              {t.smartHome}
            </Link>
            <Link
              href={`/${locale}/ai-services`}
              className={`text-sm transition-colors duration-200 ${
                isAiPage ? 'text-accent-blue' : 'text-text-muted hover:text-accent-blue'
              }`}
            >
              {t.aiServices}
            </Link>
            <Link
              href={`/${locale}/pitches`}
              className={`text-sm transition-colors duration-200 ${
                pathname.startsWith(`/${locale}/pitches`) ? 'text-accent-blue' : 'text-text-muted hover:text-accent-blue'
              }`}
            >
              {t.pitches}
            </Link>
            <Link
              href={`/${locale}/ueber-uns`}
              className="text-sm text-text-muted hover:text-accent-blue transition-colors duration-200"
            >
              {t.about}
            </Link>
            <Link
              href={`/${locale}/kontakt`}
              className="text-sm text-text-muted hover:text-accent-blue transition-colors duration-200"
            >
              {t.contact}
            </Link>
            <LanguageToggle />
            <Link
              href={`/${locale}/kontakt`}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/30 text-sm font-medium hover:bg-accent-blue/20 transition-all duration-200"
            >
              {t.cta}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-text-muted hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t.menuLabel}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            <Link href={`/${locale}`} className="block px-3 py-2 text-text-muted hover:text-accent-blue transition-colors" onClick={() => setMobileOpen(false)}>
              {t.home}
            </Link>
            <Link href={`/${locale}/smart-home`} className="block px-3 py-2 text-text-muted hover:text-accent-blue transition-colors" onClick={() => setMobileOpen(false)}>
              {t.smartHome}
            </Link>
            <Link href={`/${locale}/ai-services`} className="block px-3 py-2 text-text-muted hover:text-accent-blue transition-colors" onClick={() => setMobileOpen(false)}>
              {t.aiServices}
            </Link>
            <Link
              href={`/${locale}/pitches`}
              className="block px-3 py-2 text-text-muted hover:text-accent-blue transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t.pitches}
            </Link>
            {isAiPage && aiLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block pl-6 pr-3 py-2 text-text-muted hover:text-accent-blue transition-colors" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href={`/${locale}/ueber-uns`} className="block px-3 py-2 text-text-muted hover:text-accent-blue transition-colors" onClick={() => setMobileOpen(false)}>
              {t.about}
            </Link>
            <Link href={`/${locale}/kontakt`} className="block px-3 py-2 text-text-muted hover:text-accent-blue transition-colors" onClick={() => setMobileOpen(false)}>
              {t.contact}
            </Link>
            <div className="px-3 py-2">
              <LanguageToggle />
            </div>
            <Link
              href={`/${locale}/kontakt`}
              className="block mx-3 text-center px-4 py-2 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/30 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {t.cta}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
