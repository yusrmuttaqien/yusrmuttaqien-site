import type { FooterSites } from '@/types/content';

export function sites(props: FooterSites) {
  const { masteries, projects, threeSteps } = props;

  return [
    { title: 'Hero', link: '/about' },
    { title: masteries, link: '/about' },
    { title: projects, link: '/about' },
    { title: threeSteps, link: '/about' },
  ];
}

export const internets = [
  { title: 'LinkedIn', link: '/about' },
  { title: 'Github', link: '/about' },
  { title: 'Instagram', link: '/about' },
];
