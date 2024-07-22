import id from '@/components/Loader/contents/id';
import en from '@/components/Loader/contents/en';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const contents = { en, id };

  return contents[currentI18n()];
}
