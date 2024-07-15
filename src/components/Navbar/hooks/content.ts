import useProjects from '@/hooks/projects';
import currentI18n from '@/utils/currentI18n';
import globalEn from '@/contents/en';
import globalId from '@/contents/id';
import en from '@/components/Navbar/contents/en';
import id from '@/components/Navbar/contents/id';
import untranslated from '@/components/Navbar/contents/untranslated';

export default function useContent() {
  const { count } = useProjects();
  const options = { en, id };
  const { sitemapsConfig } = untranslated;
  const globalOptions = { en: globalEn, id: globalId };
  const { sitemapsTitle } = globalOptions[currentI18n()];
  const contents = {
    ...options[currentI18n()],
    sitemaps: Object.entries(sitemapsConfig).map(([key, value]) => ({
      title: sitemapsTitle[key as keyof typeof sitemapsTitle],
      ...value,
    })),
  };
  contents.sitemaps = contents.sitemaps.map((sitemap) => {
    if (sitemap.title !== sitemapsTitle.projects) return sitemap;

    return {
      ...sitemap,
      title: `${sitemap.title} (${count.all})`,
    };
  });

  return contents;
}
