import type { StaticImageData } from 'next/image';

export type ProjectHref = [Record<'en' | 'id', string>, string];
export type Projects = Record<
  string,
  {
    categories: string[];
    year: string;
    href: ProjectHref[];
    collaborator: string[];
    src: string | StaticImageData;
  }
>;
