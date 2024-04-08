import { useRouter } from 'next/router';
import en from '@/contents/home/en';
import id from '@/contents/home/id';
import { defaulti18n } from '@/constants/i18n';
import type { i18nTypes } from '@/types/i18n';

export default function useContent() {
  const { locale } = useRouter();
  const langs = { en, id };

  return langs[(locale as i18nTypes) || defaulti18n];
}
