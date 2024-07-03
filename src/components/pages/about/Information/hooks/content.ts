import { useRouter } from 'next/router';
import id from '@/components/pages/about/Information/contents/id';
import en from '@/components/pages/about/Information/contents/en';
import untranslated from '@/components/pages/about/Information/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const options = { id, en };
  const { cvLinks, playLinks } = untranslated;
  const { cv, play, ...rest } = options[(locale as i18nLocales) || defaulti18n];
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
