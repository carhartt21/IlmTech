import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import {
  SunIcon, PlugIcon, ChartIcon, HouseIcon, LockIcon, WrenchIcon,
  UnlockIcon, LinkIcon, SmartphoneIcon, RefreshIcon, GlobeIcon,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Leistungen – IlmTech Smart Home Solutions',
  description: 'PV-Integration, Wallbox, Energiemanagement, Komfort- und Sicherheitsautomatisierung — alle Smart-Home-Leistungen von IlmTech.',
};

interface ServiceDetail {
  icon: ReactNode;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  features: string[];
}

const services: ServiceDetail[] = [
  {
    icon: <SunIcon size={28} />,
    image: '/images/smart-house-solar.jpg',
    imageAlt: 'Smartes Haus mit Solarpanels und Energiedaten-Overlay',
    title: 'PV-Integration',
    description: 'Wir binden Ihre Photovoltaikanlage nahtlos in Ihr Smart Home ein. So nutzen Sie Ihren Solarstrom optimal — für den Haushalt, die Wallbox oder den Batteriespeicher. In Zusammenarbeit mit regionalen PV-Installateuren bieten wir eine Gesamtlösung.',
    features: ['Eigenverbrauch maximieren', 'Einspeisekontrolle', 'Visualisierung im Dashboard', 'Partnerangebote für PV-Installationen'],
  },
  {
    icon: <PlugIcon size={28} />,
    image: '/images/wallbox-solar.jpg',
    imageAlt: 'EV-Wallbox-Ladestation mit Solarpanels auf dem Hausdach',
    title: 'Wallbox / EV-Ladestation',
    description: 'Laden Sie Ihr Elektrofahrzeug intelligent — abgestimmt auf PV-Ertrag, Batteriestand und Stromtarif. Die Wallbox wird vollständig in Ihr Energiemanagement integriert.',
    features: ['Überschuss-Laden mit PV', 'Zeitbasierte Ladeprofile', 'Lastmanagement', 'Kompatibel mit allen gängigen Wallboxen'],
  },
  {
    icon: <ChartIcon size={28} />,
    image: '/images/tablet-control.jpg',
    imageAlt: 'Tablet mit Smart Home Dashboard zur Energiesteuerung',
    title: 'Energiemanagement',
    description: 'Verbrauch, Erzeugung und Speicherung in einem übersichtlichen System. Wir schaffen Transparenz über Ihre Energieflüsse und optimieren automatisch den Eigenverbrauch.',
    features: ['Echtzeit-Dashboard', 'Automatische Optimierung', 'Historische Auswertungen', 'CO₂-Tracking'],
  },
  {
    icon: <HouseIcon size={28} />,
    image: '/images/smart-living-connected.jpg',
    imageAlt: 'Modernes Wohnzimmer mit vernetzten Smart-Home-Geräten',
    title: 'Komfort-Automatisierung',
    description: 'Beleuchtung, Heizung, Rollläden und mehr — alles automatisch gesteuert nach Ihrem Tagesablauf, Wetter und Anwesenheit. In Zusammenarbeit mit Partnern für elektrische Rollläden und Sonnenschutz.',
    features: ['Szenen und Zeitpläne', 'Anwesenheitserkennung', 'Sprachsteuerung möglich', 'Elektrische Rollläden über Partner'],
  },
  {
    icon: <LockIcon size={28} />,
    image: '/images/security-camera.jpg',
    imageAlt: 'Sicherheitskamera am Hauseingang mit Blick auf das Grundstück',
    title: 'Sicherheitsautomatisierung',
    description: 'Tür- und Fenstersensoren, Bewegungsmelder, Kameras und Alarme — in einem System zusammengeführt. Benachrichtigungen in Echtzeit auf Ihr Smartphone.',
    features: ['Sensoren vernetzen', 'Push-Benachrichtigungen', 'Abwesenheitsmodus', 'Kameraintegration'],
  },
  {
    icon: <WrenchIcon size={28} />,
    image: '/images/team-planning.jpg',
    imageAlt: 'Team bei der Planung eines Smart-Home-Projekts mit Bauplänen',
    title: 'Beratung, Installation & Support',
    description: 'Von der ersten Idee bis zur laufenden Betreuung begleiten wir Sie. Professionelle Installation vor Ort, individuelle Einweisung und fortlaufender Support.',
    features: ['Kostenlose Erstberatung', 'Individuelle Planung', 'Installation vor Ort', 'Updates und Erweiterungen'],
  },
];

export default function Leistungen() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Unsere Leistungen</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Smart Home, Energie und Sicherheit — alles aus einer Hand. Herstellerunabhängig und auf Ihre Bedürfnisse zugeschnitten.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  {s.icon}
                  <h2 className="text-2xl font-bold text-white">{s.title}</h2>
                </div>
                <p className="text-text-muted leading-relaxed">{s.description}</p>
                <ul className="mt-6 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative rounded-2xl overflow-hidden border border-white/5 min-h-[280px] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Warum Home Assistant?"
            subtitle="Die weltweit führende Open-Source-Plattform für Smart-Home-Automatisierung."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <UnlockIcon size={28} />, title: 'Open Source', desc: 'Kein Vendor Lock-in, vollständige Kontrolle über Ihre Daten und Ihr System.' },
              { icon: <LinkIcon size={28} />, title: '2000+ Integrationen', desc: 'Von Philips Hue bis Shelly — nahezu jedes Gerät wird unterstützt.' },
              { icon: <HouseIcon size={28} />, title: 'Lokal statt Cloud', desc: 'Kernautomatisierung läuft ohne Cloud — schnell, zuverlässig, privat.' },
              { icon: <SmartphoneIcon size={28} />, title: 'Dashboard & App', desc: 'Übersichtliche Oberfläche auf jedem Gerät — im Browser und als App.' },
              { icon: <RefreshIcon size={28} />, title: 'Regelmäßige Updates', desc: 'Aktive Community und monatliche Updates mit neuen Funktionen.' },
              { icon: <GlobeIcon size={28} />, title: 'Weltweit bewährt', desc: 'Millionen Installationen weltweit — vom Enthusiasten bis zum Profi.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4">{item.icon}</div>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Interessiert an einer Lösung für Ihr Zuhause?
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Wir beraten Sie gerne — kostenlos und unverbindlich.
          </p>
          <div className="mt-8">
            <CTAButton href="/kontakt">Jetzt Beratung anfragen</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
