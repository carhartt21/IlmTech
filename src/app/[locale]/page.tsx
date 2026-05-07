import { notFound } from 'next/navigation';
import HeroHouse from '@/components/HeroHouse';
import HeroLogo from '@/components/HeroLogo';
import { locales, getDictionary, type Locale } from '@/i18n/config';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.home;
  const isGerman = locale === 'de';

  const statusTitle = isGerman ? 'IlmTech befindet sich aktuell in Gründung' : 'IlmTech is currently in formation';
  const statusBody = isGerman
    ? 'Wir bereiten derzeit unsere Angebote und internen Prozesse vor. Die aktive Projektarbeit startet planmäßig in Q4 2026.'
    : 'We are currently preparing our services and internal processes. Active project delivery is planned to start in Q4 2026.';
  const contactHint = isGerman
    ? 'Bei Interesse an einer frühen Abstimmung schreiben Sie uns gerne an info@ilmtech.de.'
    : 'If you would like an early discussion, feel free to reach out at info@ilmtech.de.';
  const unlockTitle = isGerman ? 'Interner Zugriff' : 'Internal access';
  const unlockSubtitle = isGerman
    ? 'Mit Passwort erhalten autorisierte Personen Zugriff auf die vollständige Website.'
    : 'Authorized users can access the full website using the password.';
  const passwordLabel = isGerman ? 'Passwort' : 'Password';
  const unlockButton = isGerman ? 'Website entsperren' : 'Unlock website';

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 max-w-4xl mx-auto">
          <div className="flex-shrink-0 w-24 h-24 md:w-36 md:h-36">
            <HeroLogo />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">{t.hero.title1}</span>
              <br />
              <span className="text-accent-blue glow-blue">{t.hero.title2}</span>
            </h1>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mt-8">
          <p className="text-lg text-text-muted">{t.hero.subtitle}</p>
          <p className="mt-4 text-sm font-semibold tracking-widest uppercase text-accent-blue">{t.hero.tagline}</p>
        </div>

        <div className="mt-12 sm:mt-16">
          <HeroHouse />
        </div>

        <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">{statusTitle}</h2>
          <p className="mt-3 text-text-muted">{statusBody}</p>
          <p className="mt-4 text-sm text-text-muted">
            {contactHint}
          </p>
        </div>

        <div className="mt-8 max-w-xl mx-auto rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-white text-center">{unlockTitle}</h3>
          <p className="mt-3 text-text-muted text-center">{unlockSubtitle}</p>

          <form action="/api/unlock" method="post" className="mt-6 space-y-4">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="next" value={`/${locale}/leistungen`} />
            <label className="block text-sm text-text-muted" htmlFor="landing-password">
              {passwordLabel}
            </label>
            <input
              id="landing-password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-white/10 bg-primary-dark px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent-blue/70"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-accent-blue text-primary-dark font-semibold px-4 py-3 hover:opacity-90 transition-opacity"
            >
              {unlockButton}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
