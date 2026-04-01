import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import {
  BrainIcon, WorkflowIcon, ServerIcon, CompassIcon,
  MapPinIcon, WrenchIcon, ShieldIcon, BoltIcon, UnlockIcon, HouseIcon,
} from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';
import type { ReactNode } from 'react';
import AIVisualization from '@/components/AIVisualization';

const pillarIcons: ReactNode[] = [
  <BrainIcon key="brain" size={32} />,
  <WorkflowIcon key="workflow" size={32} />,
  <ServerIcon key="server" size={32} />,
  <CompassIcon key="compass" size={32} />,
];

const pillarLinks = ['home-ai', 'workflow', 'infrastruktur', 'consulting'];

const pillarImages = [
  '/images/ai_assistant.jpeg',
  '/images/ai_workflow.jpeg',
  '/images/local_server.jpeg',
  '/images/ai_consulting.jpeg',
];

const diffIcons: ReactNode[] = [
  <MapPinIcon key="pin" size={28} />,
  <WrenchIcon key="wrench" size={28} />,
  <ShieldIcon key="shield" size={28} />,
  <BoltIcon key="bolt" size={28} />,
  <UnlockIcon key="unlock" size={28} />,
  <HouseIcon key="house" size={28} />,
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.aiServicesPage.meta.title, description: dict.aiServicesPage.meta.description };
}

export default async function AIServices({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.aiServicesPage;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">{t.hero.title}</h1>
              <p className="mt-4 text-lg text-text-muted max-w-xl mx-auto lg:mx-0">{t.hero.subtitle}</p>
              <p className="mt-6 text-text-muted max-w-xl mx-auto lg:mx-0">{t.intro}</p>
            </div>
            <div>
              <AIVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {t.pillars.map((pillar, i) => (
            <div
              key={i}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-2">
                  {pillarIcons[i]}
                  <h2 className="text-2xl font-bold text-white">{pillar.title}</h2>
                </div>
                <p className="text-sm text-accent-blue mb-4">{pillar.subtitle}</p>
                <p className="text-text-muted leading-relaxed">{pillar.description}</p>
                <ul className="mt-6 space-y-2">
                  {pillar.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/ai-services/${pillarLinks[i]}`}
                  className="inline-block mt-6 text-sm text-accent-blue hover:underline"
                >
                  {pillar.linkText}
                </Link>
              </div>
              <Link href={`/${locale}/ai-services/${pillarLinks[i]}`} className={`relative rounded-2xl overflow-hidden border border-white/5 min-h-[280px] block group ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={pillarImages[i]}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.differentiators.title} subtitle={t.differentiators.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.differentiators.items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4">{diffIcons[i]}</div>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
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
