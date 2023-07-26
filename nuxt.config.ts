// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['unplugin-fonts/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/_variables.scss" as var;',
        },
      },
    },
  },
  unfonts: {
    google: {
      families: [
        {
          name: 'Plus Jakarta Sans',
          styles: 'wght@600;700;800',
        },
      ],
    },
    custom: {
      families: [
        {
          name: 'Mango Grotesque',
          local: 'Mango Grotesque',
          src: './public/fonts/MangoGrotesque-Black.woff2',
          transform(font) {
            if (font.basename === 'MangoGrotesque-Black') {
              font.weight = 900;
            }

            return font;
          },
        },
        {
          name: 'Taruno Wide',
          local: 'Taruno Wide',
          src: './public/fonts/TarunoWide-Medium.woff2',
          transform(font) {
            if (font.basename === 'TarunoWide-Medium') {
              font.weight = 500;
            }

            return font;
          },
        },
      ],
    },
  },
});
