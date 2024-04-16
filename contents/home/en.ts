import { masteries as masteriesId, projects as projectsId } from '@/contents/shared/en';
import { projects as projectsList } from '@/contents/shared/untranslated';
import { projectTypes } from '@/contents/shared/en';
import { howSteps } from '@/contents/home/untranslated';

const hero = { tagline: 'Frontend developer | UI/UX designer' };
const masteries = {
  subtitle: masteriesId,
  title:
    'Eager in learning and applying (especially) web technologies. Aiming to create a better user experiences for everyone through toughtfull UI/UX and motion designs.',
  masteries: [
    {
      title: 'Frontend developer',
      contents: [
        'Creating responsive and interactive web applications.',
        'Using modern web technologies to create a better user experience.',
        'Optimizing web performance and accessibility.',
      ],
    },
    {
      title: 'UI/UX designer',
      contents: [
        'Craft an flexible and intuitive user interface design.',
        'Designing motion graphics and animations.',
        'Creating a seamless user experience.',
      ],
    },
  ],
  marquee: 'The devil is in the details 😈',
};
const projects = {
  title: projectsId.injectable,
  subtitle: 'Ranging from what i do for work to my own projects.',
  card: {
    singular: 'A',
  },
  projects: projectsList(projectTypes),
};
const how = {
  header: {
    title: 'See how i roll',
    subtitle: 'Working holistically, from top to bottom. Make sure not to regret it midway.',
  },
  hows: howSteps({
    command:
      'Define what is the problem and what is the goal. Make sure to understand the proble thoroughly.',
    options: 'Discover the possible solutions and choose the best one.',
    control: 'Start the project and make sure it is on the right track.',
  }),
};

export default { hero, masteries, projects, how };
