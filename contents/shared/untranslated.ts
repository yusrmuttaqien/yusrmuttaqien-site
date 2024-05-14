import type { ProjectShape } from '@/types/content';
import type { ProjectsCardProps } from '@/types/home';

export function projects(props: ProjectShape): ProjectsCardProps['content'][] {
  const { webapp } = props;

  return [
    {
      title: 'find-movie',
      type: webapp,
      image: 'https://source.unsplash.com/random',
    },
    {
      title: 'mini-apps',
      type: webapp,
      image: 'https://source.unsplash.com/random',
    },
    {
      title: 'dashboard',
      type: webapp,
      image: 'https://source.unsplash.com/random',
    },
    {
      title: 'laporkeun',
      type: webapp,
      image: 'https://source.unsplash.com/random',
    },
  ];
}
export const email = 'idyusril@gmail.com';
