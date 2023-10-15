// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['unplugin-fonts/nuxt'],
  devServer: {
    port: 8000,
  },
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
    custom: {
      families: [
        {
          name: 'Nohemi',
          local: 'Nohemi',
          src: './assets/fonts/Nohemi/*.woff2',
          transform(font) {
            if (font.basename === 'Nohemi-Black') {
              font.weight = 900;
            } else if (font.basename === 'Nohemi-Regular') {
              font.weight = 400;
            } else if (font.basename === 'Nohemi-Light') {
              font.weight = 300;
            }

            return font;
          },
        },
      ],
      display: 'block',
    },
  },
});
