import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getPitchDeckById, getPitchContent } from '@/lib/pitchDecks';
import PitchDeckActions from '@/components/PitchDeckActions';

interface Params {
  locale: string;
  slug: string;
}

interface PitchSearchParams {
  client?: string;
  project?: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const deck = getPitchDeckById(locale, slug);

  if (!deck) {
    return {
      title: locale === 'en' ? 'Pitch not found | IlmTech' : 'Pitch nicht gefunden | IlmTech',
    };
  }

  return {
    title: `${deck.industry} | IlmTech`,
    description: deck.positioning,
  };
}

export default async function PitchDeckPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<PitchSearchParams>;
}) {
  const { locale, slug } = await params;
  const query = await searchParams;
  if (!locales.includes(locale as Locale)) notFound();

  const content = getPitchContent(locale);
  const deck = getPitchDeckById(locale, slug);
  if (!deck) notFound();

  const clientLabel = query.client?.trim();
  const projectLabel = query.project?.trim();
  const deckTitle = clientLabel ? `${deck.title} - ${clientLabel}` : deck.title;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 text-xs sm:text-sm text-text-muted hover:text-white hover:border-accent-blue/30 transition"
          >
            {locale === 'en' ? 'Back to home' : 'Zurueck zur Startseite'}
          </Link>
          <Link
            href={`/${locale}/kontakt`}
            className="inline-flex items-center rounded-full border border-accent-blue/40 bg-accent-blue/10 px-3 py-1.5 text-xs sm:text-sm text-accent-blue hover:bg-accent-blue/20 transition"
          >
            {locale === 'en' ? 'Request consultation' : 'Beratung anfragen'}
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-primary-dark/45 p-6 sm:p-8">
          <p className="text-xs tracking-[0.14em] uppercase text-accent-blue/70">{deck.industry}</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">{deckTitle}</h1>
          <p className="mt-4 text-base text-text-muted">{deck.positioning}</p>

          {projectLabel ? (
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-accent-blue/70">
              {locale === 'en' ? 'Project' : 'Projekt'}: {projectLabel}
            </p>
          ) : null}

          {deck.starter ? (
            <p className="mt-3 text-xs uppercase tracking-wide text-accent-blue/70">{deck.starter}</p>
          ) : null}

          <PitchDeckActions locale={locale} deckId={deck.id} industry={deck.industry} />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <PitchBlock title={locale === 'en' ? 'Challenge' : 'Ausgangslage'} items={deck.challenge} />
            <PitchBlock title={locale === 'en' ? 'Target model' : 'Zielmodell'} items={deck.targetModel} />
            <PitchBlock title={locale === 'en' ? 'Pilot path' : 'Pilotpfad'} items={deck.pilotPath} />
            <PitchBlock title={locale === 'en' ? 'Offer' : 'Angebot'} items={deck.offer} />
          </div>

          <div className="mt-4 rounded-xl border border-accent-blue/25 bg-accent-blue/8 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-accent-blue/80">
              {locale === 'en' ? 'Business impact' : 'Geschaeftlicher Effekt'}
            </p>
            <ul className="mt-2 space-y-1.5">
              {deck.businessImpact.map((item) => (
                <li key={item} className="text-sm text-text-muted flex gap-2">
                  <span className="text-accent-blue">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-surface/20 p-6">
          <h2 className="text-xl font-semibold text-white">{content.template.title}</h2>
          <p className="mt-2 text-sm text-text-muted">{content.template.subtitle}</p>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {content.template.blocks.map((block) => (
              <div key={block} className="rounded-lg border border-white/10 bg-primary-dark/40 p-3 text-sm text-text-muted">
                {block}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PitchBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-xl border border-white/10 bg-surface/20 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-accent-blue/70">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-text-muted flex gap-2">
            <span className="text-accent-blue">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
