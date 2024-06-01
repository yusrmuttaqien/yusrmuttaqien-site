import untranslated from '@/components/Navbar/contents/untranslated';
import type { Links } from '@/components/Navbar/type';

const sitemapsTitle = {
  home: 'Home',
  about: 'About Me',
  projects: 'Projects',
  techStack: 'Tech Stack',
};

export default {
  booking: 'Book a meet',
  menuOpen: 'Open',
  menuClose: 'Close',
  sitemaps: Object.entries(sitemapsTitle).map(([key, value]) => ({
    title: value,
    ...untranslated.sitemapsConfig[key as Links],
  })),
  available: 'Now Available',
} as const;
