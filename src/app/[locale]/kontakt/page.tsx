import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { MapPinIcon, InfoIcon } from '@/components/Icons';
import { locales, getDictionary, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.contactPage.meta.title, description: dict.contactPage.meta.description };
}

type ContactSearchParams = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  callbackTime?: string;
};

export default async function Kontakt({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<ContactSearchParams>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.contactPage;

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

      {/* Form */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="p-6 sm:p-8 rounded-2xl bg-surface/30 border border-white/5">
                <ContactForm initialValues={query} />
              </div>
            </div>

            {/* Info column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-4">{t.directContact}</h3>
                <div className="space-y-3 text-sm text-text-muted">
                  <p>{dict.footer.brand}</p>
                  <p className="flex items-center gap-2"><MapPinIcon size={16} /> {dict.footer.location}</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-surface/30 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-4">{t.expectations.title}</h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  {t.expectations.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-accent-blue/5 border border-accent-blue/20">
                <p className="flex items-center gap-2 text-sm text-accent-blue font-medium">
                  <InfoIcon size={16} className="flex-shrink-0 text-accent-blue" /> {t.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
