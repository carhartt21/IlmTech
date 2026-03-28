'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircleIcon } from './Icons';

const projectTypes = [
  'Neues Smart Home',
  'PV-Integration',
  'Wallbox / EV-Laden',
  'Energiemanagement',
  'Komfort-Automatisierung',
  'Sicherheit',
  'Erweiterung bestehendes System',
  'Sonstiges',
];

const callbackTimes = [
  'Vormittags (9–12 Uhr)',
  'Nachmittags (12–17 Uhr)',
  'Abends (17–20 Uhr)',
  'Egal',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production, this would send to an API endpoint
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center"><CheckCircleIcon size={48} className="text-accent-green" /></div>
        <h3 className="mt-4 text-xl font-semibold text-white">Vielen Dank für Ihre Nachricht!</h3>
        <p className="mt-2 text-text-muted">Wir melden uns in Kürze bei Ihnen.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-accent-blue hover:underline"
        >
          Weitere Nachricht senden
        </button>
      </div>
    );
  }

  const inputBase = 'w-full px-4 py-3 rounded-lg bg-surface border border-white/10 text-white placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1.5">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputBase}
          placeholder="Ihr Name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">E-Mail *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputBase}
          placeholder="ihre@email.de"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-muted mb-1.5">Telefon <span className="text-text-muted/60">(optional)</span></label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={inputBase}
          placeholder="+49 ..."
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-text-muted mb-1.5">Projektart *</label>
        <select id="projectType" name="projectType" required className={inputBase}>
          <option value="">Bitte wählen</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1.5">Nachricht *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputBase}
          placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Frage…"
        />
      </div>

      {/* Callback Time */}
      <div>
        <label htmlFor="callbackTime" className="block text-sm font-medium text-text-muted mb-1.5">Bevorzugte Rückrufzeit</label>
        <select id="callbackTime" name="callbackTime" className={inputBase}>
          <option value="">Bitte wählen</option>
          {callbackTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg bg-accent-blue text-primary-dark font-semibold text-sm hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20"
      >
        Nachricht senden
      </button>

      <p className="text-xs text-text-muted/60 text-center">
        Mit dem Absenden erklären Sie sich mit unserer Datenschutzerklärung einverstanden.
      </p>
    </form>
  );
}
