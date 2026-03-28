import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import HeroHouse from '@/components/HeroHouse';
import EnergyDashboard from '@/components/EnergyDashboard';
import ServiceCard from '@/components/ServiceCard';
import SectionHeading from '@/components/SectionHeading';
import {
  BoltIcon, HouseIcon, ShieldIcon, LinkIcon, UnlockIcon,
  SunIcon, PlugIcon, ChartIcon, LockIcon,
  MapPinIcon, WrenchIcon, CameraIcon, CpuIcon, LayoutIcon,
  DropletIcon, ThermometerIcon,
} from '@/components/Icons';
import { type ReactNode } from 'react';

interface BenefitItem { icon: ReactNode; title: string; description: string }
interface ServiceItem { icon: ReactNode; title: string; description: string; href: string }

const benefits: BenefitItem[] = [
  { icon: <BoltIcon size={28} />, title: 'Energie effizient nutzen', description: 'PV, Wallbox und Speicher intelligent kombinieren und den Eigenverbrauch maximieren.' },
  { icon: <HouseIcon size={28} />, title: 'Komfort automatisieren', description: 'Licht, Heizung und Beschattung automatisch an Ihren Alltag anpassen.' },
  { icon: <ShieldIcon size={28} />, title: 'Sicherheit erhöhen', description: 'Fenster-, Tür- und Bewegungssensoren vernetzen — Benachrichtigungen in Echtzeit.' },
  { icon: <LinkIcon size={28} />, title: 'Bestehende Geräte integrieren', description: 'Vorhandene Smart-Home-Geräte einbinden — herstellerunabhängig und ohne Neukauf.' },
  { icon: <UnlockIcon size={28} />, title: 'Zukunftssicher und offen', description: 'Open Source, lokale Steuerung, keine Cloud-Abhängigkeit — Ihre Daten bleiben bei Ihnen.' },
];

const services: ServiceItem[] = [
  { icon: <SunIcon size={28} />, title: 'PV-Integration', description: 'Solaranlagen ins Smart Home einbinden und Eigenverbrauch maximieren.', href: '/leistungen' },
  { icon: <PlugIcon size={28} />, title: 'Wallbox-Integration', description: 'Elektrofahrzeug intelligent laden — abgestimmt auf PV-Ertrag und Stromtarif.', href: '/leistungen' },
  { icon: <ChartIcon size={28} />, title: 'Energiemanagement', description: 'Verbrauch, Erzeugung und Speicher in einem System sichtbar und steuerbar machen.', href: '/leistungen' },
  { icon: <HouseIcon size={28} />, title: 'Komfort-Automatisierung', description: 'Beleuchtung, Heizung, Rollläden und Szenen nach Ihren Wünschen automatisieren.', href: '/leistungen' },
  { icon: <LockIcon size={28} />, title: 'Sicherheitssysteme', description: 'Sensoren, Kameras und Alarme in ein einheitliches System integrieren.', href: '/leistungen' },
  { icon: <ThermometerIcon size={28} />, title: 'Heizung & Klima', description: 'Heizungsautomation und Klimageräte-Integration für optimalen Komfort und Effizienz.', href: '/leistungen' },
  { icon: <CameraIcon size={28} />, title: 'Videoüberwachung', description: 'IP-Kameras und Überwachungssysteme professionell in Home Assistant integrieren.', href: '/leistungen' },
  { icon: <LayoutIcon size={28} />, title: 'Dashboard-Entwicklung', description: 'Individuelle Dashboards mit Lovelace Cards, responsive Layouts und Themes.', href: '/leistungen' },
  { icon: <CpuIcon size={28} />, title: 'ESPHome & DIY-Sensorik', description: 'Eigene Firmware, MQTT-Anbindung und individuelle Sensorlösungen mit ESPHome.', href: '/leistungen' },
  { icon: <DropletIcon size={28} />, title: 'Sensoren & Monitoring', description: 'Zisterne, Wasser-/Gaszähler, Smart Gardening und Umweltsensorik einbinden.', href: '/leistungen' },
];

