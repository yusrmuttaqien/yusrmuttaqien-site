import id from '@/components/pages/index/Head/contents/id';
import en from '@/components/pages/index/Head/contents/en';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const contents = { en, id };

  return contents[currentI18n()];
}
