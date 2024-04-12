import { masteries as masteriesId, projects as projectsId } from '@/contents/shared/id';

const hero = { tagline: 'Pengembang | Desainer Antarmuka' };
const masteries = {
  subtitle: masteriesId,
  title: 'Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue.',
  masteries: [
    {
      title: 'Pengembang antarmuka',
      contents: [
        'Lorem ipsum dolor sit amet consectetur.',
        'Natoque a massa non massa urna feugiat sit purus. Habitant pulvinar ultricies eget pellentesque amet aliquam. Mauris ornare egestas penatibus id sed vitae in magna nulla. Faucibus tortor dui non sed imperdiet consectetur risus lorem scelerisque.',
        'Magna mattis tristique a elit mauris ultricies nisi eget sed. Sit sit facilisi eget habitant nunc nulla cras pellentesque nisl. Quisque sed ullamcorper arcu imperdiet. Id et sed tincidunt proin aliquet nec. Mattis duis urna amet mauris ut eu odio. Vitae urna pharetra feugiat.',
      ],
    },
    {
      title: 'Desainer antarmuka',
      contents: [
        'Lorem ipsum dolor sit amet consectetur.',
        'Natoque a massa non massa urna feugiat sit purus. Habitant pulvinar ultricies eget pellentesque amet aliquam. Mauris ornare egestas penatibus id sed vitae in magna nulla. Faucibus tortor dui non sed imperdiet consectetur risus lorem scelerisque.',
        'Magna mattis tristique a elit mauris ultricies nisi eget sed. Sit sit facilisi eget habitant nunc nulla cras pellentesque nisl. Quisque sed ullamcorper arcu imperdiet. Id et sed tincidunt proin aliquet nec. Mattis duis urna amet mauris ut eu odio. Vitae urna pharetra feugiat.',
      ],
    },
  ],
};
const projects = {
  title: projectsId.injectable + 'an',
  subtitle: 'Mulai dari apa yang saya lakukan untuk pekerjaan hingga proyek saya sendiri.',
  card: {
    singular: 'Sebuah',
  },
  projects: [
    { title: 'find-movie', type: 'aplikasi web', image: 'https://source.unsplash.com/random' },
    { title: 'mini-apps', type: 'aplikasi web', image: 'https://source.unsplash.com/random' },
    { title: 'dashboard', type: 'aplikasi web', image: 'https://source.unsplash.com/random' },
    { title: 'laporkeun', type: 'aplikasi web', image: 'https://source.unsplash.com/random' },
  ],
};

export default { hero, masteries, projects };
