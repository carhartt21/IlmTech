import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, getDictionary, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.datenschutzPage.meta.title };
}

export default async function Datenschutz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.datenschutzPage;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">{t.title}</h1>

      <div className="space-y-8 text-text-muted leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.overview}</h2>
          <p>{t.sections.overviewText}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.responsible}</h2>
          <p>{t.sections.responsibleText}</p>
          <p className="mt-2">
            IlmTech<br />
            Christoph Gerhardt<br />
            Fichtenweg 1<br />
            98693 Ilmenau<br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.dataCollection}</h2>
          <p>{t.sections.dataCollectionText}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.contactForm}</h2>
          <p>{t.sections.contactFormText}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.hosting}</h2>
          <p>{t.sections.hostingText}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.cookies}</h2>
          <p>{t.sections.cookiesText}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.rights}</h2>
          <p>{t.sections.rightsText}</p>
        </div>
      </div>
    </section>
  );
}
