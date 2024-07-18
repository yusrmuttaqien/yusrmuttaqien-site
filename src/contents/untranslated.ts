import TelkomAgreecultureCover from '@/contents/projects/telkom-agreeculture/images/cover.png';
import FindMovieCover from '@/contents/projects/find-movie/images/cover.png';
import DashbardTodoCover from '@/contents/projects/dashboard-todo/images/cover.png';
import en from '@/contents/en';
import id from '@/contents/id';
import { ProjectFlag } from '@/types/contents';

const { projectCategories: enProjCat, projectCopy: enProjCopy } = en;
const { projectCategories: idProjCat, projectCopy: idProjCopy } = id;

type CatTypes = keyof typeof idProjCat;
type CopyTypes = keyof typeof idProjCopy;
type HrefsTypes = [{ en: string; id: string }, string][];

const PROJECT_COLLABORATOR_PERSONAL = 'Personal';
const PROJECT_CATEGORIES = Object.keys(idProjCat).reduce((prev, curr) => {
  const currTyped = curr as CatTypes;
  prev[currTyped] = { en: enProjCat[currTyped], id: idProjCat[currTyped] };

  return prev;
}, {} as { [key in CatTypes]: { en: string; id: string } });
const PROJECT_COPIES = Object.keys(idProjCopy).reduce((prev, curr) => {
  const currTyped = curr as CopyTypes;
  prev[currTyped] = { en: enProjCopy[currTyped], id: idProjCopy[currTyped] };

  return prev;
}, {} as { [key in CopyTypes]: { en: string; id: string } });

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
    'Yusril Muttaqien [<Site>]': {
      categories: [PROJECT_CATEGORIES.web],
      year: '2024',
      hrefs: [
        [PROJECT_COPIES.story, '#'],
        [PROJECT_COPIES.live, 'https://yusrmuttaqien.vercel.app'],
      ] as HrefsTypes,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: undefined,
      flag: [ProjectFlag.ACCESSIBLE, ProjectFlag.ONGOING],
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
      ] as HrefsTypes,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: DashbardTodoCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
    'Telkom Agreeculture': {
      categories: [PROJECT_CATEGORIES.web],
      year: '2021 - 2024',
      hrefs: [
        [PROJECT_COPIES.story, '#'],
        [PROJECT_COPIES.live, 'https://agreeculture.id/'],
      ] as HrefsTypes,
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
      ] as HrefsTypes,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: FindMovieCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
  },
};
