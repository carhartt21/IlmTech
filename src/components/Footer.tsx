'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useI18n } from './I18nProvider';

export default function Footer() {
  const { locale, dict } = useI18n();
  const t = dict.footer;
  const nav = dict.nav;

  return (
    <footer className="bg-primary-dark border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-text-muted max-w-xs">{t.description}</p>
          </div>

          {/* Smart Home Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.smartHome}</h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/smart-home`, label: nav.smartHomeHub },
                { href: `/${locale}/smart-home/leistungen`, label: nav.smartHomeServices },
                { href: `/${locale}/smart-home/technologien`, label: nav.smartHomeTech },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-accent-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.aiServices}</h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/ai-services`, label: nav.aiServicesHub },
                { href: `/${locale}/ai-services/home-ai`, label: nav.aiHomeAgent },
                { href: `/${locale}/ai-services/workflow`, label: nav.aiWorkflow },
                { href: `/${locale}/ai-services/infrastruktur`, label: nav.aiInfrastruktur },
                { href: `/${locale}/ai-services/consulting`, label: nav.aiConsulting },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-accent-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t.contact}</h4>
            <div className="space-y-2 text-sm text-text-muted">
              <p>{t.brand}</p>
              <p>{t.location}</p>
              <Link href={`/${locale}/kontakt`} className="inline-block mt-3 text-accent-blue hover:underline">
                {t.contactForm}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {t.copyright}
          </p>
          <div className="flex gap-4 text-xs text-text-muted">
            <Link href={`/${locale}/impressum`} className="hover:text-accent-blue transition-colors">{t.imprint}</Link>
            <Link href={`/${locale}/datenschutz`} className="hover:text-accent-blue transition-colors">{t.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
