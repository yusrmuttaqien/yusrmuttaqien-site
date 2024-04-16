import type { ProjectTypes } from '@/types/content';
import type { ProjectsCardProps } from '@/types/home';

export function projects(types: ProjectTypes): ProjectsCardProps['content'][] {
  return [
    { title: 'find-movie', type: types.webapp, image: 'https://source.unsplash.com/random' },
    { title: 'mini-apps', type: types.webapp, image: 'https://source.unsplash.com/random' },
    { title: 'dashboard', type: types.webapp, image: 'https://source.unsplash.com/random' },
    { title: 'laporkeun', type: types.webapp, image: 'https://source.unsplash.com/random' },
  ];
}
