export type Projects = Record<
  string,
  {
    categories: string[];
    year: string;
    href: string;
    collaborator: string[];
  }
>;
