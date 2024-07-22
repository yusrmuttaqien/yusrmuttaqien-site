import id from '@/components/pages/projects/Lists/contents/id';
import en from '@/components/pages/projects/Lists/contents/en';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const options = { id, en };
  const contents = options[currentI18n()];

  return contents;
}
