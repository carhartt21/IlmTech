import { notFound } from 'next/navigation';
import CTAButton from '@/components/CTAButton';
import HeroHouse from '@/components/HeroHouse';
import ServiceCard from '@/components/ServiceCard';
import SectionHeading from '@/components/SectionHeading';
import {
  SunIcon, PlugIcon, ChartIcon, HouseIcon, LockIcon,
  MapPinIcon, WrenchIcon, ThermometerIcon, UnlockIcon, ShieldIcon,
  BrainIcon, WorkflowIcon, ServerIcon, CompassIcon,
} from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';
import type { ReactNode } from 'react';

const serviceIcons: ReactNode[] = [
  <SunIcon key="sun" size={28} />,
  <PlugIcon key="plug" size={28} />,
  <ChartIcon key="chart" size={28} />,
  <HouseIcon key="house" size={28} />,
  <LockIcon key="lock" size={28} />,
  <ThermometerIcon key="thermo" size={28} />,
];

const aiServiceIcons: ReactNode[] = [
  <BrainIcon key="brain" size={28} />,
  <WorkflowIcon key="workflow" size={28} />,
  <ServerIcon key="server" size={28} />,
  <CompassIcon key="compass" size={28} />,
];

const aiServiceLinks = ['home-ai', 'workflow', 'infrastruktur', 'consulting'];

const trustIcons: ReactNode[] = [
  <MapPinIcon key="pin" size={20} />,
  <UnlockIcon key="unlock" size={20} />,
  <ShieldIcon key="shield" size={20} />,
  <WrenchIcon key="wrench" size={20} />,
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.home;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">{t.hero.title1}</span>
              <br />
              <span className="text-accent-blue glow-blue">{t.hero.title2}</span>
            </h1>
            <p className="mt-6 text-lg text-text-muted max-w-xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <CTAButton href={`/${locale}/kontakt`}>{t.hero.cta1}</CTAButton>
              <CTAButton href={`/${locale}/smart-home`} variant="secondary">{dict.nav.smartHome}</CTAButton>
              <CTAButton href={`/${locale}/ai-services`} variant="secondary">{dict.nav.aiServices}</CTAButton>
              <CTAButton href={`/${locale}/projekte`} variant="secondary">{locale === 'de' ? 'Projekte' : 'Projects'}</CTAButton>
            </div>
          </div>

          <div className="mt-12">
            <HeroHouse />
          </div>
        </div>
      </section>

      {/* Services — Two Worlds */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-accent-blue/30 bg-accent-blue/5 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue">
                  {locale === 'de' ? 'Aktuelles Projekt' : 'Current project'}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                  {locale === 'de'
                    ? 'Digitale Betriebsplattform fuer Hausverwaltung'
                    : 'Digital operating platform for property management'}
                </h2>
                <p className="mt-3 text-text-muted">
                  {locale === 'de'
                    ? 'Integrierte Projektbeschreibung mit Fokus auf automatische Kalkulation, Verwaltung und Erstellung der Nebenkostenabrechnung.'
                    : 'Integrated project description with a focus on automated utility-cost calculation, management, and statement creation.'}
                </p>
              </div>
              <div>
                <CTAButton href={`/${locale}/projekte/hausverwaltung-betriebsplattform`}>
                  {locale === 'de' ? 'Projekt ansehen' : 'View project'}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — Two Worlds */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />

          <h3 className="text-xl font-bold text-white mb-6">{t.services.smartHomeTitle}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((s, i) => (
              <ServiceCard key={i} icon={serviceIcons[i]} title={s.title} description={s.description} href={`/${locale}/smart-home`} />
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-6 mt-16">{t.services.aiTitle}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {t.services.aiItems.map((s, i) => (
              <ServiceCard key={i} icon={aiServiceIcons[i]} title={s.title} description={s.description} href={`/${locale}/ai-services/${aiServiceLinks[i]}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Process & Trust */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.process.title} subtitle={t.process.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.process.steps.map((p, i) => (
              <div key={i} className="text-center p-5">
                <span className="text-3xl font-bold text-accent-blue/30">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.trust.map((text, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-surface/30 border border-white/5">
                <span className="flex-shrink-0">{trustIcons[i]}</span>
                <span className="text-sm text-text-muted">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.cta.title}</h2>
          <p className="mt-4 text-lg text-text-muted">{t.cta.subtitle}</p>
          <div className="mt-8">
            <CTAButton href={`/${locale}/kontakt`}>{t.cta.button}</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
