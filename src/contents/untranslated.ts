import TelkomAgreecultureCover from '@/contents/projects/telkom-agreeculture/images/cover.png';
import FindMovieCover from '@/contents/projects/find-movie/images/cover.png';
import DashbardTodoCover from '@/contents/projects/dashboard-todo/images/cover.png';
import YusrMuttaqienCover from '@/contents/projects/yusrmuttaqien-site/images/cover.png';
import en from '@/contents/en';
import id from '@/contents/id';
import { ProjectFlag } from '@/types/contents';

const { projectCategories: enProjCat, projectHrefCopy: enProjHrefCopy } = en;
const { projectCategories: idProjCat, projectHrefCopy: idProjHrefCopy } = id;

type CatTypes = keyof typeof idProjCat;
type CopyHrefTypes = keyof typeof idProjHrefCopy;
type HrefsTypes = [{ en: string; id: string }, string][];

const PROJECT_COLLABORATOR_PERSONAL = 'Personal';
const PROJECT_CATEGORIES = Object.keys(idProjCat).reduce((prev, curr) => {
  const currTyped = curr as CatTypes;
  prev[currTyped] = [{ en: enProjCat[currTyped], id: idProjCat[currTyped] }];

  return prev;
}, {} as { [key in CatTypes]: [{ en: string; id: string }] });
const PROJECT_HREF_COPIES = Object.keys(idProjHrefCopy).reduce((prev, curr) => {
  const currTyped = curr as CopyHrefTypes;
  prev[currTyped] = { en: enProjHrefCopy[currTyped], id: idProjHrefCopy[currTyped] };

  return prev;
}, {} as { [key in CopyHrefTypes]: { en: string; id: string } });
const PROJECT_MORE_CATEGORIES = {
  nextjs: ['Next.js', 'https://nextjs.org/'],
  'framer-motion': ['Framer motion', 'https://www.framer.com/motion/'],
  react: ['React', 'https://reactjs.org/'],
  lenis: ['Lenis', 'https://lenis.darkroom.engineering/'],
  typescript: ['TypeScript', 'https://www.typescriptlang.org/'],
  vercel: ['Vercel', 'https://vercel.com/'],
  zustand: ['Zustand', 'https://zustand.surge.sh/'],
  hookstate: ['Hookstate', 'https://hookstate.js.org/'],
  'react-router-dom': ['React router', 'https://reactrouter.com/'],
  'styled-components': ['Styled components', 'https://styled-components.com/'],
  vite: ['Vite', 'https://vitejs.dev/'],
  'github-pages': ['Github pages', 'https://pages.github.com/'],
  jest: ['Jest', 'https://jestjs.io/'],
  'redux-toolkit': ['Redux toolkit', 'https://redux-toolkit.js.org/'],
  axios: ['Axios', 'https://axios-http.com/'],
  'final-form': ['Final form', 'https://final-form.org/'],
  'tailwind-css': ['Tailwind css', 'https://tailwindcss.com/'],
  'ck-editor': ['Ck editor', 'https://ckeditor.com/'],
  'react-query': ['React query', 'https://react-query.tanstack.com/'],
  vitest: ['Vitest', 'https://vitest.dev/'],
};

