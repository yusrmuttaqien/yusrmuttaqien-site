import { useRouter } from 'next/router';
import Trans from '@/components/Trans';
import id from '@/components/pages/index/Projects/content/id';
import en from '@/components/pages/index/Projects/content/en';
import untranslated from '@/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';
import type { TransComp } from '@/components/Trans/type';

export default function useContent() {
  const { locale } = useRouter();
  const options = { en, id };
  const { projects } = untranslated;
  const contents = {
    projects: Object.entries(projects).map(([key, { categories, ...rest }]) => ({
      ...rest,
      category: categories.map((category) => category[(locale as i18nLocales) || defaulti18n]),
      title: <Trans string={key} name={`project-${key}-title-${key}`} comps={COMP()} />,
    })),
    ...options[(locale as i18nLocales) || defaulti18n],
  };

  return contents;
}

function COMP(override?: string): TransComp {
  return {
    default: (value, id) => (
      <span key={id} className="text-dynamic-green">
        {override || value}
      </span>
    ),
  };
}
