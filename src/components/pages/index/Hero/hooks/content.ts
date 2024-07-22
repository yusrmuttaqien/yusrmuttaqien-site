import id from '@/components/pages/index/Hero/contents/id';
import en from '@/components/pages/index/Hero/contents/en';
import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import untranslated from '@/contents/untranslated';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const { internets } = untranslated;
  const internetsMap = Object.entries(internets).map(([title, rest]) => ({ title, ...rest }));
  const contents = {
    en: { ...en, internets: internetsMap, internetsTitle: globalEn.internetsTitle },
    id: { ...id, internets: internetsMap, internetsTitle: globalId.internetsTitle },
  };

  return contents[currentI18n()];
}