const processSteps = [
  { step: '01', title: 'Beratung', description: 'Kostenlose Erstberatung — wir verstehen Ihre Anforderungen und Wünsche.' },
  { step: '02', title: 'Planung', description: 'Individuelles Konzept mit Geräteauswahl, Automatisierungslogik und Zeitplan.' },
  { step: '03', title: 'Installation', description: 'Professionelle Einrichtung und Integration aller Komponenten vor Ort.' },
  { step: '04', title: 'Einweisung', description: 'Umfassende Einführung in Ihr neues System — verständlich und praxisnah.' },
  { step: '05', title: 'Support', description: 'Laufende Betreuung, Updates und Erweiterungen — wir bleiben an Ihrer Seite.' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-white">Intelligentes Zuhause</span>
                <br />
                <span className="text-accent-blue glow-blue">für Alle.</span>
              </h1>
              <p className="mt-6 text-lg text-text-muted max-w-xl mx-auto lg:mx-0">
                PV, Wallbox und Smart Home — perfekt integriert. Herstellerunabhängig, auf Basis von Home Assistant. 
                Lokale Steuerung, bestehende Geräte einbinden, Energie intelligent nutzen.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <CTAButton href="/kontakt">Kostenloses Erstgespräch</CTAButton>
                <CTAButton href="/leistungen" variant="secondary">Leistungen ansehen</CTAButton>
              </div>
            </div>
            <div>
              <HeroHouse />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Warum Smart Home mit IlmTech?"
            subtitle="Offene Technik, lokale Steuerung, volle Integration — so wird Ihr Zuhause intelligent."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4">{b.icon}</div>
                <h3 className="mt-3 text-base font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-16 sm:py-20 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: '/images/smart-living-connected.jpg', alt: 'Vernetztes Wohnzimmer mit Smart-Home-Steuerung', label: 'Komfort' },
              { src: '/images/wallbox-solar.jpg', alt: 'Wallbox mit Solarenergie', label: 'Energie' },
              { src: '/images/home-security.jpg', alt: 'Haus mit smartem Sicherheitssystem', label: 'Sicherheit' },
            ].map((img) => (
              <div key={img.label} className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">{img.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Unsere Leistungen"
            subtitle="Von der Beratung bis zur Installation und darüber hinaus."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologien & Standards */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Unterstützte Technologien & Standards"
            subtitle="Herstellerunabhängig — wir arbeiten mit allen gängigen Smart-Home-Systemen und offenen Standards."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {([
              { heading: 'Smart-Home-Protokolle', tags: ['Zigbee', 'Z-Wave', 'Matter', 'Thread', 'Bluetooth', 'WiFi', 'KNX', 'Modbus', '1-Wire'] },
              { heading: 'Plattformen & Systeme', tags: ['Home Assistant', 'Raspberry Pi', 'Docker', 'Linux', 'MQTT', 'Node-RED', 'ESPHome', 'Tasmota'] },
              { heading: 'Home Assistant Entwicklung', tags: ['Lovelace', 'HACS', 'Custom Cards', 'Blueprints', 'Templates', 'Jinja2', 'REST API', 'WebSocket'] },
              { heading: 'Energie & Laden', tags: ['OCPP', 'evcc', 'SMA', 'Fronius', 'Victron', 'BMS', 'Shelly', 'SmartMeter'] },
              { heading: 'Hersteller & Geräte', tags: ['Tuya', 'Philips Hue', 'Shelly', 'Sonoff', 'Aqara', 'IKEA', 'Xiaomi', 'TP-Link', 'Ubiquiti'] },
              { heading: 'Entwicklung & Tools', tags: ['Python', 'JavaScript', 'YAML', 'Git', 'Grafana', 'InfluxDB'] },
            ] as { heading: string; tags: string[] }[]).map((cat) => (
              <div key={cat.heading}>
                <h3 className="text-sm font-semibold text-white mb-3">{cat.heading}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Management Section */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Energie intelligent steuern"
            subtitle="Sehen Sie in Echtzeit, wie PV-Ertrag, Speicher, Wallbox und Haushalt zusammenspielen."
          />
          <EnergyDashboard />
        </div>
      </section>

      {/* Trust / Process Section */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="So arbeiten wir"
            subtitle="Transparent, professionell und immer an Ihrer Seite."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="text-center p-5">
                <span className="text-3xl font-bold text-accent-blue/30">{p.step}</span>
                <h3 className="mt-2 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <MapPinIcon size={20} />, text: 'Lokaler Service aus Ilmenau' },
              { icon: <UnlockIcon size={20} />, text: 'Open Source, kein Vendor Lock-in' },
              { icon: <ShieldIcon size={20} />, text: 'Privatsphäre und lokale Kontrolle' },
              { icon: <WrenchIcon size={20} />, text: 'Professionelle Installation' },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-3 p-4 rounded-lg bg-surface/30 border border-white/5">
                <span className="flex-shrink-0">{t.icon}</span>
                <span className="text-sm text-text-muted">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Bereit für Ihr intelligentes Zuhause?
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Lassen Sie sich unverbindlich beraten — wir zeigen Ihnen, was in Ihrem Zuhause möglich ist.
          </p>
          <div className="mt-8">
            <CTAButton href="/kontakt">Kostenloses Erstgespräch vereinbaren</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
