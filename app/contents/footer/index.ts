import 'server-only';
import LangSelect from '@/app/utils/lang-select';
import type { i18nTypes } from '@/app/types/i18n';

const dictionaries = {
  en: () => import('./en').then((module) => module.default),
  id: () => import('./id').then((module) => module.default),
};

export default async function footerContents(locale: i18nTypes) {
  return dictionaries[LangSelect(locale)]();
}
