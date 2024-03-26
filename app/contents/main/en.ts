import { masteries, projects } from '@/app/contents/shared/en';
import type { MainMasteriesArticleProps, MainProjectsCardProps } from '@/app/types/main';
import type { Optional } from '@/app/utils/ts-helper';

// #region hero
const tagline = 'Frontend developer | UIUX designer';
// #endregion

// #region mastery
const masteryHeader = {
  subtitle: masteries,
  title: 'Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue.',
};
const masteryLists: MainMasteriesArticleProps[] = [
  {
    title: 'Frontend developer',
    contents: [
      'Lorem ipsum dolor sit amet consectetur.',
      'Natoque a massa non massa urna feugiat sit purus. Habitant pulvinar ultricies eget pellentesque amet aliquam. Mauris ornare egestas penatibus id sed vitae in magna nulla. Faucibus tortor dui non sed imperdiet consectetur risus lorem scelerisque.',
      'Magna mattis tristique a elit mauris ultricies nisi eget sed. Sit sit facilisi eget habitant nunc nulla cras pellentesque nisl. Quisque sed ullamcorper arcu imperdiet. Id et sed tincidunt proin aliquet nec. Mattis duis urna amet mauris ut eu odio. Vitae urna pharetra feugiat.',
    ],
  },
  {
    title: 'UIUX designer',
    contents: [
      'Lorem ipsum dolor sit amet consectetur.',
      'Natoque a massa non massa urna feugiat sit purus. Habitant pulvinar ultricies eget pellentesque amet aliquam. Mauris ornare egestas penatibus id sed vitae in magna nulla. Faucibus tortor dui non sed imperdiet consectetur risus lorem scelerisque.',
      'Magna mattis tristique a elit mauris ultricies nisi eget sed. Sit sit facilisi eget habitant nunc nulla cras pellentesque nisl. Quisque sed ullamcorper arcu imperdiet. Id et sed tincidunt proin aliquet nec. Mattis duis urna amet mauris ut eu odio. Vitae urna pharetra feugiat.',
    ],
  },
];
// #endregion

// #region projects
const projectsHeader = {
  subtitle: projects,
  title: 'Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue.',
};
export const projectsPagination = {
  list: 'List',
  previousList: 'Previous list',
  nextList: 'Next list',
};
const projectLists: Optional<MainProjectsCardProps, 'idx'>[] = [
  {
    children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non augue condimentum, rutrum dolor vitae, finibus mi. Sed accumsan placerat rhoncus. Morbi dui lectus, mollis at efficitur vel, vehicula vitae ante. Phasellus consectetur ante sit amet orci convallis cursus. Sed eget consequat risus. Vestibulum varius lectus volutpat, accumsan erat eget, porta libero. Suspendisse posuere mattis lacus, at sodales metus. Donec lacinia nec nunc id suscipit.
  
      Proin imperdiet sapien molestie tincidunt pellentesque. Sed eu nunc sit amet lectus sodales interdum id vel risus. Fusce consectetur sit amet urna at lacinia. Mauris semper pharetra diam, vel efficitur diam luctus vel. Donec maximus lacus non efficitur scelerisque. Curabitur ligula elit, placerat ac efficitur mattis, varius vitae leo. Nam imperdiet feugiat urna sed sagittis.
      
      Curabitur vehicula consequat metus. Proin sem nunc, finibus vitae pellentesque at, pellentesque et neque. Sed massa purus, pellentesque non congue eget, bibendum consectetur dui. Vestibulum augue ligula, rutrum et lorem in, rutrum sagittis nisl. Donec imperdiet dolor id tellus tempor sagittis. Aliquam blandit elit et diam mattis tempus. Duis sit amet erat sit amet diam laoreet mattis et non urna. Nunc sit amet placerat lectus. Cras vehicula libero euismod ultricies tincidunt. Donec consequat ligula et metus ultrices accumsan.
      
      In molestie lectus viverra imperdiet pharetra. Suspendisse eu augue iaculis, commodo ex ac, suscipit augue. Curabitur ultrices urna arcu, vitae auctor neque congue eget. Aliquam nibh velit, molestie eget arcu nec, lobortis pellentesque libero. Nullam congue imperdiet tortor, ut faucibus purus vestibulum non. Etiam dignissim lacus nec sem iaculis venenatis. Suspendisse eget leo vitae augue varius lobortis quis ac risus. Morbi aliquet venenatis dolor, in auctor urna vehicula nec.
      
      Phasellus eu mauris justo. Phasellus mauris metus, finibus sit amet scelerisque et, dictum pharetra mi. Nulla vitae pharetra nunc. Donec posuere elementum elit, eu varius neque ultrices ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum facilisis justo et dolor congue, ac blandit augue tempor. Donec vitae mattis sapien. Donec quis odio vel felis mattis tristique. Cras aliquet nisi ac diam consequat viverra. Suspendisse eu libero eget odio faucibus mollis nec at tellus.`,
    tags: ['hello', 'world'],
    title: 'hello',
  },
];
// #endregion

const all = {
  tagline,
  masteryLists,
  projectLists,
  masteryHeader,
  projectsHeader,
  projectsPagination,
};
export default all;
