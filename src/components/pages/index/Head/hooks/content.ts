import { useRouter } from 'next/router';
import id from '@/components/pages/index/Head/contents/id';
import en from '@/components/pages/index/Head/contents/en';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const contents = { en, id };

  return contents[locale as i18nLocales] || defaulti18n;
}
