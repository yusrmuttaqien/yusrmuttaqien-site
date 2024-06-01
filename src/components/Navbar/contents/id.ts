import untranslated from '@/components/Navbar/contents/untranslated';
import type { Links } from '@/components/Navbar/type';

const sitemapsTitle = {
  home: 'Utama',
  about: 'Tentang saya',
  projects: 'Projek',
  techStack: 'Teknologi',
};

export default {
  booking: 'Atur pertemuan',
  menuOpen: 'Buka',
  menuClose: 'Tutup',
  sitemaps: Object.entries(sitemapsTitle).map(([key, value]) => ({
    title: value,
    ...untranslated.sitemapsConfig[key as Links],
  })),
  available: 'Tersedia sekarang',
} as const;
