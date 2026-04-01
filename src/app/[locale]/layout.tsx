import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, getDictionary, type Locale } from '@/i18n/config';
import Header from '@/components/Header';
import { SubNav } from '@/components/Header';
import Footer from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const altLocale = locale === 'de' ? 'en' : 'de';
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `https://ilmtech.de/${locale}`,
      languages: {
        de: `https://ilmtech.de/de`,
        en: `https://ilmtech.de/en`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://ilmtech.de/${locale}`,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: altLocale === 'de' ? 'de_DE' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IlmTech',
    description: dict.meta.description,
    url: `https://ilmtech.de/${locale}`,
    telephone: '+4915254399778',
    email: 'info@ilmtech.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fichtenweg 1',
      addressLocality: 'Ilmenau',
      postalCode: '98693',
      addressRegion: 'Thüringen',
      addressCountry: 'DE',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 50.6842, longitude: 10.9271 },
      geoRadius: '50000',
    },
    serviceType: ['Smart Home Installation', 'Home Assistant', 'KI-Integration', 'PV Integration', 'Energiemanagement'],
  };

  return (
    <I18nProvider locale={locale as Locale} dict={dict}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="flex-1 pt-16">
        <SubNav />
        {children}
      </main>
      <Footer />
    </I18nProvider>
  );
}
