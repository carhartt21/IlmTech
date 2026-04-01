import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, getDictionary, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return { title: dict.imprintPage.meta.title };
}

export default async function Impressum({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const t = dict.imprintPage;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">{t.title}</h1>

      <div className="space-y-6 text-text-muted leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.legalInfo}</h2>
          <p>
            IlmTech<br />
            Christoph Gerhardt<br />
            Fichtenweg 1<br />
            98693 Ilmenau<br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.contact}</h2>
          <p>
            Telefon: 015254399778<br />
            E-Mail: info@ilmtech.de
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.vatId}</h2>
          <p>
            {t.sections.vatDesc}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.responsible}</h2>
          <p>
            Christoph Gerhardt<br />
            Fichtenweg 1, 98693 Ilmenau
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{t.sections.disclaimer}</h2>

          <h3 className="text-sm font-semibold text-white mt-4 mb-1">{t.sections.contentLiability}</h3>
          <p>{t.sections.contentLiabilityText}</p>

          <h3 className="text-sm font-semibold text-white mt-4 mb-1">{t.sections.linkLiability}</h3>
          <p>{t.sections.linkLiabilityText}</p>

          <h3 className="text-sm font-semibold text-white mt-4 mb-1">{t.sections.copyright}</h3>
          <p>{t.sections.copyrightText}</p>
        </div>


      </div>
    </section>
  );
}
