import untranslated from '@/components/Navbar/contents/untranslated';
import type { Links } from '@/components/Navbar/type';

const linkTitles = {
  home: 'Utama',
  about: 'Tentang saya',
  projects: 'Projek',
  techStack: 'Teknologi',
};

export default {
  booking: 'Atur pertemuan',
  menuOpen: 'Buka',
  menuClose: 'Tutup',
  links: Object.entries(linkTitles).map(([key, value]) => ({
    title: value,
    ...untranslated.linkConfigs[key as Links],
  })),
  available: 'Tersedia sekarang',
} as const;
