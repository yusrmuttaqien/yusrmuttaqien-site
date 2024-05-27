import { useRouter } from 'next/router';
import en from '@/components/Navbar/contents/en';
import id from '@/components/Navbar/contents/id';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const contents = { en, id };

  return contents[locale as i18nLocales] || defaulti18n;
}
