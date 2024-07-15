import Trans from '@/components/Trans';
import untranslated from '@/contents/untranslated';
import currentI18n from '@/utils/currentI18n';
import type { TransComp } from '@/components/Trans/type';
import type { Project } from '@/types/contents';

const COMP: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export default function useProjects() {
  const { projects } = untranslated;
  const contents = {
    allProjects: [] as Project[],
    projects: {
      accessible: [] as Project[],
      ongoing: [] as Project[],
      upcoming: [] as Project[],
    },
    count: {
      accessible: 0,
      ongoing: 0,
      upcoming: 0,
    },
  };

  Object.entries(projects).forEach(([title, values]) => {
    const { categories, flag, ...rest } = values;
    const current = {
      ...rest,
      flag,
      category: categories.map((category) => category[currentI18n()]),
      title: <Trans string={title} name={`project-${title}-title`} comps={COMP} />,
      titleString: title,
      alt: title,
    };

    contents.allProjects.push(current);
    flag.forEach((f) => {
      contents.count[f] += 1;
      contents.projects[f].push(current);
    });
  });

  return contents;
}
