import TelkomAgreecultureCover from '@/contents/projects/telkom-agreeculture/images/cover.png';
import FindMovieCover from '@/contents/projects/find-movie/images/cover.png';
import DashbardTodoCover from '@/contents/projects/dashboard-todo/images/cover.png';
import en from '@/contents/en';
import id from '@/contents/id';
import { ProjectFlag } from '@/types/contents';
import type { ImageHrefs } from '@/components/Image/type';

const { projectCategories: enProjCat, projectCopy: enProjCopy } = en;
const { projectCategories: idProjCat, projectCopy: idProjCopy } = id;

type catTypes = keyof typeof idProjCat;
type copyTypes = keyof typeof idProjCopy;

const PROJECT_COLLABORATOR_PERSONAL = 'Personal';
const PROJECT_CATEGORIES = Object.keys(idProjCat).reduce((prev, curr) => {
  const currTyped = curr as catTypes;
  prev[currTyped] = { en: enProjCat[currTyped], id: idProjCat[currTyped] };

  return prev;
}, {} as { [key in catTypes]: { en: string; id: string } });
const PROJECT_COPIES = Object.keys(idProjCopy).reduce((prev, curr) => {
  const currTyped = curr as copyTypes;
  prev[currTyped] = { en: enProjCopy[currTyped], id: idProjCopy[currTyped] };

  return prev;
}, {} as { [key in copyTypes]: { en: string; id: string } });

export default {
  internets: {
    linkedin: { href: 'https://www.linkedin.com/in/yusrmuttaqien/' },
    upwork: { href: 'https://www.upwork.com/freelancers/~0151ab1ef4a4dd4049' },
    github: { href: 'https://github.com/yusrmuttaqien' },
    instagram: { href: 'https://www.instagram.com/yusrmuttaqien/' },
    'Instagram [<VA>]': { href: 'https://www.instagram.com/yusr.va.flow/' },
    x: { href: 'https://x.com/drdhemm' },
  },
  projects: {
    'Telkom Agreeculture': {
      categories: [PROJECT_CATEGORIES.web],
      year: '2021 - 2024',
      hrefs: [
        [PROJECT_COPIES.story, '#'],
        [PROJECT_COPIES.live, 'https://agreeculture.id/'],
      ] as ImageHrefs,
      collaborator: ['Telkom Indonesia'],
      src: TelkomAgreecultureCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
    findMovie: {
      categories: [PROJECT_CATEGORIES.web],
      year: '2023',
      hrefs: [
        [PROJECT_COPIES.story, '#'],
        [PROJECT_COPIES.live, 'https://findmovie-yusr.vercel.app/'],
      ] as ImageHrefs,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: FindMovieCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
    'dashboard [<TODO>]': {
      categories: [PROJECT_CATEGORIES.web],
      year: '2023 - 2024',
      hrefs: [
        [PROJECT_COPIES.story, '#'],
        [PROJECT_COPIES.live, 'https://dashboard-site-showoff.vercel.app/login'],
        [
          { en: 'Access live landing page', id: 'Akses halaman arahan' },
          'https://yusrmuttaqien.github.io/dashboardlanding-bootcamp-site/',
        ],
      ] as ImageHrefs,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: DashbardTodoCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
  },
};