export default {
  internets: {
    linkedin: { href: 'https://www.linkedin.com/in/yusrmuttaqien/' },
    github: { href: 'https://github.com/yusrmuttaqien' },
    medium: { href: 'https://medium.com/@yusrmuttaqien' },
    codesandbox: { href: 'https://codesandbox.io/u/yusrmuttaqien' },
    instagram: { href: 'https://www.instagram.com/yusrmuttaqien/' },
    upwork: { href: 'https://www.upwork.com/freelancers/~0151ab1ef4a4dd4049' },
    'Instagram [<VA>]': { href: 'https://www.instagram.com/yusr.va.flow/' },
    x: { href: 'https://x.com/drdhemm' },
  },
  projects: {
    'Yusril Muttaqien [<Site>]': {
      categories: [
        PROJECT_CATEGORIES.web,
        PROJECT_CATEGORIES.closedSource,
        PROJECT_MORE_CATEGORIES.nextjs,
        PROJECT_MORE_CATEGORIES['framer-motion'],
        PROJECT_MORE_CATEGORIES.lenis,
        PROJECT_MORE_CATEGORIES.typescript,
        PROJECT_MORE_CATEGORIES.vercel,
        PROJECT_MORE_CATEGORIES.zustand,
        PROJECT_MORE_CATEGORIES['tailwind-css'],
      ],
      year: '2024',
      hrefs: [
        [PROJECT_HREF_COPIES.story, '#'],
        [PROJECT_HREF_COPIES.live, 'https://yusrmuttaqien.vercel.app'],
      ] as HrefsTypes,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: YusrMuttaqienCover,
      flag: [ProjectFlag.ACCESSIBLE, ProjectFlag.ONGOING],
    },
    'dashboard [<TODO>]': {
      categories: [
        PROJECT_CATEGORIES.web,
        PROJECT_MORE_CATEGORIES.react,
        PROJECT_MORE_CATEGORIES.hookstate,
        PROJECT_MORE_CATEGORIES['react-router-dom'],
        PROJECT_MORE_CATEGORIES['styled-components'],
        PROJECT_MORE_CATEGORIES.vite,
        PROJECT_MORE_CATEGORIES.vercel,
        PROJECT_MORE_CATEGORIES['github-pages'],
      ],
      year: '2023 - 2024',
      hrefs: [
        [PROJECT_HREF_COPIES.story, '#'],
        [PROJECT_HREF_COPIES.live, 'https://dashboard-site-showoff.vercel.app/login'],
        [
          { en: 'Access live landing page', id: 'Akses halaman arahan' },
          'https://yusrmuttaqien.github.io/dashboardlanding-bootcamp-site/',
        ],
        [
          PROJECT_HREF_COPIES.github,
          'https://github.com/yusrmuttaqien?tab=repositories&q=dashboard-site&type=&language=&sort=',
        ],
      ] as HrefsTypes,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: DashbardTodoCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
    'Telkom Agreeculture': {
      categories: [
        PROJECT_CATEGORIES.web,
        PROJECT_CATEGORIES.closedSource,
        PROJECT_MORE_CATEGORIES.react,
        PROJECT_MORE_CATEGORIES.nextjs,
        PROJECT_MORE_CATEGORIES['redux-toolkit'],
        PROJECT_MORE_CATEGORIES.jest,
        PROJECT_MORE_CATEGORIES['react-router-dom'],
        PROJECT_MORE_CATEGORIES['styled-components'],
        PROJECT_MORE_CATEGORIES.axios,
        PROJECT_MORE_CATEGORIES['final-form'],
        PROJECT_MORE_CATEGORIES['tailwind-css'],
        PROJECT_MORE_CATEGORIES['ck-editor'],
      ],
      year: '2021 - 2024',
      hrefs: [
        [PROJECT_HREF_COPIES.story, '#'],
        [PROJECT_HREF_COPIES.live, 'https://agreeculture.id/'],
      ] as HrefsTypes,
      collaborator: ['Telkom Indonesia'],
      src: TelkomAgreecultureCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
    findMovie: {
      categories: [
        PROJECT_CATEGORIES.web,
        PROJECT_MORE_CATEGORIES.react,
        PROJECT_MORE_CATEGORIES['react-query'],
        PROJECT_MORE_CATEGORIES.axios,
        PROJECT_MORE_CATEGORIES['react-router-dom'],
        PROJECT_MORE_CATEGORIES['styled-components'],
        PROJECT_MORE_CATEGORIES.typescript,
        PROJECT_MORE_CATEGORIES.vitest,
        PROJECT_MORE_CATEGORIES.vite,
      ],
      year: '2023',
      hrefs: [
        [PROJECT_HREF_COPIES.story, '#'],
        [PROJECT_HREF_COPIES.live, 'https://findmovie-yusr.vercel.app/'],
        [PROJECT_HREF_COPIES.github, 'https://github.com/yusrmuttaqien/findmovie-site'],
      ] as HrefsTypes,
      collaborator: [PROJECT_COLLABORATOR_PERSONAL],
      src: FindMovieCover,
      flag: [ProjectFlag.ACCESSIBLE],
    },
  },
};
