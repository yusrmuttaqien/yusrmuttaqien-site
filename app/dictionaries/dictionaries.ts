import 'server-only';
import type { i18nTypes } from '@/app/types/i18n';

const dictionaries = {
  mainPage: {
    en: () => import('./main-page/en.json').then((module) => module.default),
  },
};

export const getDictionary = async (page: keyof typeof dictionaries, locale: i18nTypes) =>
  dictionaries[page][locale]();
