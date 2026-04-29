import { notFound } from 'next/navigation';
import CTAButton from '@/components/CTAButton';
import HeroCTAs from '@/components/HeroCTAs';
import HeroLogo from '@/components/HeroLogo';
// import PitchDeckSection from '@/components/PitchDeckSection';
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
      <section className="relative overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 max-w-4xl mx-auto">
            <div className="flex-shrink-0 w-24 h-24 md:w-36 md:h-36">
              <HeroLogo />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-white">{t.hero.title1}</span>
                <br />
                <span className="text-accent-blue glow-blue">{t.hero.title2}</span>
              </h1>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mt-8">
            <p className="text-lg text-text-muted">
              {t.hero.subtitle}
            </p>
            <p className="mt-4 text-sm font-semibold tracking-widest uppercase text-accent-blue">
              {t.hero.tagline}
            </p>
          </div>

          <HeroCTAs locale={locale} smartHomeLabel={t.hero.ctaSmartHome} smartHomeAudience={t.hero.ctaSmartHomeAudience} aiServicesLabel={t.hero.ctaAI} aiAudience={t.hero.ctaAIAudience} />
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
{/* 
      /* <PitchDeckSection locale={locale} />

      { Process & Trust
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
      </section> */ }

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
