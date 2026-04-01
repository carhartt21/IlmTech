import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import {
  UnlockIcon, MapPinIcon, ShieldIcon, WrenchIcon, RefreshIcon, HandshakeIcon,
} from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';

const valueIcons: ReactNode[] = [
  <UnlockIcon key="unlock" size={28} />,
  <MapPinIcon key="pin" size={28} />,
  <ShieldIcon key="shield" size={28} />,
  <WrenchIcon key="wrench" size={28} />,
  <RefreshIcon key="refresh" size={28} />,
  <HandshakeIcon key="handshake" size={28} />,
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.aboutPage.meta.title, description: dict.aboutPage.meta.description };
}

export default async function UeberUns({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.aboutPage;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t.hero.title}</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="p-8 sm:p-12 rounded-2xl bg-surface/30 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">{t.mission.title}</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                {t.mission.paragraphs.map((p, i) => {
                  // Handle {IlmTech} and {Home Assistant} as highlighted spans
                  const parts = p.split(/\{([^}]+)\}/g);
                  return (
                    <p key={i}>
                      {parts.map((part, pi) =>
                        pi % 2 === 1 ? (
                          <span key={pi} className={part === 'Home Assistant' ? 'text-accent-blue' : 'text-white font-semibold'}>
                            {part === 'Home Assistant' ? ` ${part}` : part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[400px] border border-white/5">
              <Image
                src="/images/planning-blueprints.jpg"
                alt={t.mission.imageAlt}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.values.title}</h2>
            <p className="mt-4 text-text-muted text-lg">{t.values.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.values.items.map((v, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4">{valueIcons[i]}</div>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t.approach.title}</h2>
          <div className="space-y-8">
            {t.approach.items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/20 border border-white/5">
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
