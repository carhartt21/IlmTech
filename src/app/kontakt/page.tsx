import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { MapPinIcon, InfoIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Kontakt – IlmTech Smart Home Solutions',
  description: 'Kontaktieren Sie IlmTech für eine kostenlose Erstberatung zu Ihrem Smart-Home-Projekt in Ilmenau und Umgebung.',
};

export default function Kontakt() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Kontakt</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Wir freuen uns auf Ihre Nachricht. Erzählen Sie uns von Ihrem Projekt — die Erstberatung ist kostenlos.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="p-6 sm:p-8 rounded-2xl bg-surface/30 border border-white/5">
                <ContactForm />
              </div>
            </div>

            {/* Info column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-4">Direkter Kontakt</h3>
                <div className="space-y-3 text-sm text-text-muted">
                  <p>
                    <span className="text-white font-medium">IlmTech</span> – Smart Home Solutions
                  </p>
                  <p className="flex items-center gap-2"><MapPinIcon size={16} /> Ilmenau, Thüringen</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-4">Was Sie erwartet</h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                    Kostenlose Erstberatung per Telefon oder vor Ort
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                    Individuelle Analyse Ihrer Anforderungen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                    Transparentes Angebot ohne versteckte Kosten
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                    Keine Verpflichtungen
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-accent-blue/5 border border-accent-blue/20">
                <p className="flex items-center gap-2 text-sm text-accent-blue font-medium">
                  <InfoIcon size={16} className="flex-shrink-0 text-accent-blue" /> Tipp: Je mehr Sie uns über Ihr Projekt erzählen, desto besser können wir Sie beraten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
