import { BASE_URL, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from './constants/meta';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/fontaine', '@nuxtjs/google-fonts'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: DEFAULT_TITLE,
      meta: [
        { name: 'description', content: DEFAULT_DESCRIPTION },
        { property: 'og:title', content: DEFAULT_TITLE },
        { property: 'og:url', content: BASE_URL },
        { property: 'og:image', content: `${BASE_URL}favicon.png` },
        { property: 'og:description', content: DEFAULT_DESCRIPTION },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon.png' },
      ],
    },
  },
  alias: {
    '@Constants': `./constants`,
    '@Styles': `./styles`,
    '@Types': `./types`,
  },
  googleFonts: {
    families: {
      Notable: true,
      'Plus Jakarta Sans': {
        wght: [500, 700, 400, 200],
      },
      'Libre Barcode 128': true,
    },
  },
  fontMetrics: {
    fonts: ['Plus Jakarta Sans', 'Notable', 'Libre Barcode 128'],
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@Styles/_variables.scss" as var;',
        },
      },
    },
  },
});
