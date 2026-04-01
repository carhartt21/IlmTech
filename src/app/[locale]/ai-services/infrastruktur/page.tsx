import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import { ServerIcon } from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.aiInfrastrukturPage.meta.title, description: dict.aiInfrastrukturPage.meta.description };
}

export default async function AIInfrastruktur({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.aiInfrastrukturPage;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4"><ServerIcon size={48} /></div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t.hero.title}</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <p className="mt-6 text-text-muted max-w-3xl mx-auto">{t.intro}</p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.useCases.title} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.useCases.items.map((uc, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-text-muted">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.stack.title} />
          <div className="space-y-6">
            {t.stack.layers.map((layer, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/20 border border-white/5">
                <h3 className="text-base font-semibold text-accent-blue mb-3">{layer.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {layer.components.map((comp, ci) => (
                    <span key={ci} className="px-3 py-1 text-xs rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                      {comp}
                    </span>
                  ))}
                </div>
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
