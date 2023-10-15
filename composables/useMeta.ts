import { MaybeComputedRef } from '@unhead/vue';
import { MetaObject } from 'nuxt/schema';

export function useMeta(metas?: MaybeComputedRef<MetaObject>) {
  useHead({
    title: 'YUSRIL MUTTAQIEN - Software Engineer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ...metas,
  });
}
