'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getPitchContent } from '@/lib/pitchDecks';

export default function PitchDeckSection({ locale }: { locale: string }) {
  const content = useMemo(() => getPitchContent(locale), [locale]);
  const [activeDeckId, setActiveDeckId] = useState(content.decks[0]?.id ?? '');

  const activeDeck = useMemo(
    () => content.decks.find((deck) => deck.id === activeDeckId) ?? content.decks[0],
    [activeDeckId, content.decks],
  );

  if (!activeDeck) return null;

  return (
    <section className="py-20 sm:py-28 bg-primary-dark/45 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-xs sm:text-sm tracking-[0.16em] uppercase text-accent-blue/80">Pitch Section</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">{content.heading}</h2>
          <p className="mt-4 text-base sm:text-lg text-text-muted">{content.intro}</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <article className="lg:col-span-4 rounded-2xl border border-accent-blue/20 bg-surface/40 p-6 glow-blue-box">
            <p className="text-xs tracking-[0.14em] uppercase text-accent-blue/70">Template</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{content.template.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{content.template.subtitle}</p>

            <ul className="mt-5 space-y-2">
              {content.template.blocks.map((block) => (
                <li key={block} className="text-sm text-text-muted flex gap-2">
                  <span className="text-accent-blue">•</span>
                  <span>{block}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-xs tracking-[0.14em] uppercase text-accent-blue/60">Sales notes</p>
              <ul className="mt-2 space-y-2">
                {content.template.notes.map((note) => (
                  <li key={note} className="text-sm text-text-muted flex gap-2">
                    <span className="text-accent-blue">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-surface/20 p-6">
            <div className="flex flex-wrap gap-2">
              {content.decks.map((deck) => {
                const isActive = activeDeck.id === deck.id;
                return (
                  <button
                    key={deck.id}
                    type="button"
                    onClick={() => setActiveDeckId(deck.id)}
                    className={`px-3 py-2 rounded-full text-xs sm:text-sm border transition ${
                      isActive
                        ? 'border-accent-blue/50 bg-accent-blue/15 text-accent-blue'
                        : 'border-white/10 bg-primary-dark/40 text-text-muted hover:border-accent-blue/30 hover:text-white'
                    }`}
                  >
                    {deck.industry}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-primary-dark/50 p-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white">{activeDeck.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{activeDeck.positioning}</p>
              {activeDeck.starter ? (
                <p className="mt-2 text-xs uppercase tracking-wide text-accent-blue/70">{activeDeck.starter}</p>
              ) : null}
              <div className="mt-3">
                <Link
                  href={`/${locale}/pitches/${activeDeck.id}`}
                  className="inline-flex items-center rounded-full border border-accent-blue/40 bg-accent-blue/10 px-3 py-1.5 text-xs sm:text-sm text-accent-blue hover:bg-accent-blue/20 transition"
                >
                  {locale === 'en' ? 'Open full deck' : 'Vollstaendiges Deck oeffnen'}
                </Link>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <PitchListCard title={locale === 'en' ? 'Challenge' : 'Ausgangslage'} items={activeDeck.challenge} />
                <PitchListCard title={locale === 'en' ? 'Target model' : 'Zielmodell'} items={activeDeck.targetModel} />
                <PitchListCard title={locale === 'en' ? 'Pilot path' : 'Pilotpfad'} items={activeDeck.pilotPath} />
                <PitchListCard title={locale === 'en' ? 'Offer' : 'Angebot'} items={activeDeck.offer} />
              </div>

              <div className="mt-4 rounded-lg border border-accent-blue/20 bg-accent-blue/8 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-accent-blue/80">
                  {locale === 'en' ? 'Business impact' : 'Geschaeftlicher Effekt'}
                </p>
                <ul className="mt-2 space-y-1">
                  {activeDeck.businessImpact.map((item) => (
                    <li key={item} className="text-sm text-text-muted flex gap-2">
                      <span className="text-accent-blue">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PitchListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-white/10 bg-surface/30 p-4">
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
