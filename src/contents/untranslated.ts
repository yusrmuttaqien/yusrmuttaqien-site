import type { Projects } from '@/types/contents';

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
      href: 'https://agreeculture.id/',
      collaborator: ['work', 'Telkom Indonesia'],
    },
    findMovie: {
      categories: ['web'],
      year: '2023',
      href: 'https://findmovie-yusr.vercel.app/',
      collaborator: ['self'],
    },
    'dashboard [<TODO>]': {
      categories: ['web'],
      year: '2023 - 2024',
      href: 'https://dashboard-site-showoff.vercel.app/login',
      collaborator: ['self'],
    },
    'dashboard [<TODO>] landingpage': {
      categories: ['web'],
      year: '2024',
      href: 'https://yusrmuttaqien.github.io/dashboardlanding-bootcamp-site/',
      collaborator: ['self'],
    },
  } as Projects,
} as const;
