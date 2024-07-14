import { useRouter } from 'next/router';
import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const options = { en: globalEn, id: globalId };
  const { sitemapsTitle } = options[(locale as i18nLocales) || defaulti18n];
  const contents = {
    title: sitemapsTitle.projects,
  };

  return contents;
}
