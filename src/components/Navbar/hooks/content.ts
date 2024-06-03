import { useRouter } from 'next/router';
import en from '@/components/Navbar/contents/en';
import id from '@/components/Navbar/contents/id';
import untranslated from '@/components/Navbar/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const { sitemapsConfig } = untranslated;
  const options = { en, id };
  const { sitemapsTitle, ...rest } = options[(locale as i18nLocales) || defaulti18n];
  const contents = {
    ...rest,
    sitemaps: Object.entries(sitemapsConfig).map(([key, value]) => ({
      title: sitemapsTitle[key as keyof typeof sitemapsTitle],
      ...value,
    })),
  };

  return contents;
}
