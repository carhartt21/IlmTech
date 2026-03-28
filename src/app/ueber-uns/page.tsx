import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import {
  UnlockIcon, MapPinIcon, ShieldIcon, WrenchIcon, RefreshIcon, HandshakeIcon,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Über uns – IlmTech Smart Home Solutions',
  description: 'IlmTech aus Ilmenau: Warum wir existieren, was uns antreibt und warum herstellerunabhängige Smart-Home-Lösungen die Zukunft sind.',
};

interface ValueItem { icon: ReactNode; title: string; description: string }

const values: ValueItem[] = [
  {
    icon: <UnlockIcon size={28} />,
    title: 'Offen und herstellerunabhängig',
    description: 'Wir setzen auf offene Standards und Open Source. Kein Vendor Lock-in, keine Abhängigkeit von einzelnen Herstellern. Ihr System gehört Ihnen.',
  },
  {
    icon: <MapPinIcon size={28} />,
    title: 'Lokal verankert',
    description: 'Mit Sitz in Ilmenau, Thüringen, sind wir Ihr direkter Ansprechpartner vor Ort. Persönliche Betreuung statt anonymer Hotline.',
  },
  {
    icon: <ShieldIcon size={28} />,
    title: 'Privatsphäre und Datensicherheit',
    description: 'Ihre Daten bleiben lokal — keine Cloud-Zwänge für die Kernautomatisierung. Wir gestalten Systeme, die Ihre Privatsphäre respektieren.',
  },
  {
    icon: <WrenchIcon size={28} />,
    title: 'Professionelle Qualität',
    description: 'Saubere Installation, durchdachte Planung und nachvollziehbare Dokumentation. Wir arbeiten nach professionellen Standards.',
  },
  {
    icon: <RefreshIcon size={28} />,
    title: 'Zukunftssicher und erweiterbar',
    description: 'Jedes System, das wir installieren, ist erweiterbar. Neue Geräte, neue Automatisierungen, neue Ideen — Ihr Smart Home wächst mit.',
  },
  {
    icon: <HandshakeIcon size={28} />,
    title: 'Partnerschaftlich',
    description: 'Gemeinsam mit PV-Installateuren und Sonnenschutz-Fachbetrieben bieten wir ganzheitliche Lösungen — intelligent vernetzt.',
  },
];

export default function UeberUns() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Über IlmTech</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Technik, die für Sie arbeitet — nicht umgekehrt.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="p-8 sm:p-12 rounded-2xl bg-surface/30 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">Warum IlmTech?</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Die Welt der Smart-Home-Geräte ist riesig — und oft verwirrend. Dutzende Hersteller, 
                  proprietäre Apps, Cloud-Zwänge und inkompatible Standards machen es Hausbesitzern schwer, 
                  eine sinnvolle und nachhaltige Lösung zu finden.
                </p>
                <p>
                  <span className="text-white font-semibold">IlmTech</span> existiert, um genau dieses Problem zu lösen. 
                  Wir planen, installieren und betreuen Smart-Home-Systeme auf Basis von 
                  <span className="text-accent-blue"> Home Assistant</span> — der weltweit führenden Open-Source-Plattform 
                  für Heimautomatisierung.
                </p>
                <p>
                  Unser Fokus liegt nicht auf einzelnen Gadgets, sondern auf der intelligenten Vernetzung aller Systeme: 
                  PV-Anlage, Wallbox, Speicher, Heizung, Beleuchtung, Sicherheit — alles in einem einheitlichen System, 
                  das lokal läuft und privat bleibt.
                </p>
                <p>
                  Als lokales Unternehmen aus Ilmenau kennen wir die Bedürfnisse unserer Region und sind persönlich 
                  für Sie da — von der ersten Beratung bis zur langfristigen Betreuung.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[400px] border border-white/5">
              <Image
                src="/images/planning-blueprints.jpg"
                alt="Planung eines Smart-Home-Projekts mit Bauplänen und Energielabel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Unsere Grundsätze</h2>
            <p className="mt-4 text-text-muted text-lg">Woran wir uns messen lassen.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4">{v.icon}</div>
                <h3 className="mt-3 text-base font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">So denken wir</h2>
          <div className="space-y-8">
            {[
              {
                q: 'Was macht IlmTech anders?',
                a: 'Wir sind nicht an einen Hersteller gebunden. Statt einzelne Produkte zu verkaufen, integrieren wir Ihre bestehenden und neuen Geräte in ein einheitliches, lokal gesteuertes System.',
              },
              {
                q: 'Warum Home Assistant?',
                a: 'Home Assistant ist die ausgereifteste, flexibelste und am besten unterstützte Open-Source-Plattform. Mit über 2.000 Integrationen kann nahezu jedes Gerät eingebunden werden — ohne Cloud-Zwang.',
              },
              {
                q: 'Was ist mit Datenschutz?',
                a: 'Privatsphäre ist kein Feature, sondern ein Grundprinzip. Die Kernautomatisierung läuft lokal, ohne dass Daten das Haus verlassen müssen. Cloud-Dienste sind optional und Ihre Entscheidung.',
              },
            ].map((item) => (
              <div key={item.q} className="p-6 rounded-xl bg-surface/20 border border-white/5">
                <h3 className="text-base font-semibold text-accent-blue">{item.q}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Lernen Sie uns kennen
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            In einem unverbindlichen Gespräch erfahren Sie, wie IlmTech Ihr Zuhause intelligenter machen kann.
          </p>
          <div className="mt-8">
            <CTAButton href="/kontakt">Gespräch vereinbaren</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
