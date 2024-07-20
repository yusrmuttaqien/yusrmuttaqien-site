import currentI18n from '@/utils/currentI18n';
import id from '@/components/pages/about/Information/contents/id';
import en from '@/components/pages/about/Information/contents/en';
import untranslated from '@/components/pages/about/Information/contents/untranslated';

export default function useContent() {
  const options = { id, en };
  const { cvLinks, playLinks } = untranslated;
  const { cv, play, ...rest } = options[currentI18n()];
  const contents = {
    ...rest,
    cv: {
      title: cv.title,
      lists: Object.entries(cvLinks).map(([key, value]) => ({
        title: cv.types[key as keyof typeof cv.types],
        href: value,
      })),
    },
    play: {
      ...play,
      links: playLinks,
    },
  };

  return contents;
}
