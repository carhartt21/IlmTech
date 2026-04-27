import type { MetadataRoute } from 'next';

const BASE_URL = 'https://ilmtech.de';

const routes = [
  '',
  '/leistungen',
  '/smart-home',
  '/smart-home/leistungen',
  '/smart-home/technologien',
  '/ai-services',
  '/ai-services/consulting',
  '/ai-services/home-ai',
  '/ai-services/infrastruktur',
  '/ai-services/workflow',
  '/pitches',
  '/ueber-uns',
  '/kontakt',
  '/impressum',
  '/datenschutz',
];

const pitchRoutesByLocale: Record<'de' | 'en', string[]> = {
  de: [
    '/pitches/hausverwaltung',
    '/pitches/insolvenz-auktionswesen',
    '/pitches/medizinische-praxen',
    '/pitches/anwaltskanzleien',
    '/pitches/handwerksbetriebe',
    '/pitches/hotels',
  ],
  en: [
    '/pitches/property-management',
    '/pitches/insolvency-auctions',
    '/pitches/medical-practices',
    '/pitches/law-firms',
    '/pitches/craft-businesses',
    '/pitches/hotels',
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of ['de', 'en'] as const) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            de: `${BASE_URL}/de${route}`,
            en: `${BASE_URL}/en${route}`,
          },
        },
      });
    }
  }

  for (const locale of ['de', 'en'] as const) {
    for (const route of pitchRoutesByLocale[locale]) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
