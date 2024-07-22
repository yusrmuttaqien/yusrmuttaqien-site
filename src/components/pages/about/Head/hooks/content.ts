import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const options = { en: globalEn, id: globalId };
  const { sitemapsTitle } = options[currentI18n()];
  const contents = {
    title: sitemapsTitle.about,
  };

  return contents;
}
