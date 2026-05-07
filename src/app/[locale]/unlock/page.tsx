import { notFound } from 'next/navigation';
import HeroLogo from '@/components/HeroLogo';
import { locales, type Locale } from '@/i18n/config';

type SearchParams = Promise<{ next?: string; error?: string }>;

export default async function UnlockPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const query = await searchParams;
  const nextPath = query.next && query.next.startsWith(`/${locale}`) ? query.next : `/${locale}`;
  const isGerman = locale === 'de';

  const title = isGerman ? 'Interner Zugriff' : 'Internal Access';
  const subtitle = isGerman
    ? 'Dieser Bereich ist aktuell nur für interne Vorschau und ausgewählte Kontakte verfügbar.'
    : 'This area is currently available only for internal preview and selected contacts.';
  const helperText = isGerman
    ? 'Bitte geben Sie das Zugangspasswort ein, um fortzufahren.'
    : 'Please enter the access password to continue.';
  const passwordLabel = isGerman ? 'Passwort' : 'Password';
  const buttonText = isGerman ? 'Bereich entsperren' : 'Unlock area';
  const requestAccessText = isGerman ? 'Zugang anfragen' : 'Request access';
  const invalidText = isGerman ? 'Passwort ist nicht korrekt.' : 'Password is not correct.';
  const configText = isGerman
    ? 'Passwortschutz ist noch nicht vollständig konfiguriert.'
    : 'Password protection is not fully configured yet.';

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 md:w-28 md:h-28">
            <HeroLogo />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">{title}</h1>
          <p className="mt-3 text-text-muted text-center">{subtitle}</p>
          <p className="mt-2 text-sm text-text-muted text-center">{helperText}</p>

          {query.error === 'invalid' ? (
            <p className="mt-4 text-sm text-red-300 text-center">{invalidText}</p>
          ) : null}
          {query.error === 'config' ? (
            <p className="mt-4 text-sm text-red-300 text-center">{configText}</p>
          ) : null}

          <form action="/api/unlock" method="post" className="mt-6 space-y-4">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="next" value={nextPath} />
            <label className="block text-sm text-text-muted" htmlFor="password">
              {passwordLabel}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-white/10 bg-primary-dark px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent-blue/70"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-accent-blue text-primary-dark font-semibold px-4 py-3 hover:opacity-90 transition-opacity"
            >
              {buttonText}
            </button>
            <a
              href="mailto:info@ilmtech.de?subject=IlmTech%20Website%20Access%20Request"
              className="block w-full rounded-lg border border-white/15 text-center text-text-muted px-4 py-3 hover:border-white/30 hover:text-white transition-colors"
            >
              {requestAccessText}
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}