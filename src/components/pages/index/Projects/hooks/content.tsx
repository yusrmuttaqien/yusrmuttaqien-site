import useProjects from '@/hooks/projects';
import id from '@/components/pages/index/Projects/content/id';
import en from '@/components/pages/index/Projects/content/en';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const { allProjects } = useProjects();
  const options = { en, id };
  const contents = { projects: allProjects.slice(0, 3), ...options[currentI18n()] };

  return contents;
}
