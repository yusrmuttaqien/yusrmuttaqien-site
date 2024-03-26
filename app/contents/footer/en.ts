import shared from '@/app/contents/footer/shared';
import { masteries, projects } from '@/app/contents/shared/en';

const footerHeader = {
  subtitle: "Let's work together",
  title: 'Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue.',
};
export const footerLinksTitles = {
  Sitemaps: 'Sitemaps',
  Socials: 'Socials',
  Hero: 'Hero',
  Masteries: masteries,
  Projects: projects,
};
const copyright = 'Copyright @ yusr.muttaqien 2024';

const all = { ...shared, footerHeader, footerLinksTitles, copyright };
export default all;
