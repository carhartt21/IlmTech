'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

interface Props {
  locale: string;
  deckId: string;
  industry: string;
}

export default function PitchDeckActions({ locale, deckId, industry }: Props) {
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [copied, setCopied] = useState(false);

  const duplicateHref = useMemo(() => {
    const params = new URLSearchParams();
    if (clientName.trim()) params.set('client', clientName.trim());
    if (projectName.trim()) params.set('project', projectName.trim());
    const query = params.toString();
    return query ? `/${locale}/pitches/${deckId}?${query}` : `/${locale}/pitches/${deckId}`;
  }, [clientName, projectName, locale, deckId]);

  const projectHref = useMemo(() => {
    const params = new URLSearchParams();
    const projectType = locale === 'en' ? 'Other' : 'Sonstiges';
    const projectLabel = projectName.trim() || `${industry} Pilot`;
    params.set('projectType', projectType);
    params.set(
      'message',
      locale === 'en'
        ? `Project: ${projectLabel}\nPitch deck: ${industry} (${deckId})\nClient: ${clientName.trim() || 'TBD'}\nGoal: Please scope and estimate implementation.`
        : `Projekt: ${projectLabel}\nPitch-Deck: ${industry} (${deckId})\nKunde: ${clientName.trim() || 'offen'}\nZiel: Bitte Umfang und Aufwand einschaetzen.`,
    );
    return `/${locale}/kontakt?${params.toString()}`;
  }, [clientName, projectName, locale, deckId, industry]);

  async function handleCopyShareLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + duplicateHref);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-surface/20 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-accent-blue/70">
        {locale === 'en' ? 'Duplicate and customize' : 'Duplizieren und anpassen'}
      </p>

      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        <label className="text-sm text-text-muted">
          {locale === 'en' ? 'Client name' : 'Kundenname'}
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder={locale === 'en' ? 'e.g. Muster GmbH' : 'z.B. Muster GmbH'}
            className="mt-1 w-full rounded-lg border border-white/10 bg-primary-dark/60 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue/40"
          />
        </label>

        <label className="text-sm text-text-muted">
          {locale === 'en' ? 'Project label' : 'Projektbezeichnung'}
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder={locale === 'en' ? 'e.g. Q3 pilot rollout' : 'z.B. Pilot Q3 Rollout'}
            className="mt-1 w-full rounded-lg border border-white/10 bg-primary-dark/60 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue/40"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={duplicateHref}
          className="inline-flex items-center rounded-full border border-accent-blue/40 bg-accent-blue/10 px-3 py-1.5 text-xs sm:text-sm text-accent-blue hover:bg-accent-blue/20 transition"
        >
          {locale === 'en' ? 'Open customized duplicate' : 'Angepasste Kopie oeffnen'}
        </Link>
        <Link
          href={projectHref}
          className="inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 text-xs sm:text-sm text-text-muted hover:text-white hover:border-accent-blue/30 transition"
        >
          {locale === 'en' ? 'Link to project inquiry' : 'Mit Projektanfrage verknuepfen'}
        </Link>
        <button
          type="button"
          onClick={handleCopyShareLink}
          className="inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 text-xs sm:text-sm text-text-muted hover:text-white hover:border-accent-blue/30 transition"
        >
          {copied
            ? locale === 'en'
              ? 'Link copied'
              : 'Link kopiert'
            : locale === 'en'
              ? 'Copy share link'
              : 'Share-Link kopieren'}
        </button>
      </div>
    </div>
  );
}
