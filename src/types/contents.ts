export type ProjectHref = [Record<'en' | 'id', string>, string];
export type Projects = Record<
  string,
  {
    categories: string[];
    year: string;
    href: ProjectHref[];
    collaborator: string[];
  }
>;
