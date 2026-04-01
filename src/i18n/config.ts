import type { Dictionary } from './de';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import('./de').then((m) => m.default),
  en: () => import('./en').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
