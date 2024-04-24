import { masteries as masteriesId, projects as projectsId } from '@/contents/shared/id';
import { projects as projectsList } from '@/contents/shared/untranslated';
import { projectTypes } from '@/contents/shared/id';
import { howSteps } from '@/contents/home/untranslated';

const hero = { tagline: 'Pengembang | Desainer Antarmuka' };
const masteries = {
  header: {
    subtitle: masteriesId,
    title:
      'Bersemangat dalam mempelajari dan menerapkan (terutama) teknologi web. Bertujuan untuk menciptakan pengalaman pengguna yang lebih baik bagi semua orang melalui UI/UX dan desain gerak yang canggih.',
  },
  masteries: [
    {
      title: 'Pengembang antarmuka',
      contents: [
        'Membuat aplikasi web yang responsif dan interaktif.',
        'Menggunakan teknologi web modern untuk menciptakan pengalaman pengguna yang lebih baik.',
        'Mengoptimalkan kinerja dan aksesibilitas web.',
      ],
    },
    {
      title: 'Desainer antarmuka',
      contents: [
        'Buat desain antarmuka pengguna yang fleksibel dan intuitif.',
        'Merancang grafis gerak dan animasi.',
        'Menciptakan pengalaman pengguna yang lancar.',
      ],
    },
  ],
  marquee: 'Iblis ada dalam detailnya 😈',
};
const projects = {
  header: {
    title: projectsId.injectable + 'an',
    subtitle: 'Mulai dari projek kontrak hingga personal.',
  },
  card: {
    singular: 'Sebuah',
  },
  allProjects: 'Lihat semua projek',
  projects: projectsList(projectTypes),
};
const how = {
  header: {
    title: 'Tiga langkah',
    subtitle:
      'Bekerja secara holistik, dari atas ke bawah. Pastikan untuk tidak menyesalinya di tengah jalan.',
  },
  hows: howSteps({
    command:
      'Tentukan apa masalahnya dan apa tujuannya. Pastikan untuk memahami masalahnya secara menyeluruh.',
    options: 'Temukan solusi yang mungkin dan pilih yang terbaik.',
    control: 'Mulai proyek dan pastikan berada di jalur yang benar.',
  }),
};

export default { hero, masteries, projects, how };
