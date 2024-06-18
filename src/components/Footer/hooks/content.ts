import { useRouter } from 'next/router';
import id from '@/components/Footer/content/id';
import en from '@/components/Footer/content/en';
import untranslated from '@/components/Footer/content/untranslated';
import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import globalUntranslated from '@/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const { createdWithDesc } = untranslated;
  const { internets } = globalUntranslated;
  const internetsMap = Object.entries(internets).map(([title, rest]) => ({ title, ...rest }));
  const contents = {
    en: {
      ...en,
      internets: internetsMap,
      internetsTitle: globalEn.internetsTitle,
      createdWithDesc,
    },
    id: {
      ...id,
      internets: internetsMap,
      internetsTitle: globalId.internetsTitle,
      createdWithDesc,
    },
  };

  return contents[locale as i18nLocales] || defaulti18n;
}
