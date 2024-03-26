import { i18nOptions } from '@/app/constants/i18n';
import type { i18nTypes } from '@/app/types/i18n';

export default function LangSelect(locale: i18nTypes) {
  return i18nOptions.some((locale) => locale === i18nOptions[0]) ? locale : i18nOptions[0];
}
