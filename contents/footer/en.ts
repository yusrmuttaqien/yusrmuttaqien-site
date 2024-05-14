import { masteries, projects, threeSteps } from '@/contents/shared/en';
import { sites, internets } from '@/contents/footer/untranslated';
import { email } from '@/contents/shared/untranslated';

const contact = {
  desktop: '<space> Click once to sent me an email <space> Click & hold to copy email address',
  mobile: '<space> Tap once to sent me an email <space> Tap & hold to copy email address',
  copied: "Email copied! Let's chat!",
  email,
};
const contents = {
  site: {
    title: 'Site',
    content: sites({ masteries, threeSteps, projects: projects.string }),
  },
  about: {
    title: 'About',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, laboriosam! Sit corporis, mollitia quibusdam neque illum beatae quas, eaque nulla voluptas exercitationem nihil eum earum soluta labore dicta quae nisi?',
  },
  internets: {
    title: 'Internets',
    content: internets,
  },
  tagline: 'Built in Malang with Next.js 14 - @2024',
};

const footerEn = { contact, contents };
export default footerEn;
