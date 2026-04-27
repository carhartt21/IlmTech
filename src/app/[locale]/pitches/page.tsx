import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/config';
import { getPitchContent } from '@/lib/pitchDecks';

interface Params {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Pitch Decks | IlmTech' : 'Pitch-Decks | IlmTech',
    description:
      locale === 'en'
        ? 'Industry-specific one-page pitch decks for potential IlmTech clients.'
        : 'Branchenspezifische One-Page Pitch-Decks fuer potenzielle IlmTech-Kunden.',
  };
}

export default async function PitchesOverviewPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const content = getPitchContent(locale);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.16em] uppercase text-accent-blue/80">Pitch Deck Hub</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">{content.heading}</h1>
          <p className="mt-4 text-base sm:text-lg text-text-muted">{content.intro}</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.decks.map((deck) => (
            <article key={deck.id} className="rounded-xl border border-white/10 bg-surface/20 p-5 hover:border-accent-blue/30 transition">
              <p className="text-xs uppercase tracking-[0.12em] text-accent-blue/70">{deck.industry}</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{deck.title}</h2>
              <p className="mt-2 text-sm text-text-muted line-clamp-4">{deck.positioning}</p>
              <div className="mt-4">
                <Link
                  href={`/${locale}/pitches/${deck.id}`}
                  className="inline-flex items-center rounded-full border border-accent-blue/40 bg-accent-blue/10 px-3 py-1.5 text-xs sm:text-sm text-accent-blue hover:bg-accent-blue/20 transition"
                >
                  {locale === 'en' ? 'Open deck' : 'Deck oeffnen'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
