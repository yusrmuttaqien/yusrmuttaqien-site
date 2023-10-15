import { MaybeComputedRef } from '@unhead/vue';
import { MetaObject } from 'nuxt/schema';

export function useMeta(metas?: MaybeComputedRef<MetaObject>) {
  useHead({
    title: 'YUSRIL MUTTAQIEN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      // @ts-ignore
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon.png' },
    ],
    ...metas,
  });
}
