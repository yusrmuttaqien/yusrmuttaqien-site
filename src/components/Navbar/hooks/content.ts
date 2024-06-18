import { useRouter } from 'next/router';
import globalEn from '@/contents/en';
import globalId from '@/contents/id';
import en from '@/components/Navbar/contents/en';
import id from '@/components/Navbar/contents/id';
import untranslated from '@/components/Navbar/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const { sitemapsConfig } = untranslated;
  const options = { en, id };
  const globalOptions = { en: globalEn, id: globalId };
  const { sitemapsTitle } = globalOptions[(locale as i18nLocales) || defaulti18n];
  const contents = {
    ...options[(locale as i18nLocales) || defaulti18n],
    sitemaps: Object.entries(sitemapsConfig).map(([key, value]) => ({
      title: sitemapsTitle[key as keyof typeof sitemapsTitle],
      ...value,
    })),
  };

  return contents;
}
