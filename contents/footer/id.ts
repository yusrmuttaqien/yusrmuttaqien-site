import { masteries, projects, threeSteps } from '@/contents/shared/en';
import { sites, internets } from '@/contents/footer/untranslated';
import { email } from '@/contents/shared/untranslated';

const contact = {
  desktop: '<space> Klik sekali untuk kirim surel <space> Klik & tahan untuk menyalin alamat surel',
  mobile:
    '<space> Tekan sekali untuk kirim surel <space> Tekan & tahan untuk menyalin alamat surel',
  copied: 'Surel disalin! Ayo ngobrol!',
  email,
};
const contents = {
  site: {
    title: 'Situs',
    content: sites({ masteries, threeSteps, projects: projects.string }),
  },
  about: {
    title: 'Tentang',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, laboriosam! Sit corporis, mollitia quibusdam neque illum beatae quas, eaque nulla voluptas exercitationem nihil eum earum soluta labore dicta quae nisi?',
  },
  internets: {
    title: 'Internet',
    content: internets,
  },
  tagline: 'Dibuat di Malang dengan Next.js 14 - @2024',
};

const footerEn = { contact, contents };
export default footerEn;
