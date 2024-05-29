import { useRouter } from 'next/router';
import id from '@/components/Hero/contents/id';
import en from '@/components/Hero/contents/en';
import untranslated from '@/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const internets = Object.values(untranslated.internets);
  const contents = { en: { ...en, internets }, id: { ...id, internets } };

  return contents[locale as i18nLocales] || defaulti18n;
}
