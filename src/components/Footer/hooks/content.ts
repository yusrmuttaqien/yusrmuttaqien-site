import id from '@/components/Footer/content/id';
import en from '@/components/Footer/content/en';
import untranslated from '@/components/Footer/content/untranslated';
import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import globalUntranslated from '@/contents/untranslated';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
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

  return contents[currentI18n()];
}
