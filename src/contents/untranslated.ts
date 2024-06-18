import TelkomAgreecultureCover from '@/contents/projects/telkom-agreeculture/images/cover.png';
import FindMovieCover from '@/contents/projects/find-movie/images/cover.png';
import DashbardTodoCover from '@/contents/projects/dashboard-todo/images/cover.png';
import type { Projects, ProjectHref } from '@/types/contents';

const PROJECT_HREF_SHOWCASE_SOON: ProjectHref = [
  { en: 'Access project story', id: 'Akses cerita projek' },
  '#',
];
const PROJECT_HREF_LIVE_COPY = { en: 'Access live project', id: 'Akses halaman projek' };

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
      categories: ['web'],
      year: '2021 - 2024',
      hrefs: [PROJECT_HREF_SHOWCASE_SOON, [PROJECT_HREF_LIVE_COPY, 'https://agreeculture.id/']],
      collaborator: ['work', 'Telkom Indonesia'],
      src: TelkomAgreecultureCover,
    },
    findMovie: {
      categories: ['web'],
      year: '2023',
      hrefs: [
        PROJECT_HREF_SHOWCASE_SOON,
        [PROJECT_HREF_LIVE_COPY, 'https://findmovie-yusr.vercel.app/'],
      ],
      collaborator: ['self'],
      src: FindMovieCover,
    },
    'dashboard [<TODO>]': {
      categories: ['web'],
      year: '2023 - 2024',
      hrefs: [
        PROJECT_HREF_SHOWCASE_SOON,
        [PROJECT_HREF_LIVE_COPY, 'https://dashboard-site-showoff.vercel.app/login'],
        [
          { en: 'Access live landing page', id: 'Akses halaman arahan' },
          'https://yusrmuttaqien.github.io/dashboardlanding-bootcamp-site/',
        ],
      ],
      collaborator: ['self'],
      src: DashbardTodoCover,
    },
  } as Projects,
} as const;
