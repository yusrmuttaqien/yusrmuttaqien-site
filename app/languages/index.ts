import 'server-only';
import en from '@/app/languages/en';
import { defaulti18n } from '@/app/constants/i18n';
import type { i18nTypes } from '@/app/types/i18n';

export function getLanguage(locale: i18nTypes = 'en') {
  const languages: Record<string, Record<string, any>> = { en };

  return languages[locale] || languages[defaulti18n];
}
