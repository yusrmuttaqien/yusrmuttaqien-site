import untranslated from '@/components/Navbar/contents/untranslated';
import type { Links } from '@/components/Navbar/type';

const linkTitles = {
  home: 'Home',
  about: 'About Me',
  projects: 'Projects',
  techStack: 'Tech Stack',
};

export default {
  booking: 'Book a meet',
  menuOpen: 'Open',
  menuClose: 'Close',
  links: Object.entries(linkTitles).map(([key, value]) => ({
    title: value,
    ...untranslated.linkConfigs[key as Links],
  })),
  available: 'Now Available',
} as const;
