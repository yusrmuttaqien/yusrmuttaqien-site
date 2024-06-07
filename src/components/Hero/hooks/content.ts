import { useRouter } from 'next/router';
import id from '@/components/Hero/contents/id';
import en from '@/components/Hero/contents/en';
import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import untranslated from '@/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const { internets } = untranslated;
  const internetsMap = Object.entries(internets).map(([title, rest]) => ({ title, ...rest }));
  const contents = {
    en: { ...en, internets: internetsMap, internetsTitle: globalEn.internetsTitle },
    id: { ...id, internets: internetsMap, internetsTitle: globalId.internetsTitle },
  };

  return contents[locale as i18nLocales] || defaulti18n;
}
