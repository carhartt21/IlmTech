import { redirect } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export default async function LeistungenRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locales.includes(locale as Locale) ? locale : 'de';
  redirect(`/${loc}/smart-home/leistungen`);
}
