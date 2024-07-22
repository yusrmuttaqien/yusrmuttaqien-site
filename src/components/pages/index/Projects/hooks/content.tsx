import useProjects from '@/hooks/projects';
import id from '@/components/pages/index/Projects/content/id';
import en from '@/components/pages/index/Projects/content/en';
import currentI18n from '@/utils/currentI18n';

export default function useContent() {
  const { allProjects, count } = useProjects({
    filter: (sample, value) => {
      const YMSite = sample['Yusril Muttaqien [<Site>]'];

      return value.titleString !== YMSite;
    },
    limit: 3,
  });
  const { more, ...rest } = { en, id }[currentI18n()];
  const contents = {
    projects: allProjects,
    more: (() => {
      const begin = more.split('<')[0];
      const end = more.split('>')[1];
      const remainder = count.all - allProjects.length;

      return `${begin}<S\\+${remainder}>${end}`;
    })(),
    ...rest,
  };

  return contents;
}
