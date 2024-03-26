import shared from '@/app/contents/footer/shared';
import { masteries, projects } from '@/app/contents/shared/id';

const footerHeader = {
  subtitle: 'Mari bekerjasama',
  title: 'Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue.',
};
const footerLinksTitles = {
  Sitemaps: 'Peta situs',
  Socials: 'Sosial',
  Hero: 'Pembuka',
  Masteries: masteries,
  Projects: projects,
};
const copyright = 'Hak cipta @ yusr.muttaqien 2024';

const all = { ...shared, footerHeader, footerLinksTitles, copyright };
export default all;
