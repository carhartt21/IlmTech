'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircleIcon } from './Icons';
import { useI18n } from './I18nProvider';

interface ContactFormInitialValues {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  callbackTime?: string;
}

export default function ContactForm({ initialValues }: { initialValues?: ContactFormInitialValues }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { dict } = useI18n();
  const t = dict.contactForm;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed');
      }

      setSubmitted(true);
    } catch {
      setError(t.errorMessage ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center"><CheckCircleIcon size={48} className="text-accent-green" /></div>
        <h3 className="mt-4 text-xl font-semibold text-white">{t.successTitle}</h3>
        <p className="mt-2 text-text-muted">{t.successMessage}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-accent-blue hover:underline"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const inputBase = 'w-full px-4 py-3 rounded-lg bg-surface border border-white/10 text-white placeholder-text-muted text-sm focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-1.5">{t.nameLabel}</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initialValues?.name ?? ''}
          className={inputBase}
          placeholder={t.namePlaceholder}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1.5">{t.emailLabel}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={initialValues?.email ?? ''}
          className={inputBase}
          placeholder={t.emailPlaceholder}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-muted mb-1.5">{t.phoneLabel} <span className="text-text-muted/60">{t.phoneOptional}</span></label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initialValues?.phone ?? ''}
          className={inputBase}
          placeholder={t.phonePlaceholder}
        />
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-text-muted mb-1.5">{t.projectTypeLabel}</label>
        <select id="projectType" name="projectType" required className={inputBase} defaultValue={initialValues?.projectType ?? ''}>
          <option value="">{t.projectTypePlaceholder}</option>
          {t.projectTypes.map((pt) => (
            <option key={pt} value={pt}>{pt}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1.5">{t.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={initialValues?.message ?? ''}
          className={inputBase}
          placeholder={t.messagePlaceholder}
        />
      </div>

      {/* Callback Time */}
      <div>
        <label htmlFor="callbackTime" className="block text-sm font-medium text-text-muted mb-1.5">{t.callbackTimeLabel}</label>
        <select id="callbackTime" name="callbackTime" className={inputBase} defaultValue={initialValues?.callbackTime ?? ''}>
          <option value="">{t.callbackTimePlaceholder}</option>
          {t.callbackTimes.map((ct) => (
            <option key={ct} value={ct}>{ct}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 rounded-lg bg-accent-blue text-primary-dark font-semibold text-sm hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (t.sending ?? 'Wird gesendet…') : t.submit}
      </button>

      <p className="text-xs text-text-muted/60 text-center">
        {t.privacyNote}
      </p>
    </form>
  );
}
