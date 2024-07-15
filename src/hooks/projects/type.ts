import GLOBAL_UNTRANSLATED from '@/contents/untranslated';
import type { Project } from '@/types/contents';
import type { EnumFromObjectKeys } from '@/types/utils';

export type ProjectsParams = {
  filter?: (
    sample: EnumFromObjectKeys<typeof GLOBAL_UNTRANSLATED.projects>,
    value: Project,
    index: number,
    array: Project[]
  ) => boolean;
  limit?: number;
};
