import { useRouter } from 'next/router';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function currentI18n() {
  const { locale } = useRouter();

  return (locale as i18nLocales) || defaulti18n;
}
