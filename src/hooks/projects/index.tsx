import Trans from '@/components/Trans';
import untranslated from '@/contents/untranslated';
import currentI18n from '@/utils/currentI18n';
import enumFromObjectKeys from '@/utils/enumFromObjectKeys';
import type { ProjectsParams } from '@/hooks/projects/type';
import type { TransComp } from '@/components/Trans/type';
import type { Project } from '@/types/contents';

const COMP: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export default function useProjects(params?: ProjectsParams) {
  const { filter, limit } = params || {};
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
      all: 0,
    },
  };

  Object.entries(projects).forEach(([title, values]) => {
    const { categories, flag, hrefs, ...rest } = values;
    const current = {
      ...rest,
      flag,
      category: categories.map((category) => category[currentI18n()]),
      title: <Trans string={title} name={`project-${title}-title`} comps={COMP} />,
      titleString: title,
      alt: title,
      hrefs: hrefs.map((href) => [href[0][currentI18n()], href[1]]),
    };

    contents.allProjects.push(current);
    flag.forEach((f) => {
      contents.count[f] += 1;
      contents.projects[f].push(current);
    });
  });

  contents.count.all = contents.allProjects.length;

  if (filter) {
    const sample = enumFromObjectKeys(projects);

    contents.allProjects = contents.allProjects.filter(filter.bind(null, sample));
    contents.projects.accessible = contents.projects.accessible.filter(filter.bind(null, sample));
    contents.projects.ongoing = contents.projects.ongoing.filter(filter.bind(null, sample));
    contents.projects.upcoming = contents.projects.upcoming.filter(filter.bind(null, sample));
  }
  if (limit) {
    contents.allProjects = contents.allProjects.slice(0, limit);
    contents.projects.accessible = contents.projects.accessible.slice(0, limit);
    contents.projects.ongoing = contents.projects.ongoing.slice(0, limit);
    contents.projects.upcoming = contents.projects.upcoming.slice(0, limit);
  }

  return contents;
}
