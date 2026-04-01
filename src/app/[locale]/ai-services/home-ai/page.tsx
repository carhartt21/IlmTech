import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import CTAButton from '@/components/CTAButton';
import { BrainIcon, MessageCircleIcon } from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';
import AIVisualization from '@/components/AIVisualization';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.aiHomeAgentPage.meta.title, description: dict.aiHomeAgentPage.meta.description };
}

export default async function HomeAI({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.aiHomeAgentPage;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4"><BrainIcon size={48} /></div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t.hero.title}</h1>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">{t.hero.subtitle}</p>
          <p className="mt-6 text-text-muted max-w-3xl mx-auto">{t.intro}</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.capabilities.title} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.capabilities.items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <div className="mb-4"><MessageCircleIcon size={24} /></div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture — interactive visualization */}
      <section className="py-20 sm:py-28 bg-primary-dark/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">{t.architecture.title}</h2>
          <p className="text-text-muted text-center mb-12">{t.architecture.description}</p>
          <AIVisualization />
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t.packages.title} />
          <div className="grid sm:grid-cols-3 gap-6">
            {t.packages.items.map((pkg, i) => (
              <div key={i} className={`p-6 rounded-xl border ${i === 1 ? 'bg-accent-blue/10 border-accent-blue/30' : 'bg-surface/30 border-white/5'}`}>
                <h3 className="text-lg font-bold text-white mb-4">{pkg.name}</h3>
                <ul className="space-y-2">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
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
