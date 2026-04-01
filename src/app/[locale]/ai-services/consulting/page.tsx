import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import { CompassIcon } from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.aiConsultingPage.meta.title, description: dict.aiConsultingPage.meta.description };
}

export default async function AIConsulting({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.aiConsultingPage;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4"><CompassIcon size={48} /></div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t.hero.title}</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <p className="mt-6 text-text-muted max-w-3xl mx-auto">{t.intro}</p>
        </div>
      </section>

      {/* Consulting Steps */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.steps.title} />
          <div className="space-y-6">
            {t.steps.items.map((step, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-xl bg-surface/20 border border-white/5">
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue font-bold text-lg">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{step.description}</p>
                </div>
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
