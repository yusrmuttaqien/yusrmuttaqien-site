import { useRouter } from 'next/router';
import Trans from '@/components/Trans';
import id from '@/components/Projects/content/id';
import en from '@/components/Projects/content/en';
import globalId from '@/contents/id';
import globalEn from '@/contents/en';
import untranslated from '@/contents/untranslated';
import { defaulti18n } from '@/constants/i18n';
import type { i18nLocales } from '@/types/i18n';
import type { TransComp } from '@/components/Trans/type';

export default function useContent() {
  const { locale } = useRouter();
  const globalOptions = { en: globalEn, id: globalId };
  const options = { en, id };
  const { projects } = untranslated;
  const { projectCollabTypes, projectTypes } =
    globalOptions[(locale as i18nLocales) || defaulti18n];
  const contents = {
    projects: Object.entries(projects).map(([key, { collaborator, categories, ...rest }]) => ({
      ...rest,
      collaborator: (
        <Trans
          string={projectCollabTypes[collaborator[0] as keyof typeof projectCollabTypes]}
          name={`project-${key}-collab-${collaborator[1]}`}
          comps={COMP(collaborator[1])}
        />
      ),
      category: projectTypes[categories[0] as keyof typeof projectTypes],
      title: <Trans string={key} name={`project-${key}-title-${key}`} comps={COMP()} />,
      alt: `project-${key.replace('<', '').replace('>', '')}-preview`,
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
