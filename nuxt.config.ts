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
    custom: {
      families: [
        {
          name: 'Nohemi',
          local: 'Nohemi',
          src: './assets/fonts/Nohemi/*.woff2',
          transform(font) {
            if (font.basename === 'Nohemi-Black') {
              font.weight = 900;
            } else if (font.basename === 'Nohemi-ExtraBold') {
              font.weight = 800;
            } else if (font.basename === 'Nohemi-Bold') {
              font.weight = 700;
            } else if (font.basename === 'Nohemi-SemiBold') {
              font.weight = 600;
            } else if (font.basename === 'Nohemi-Medium') {
              font.weight = 500;
            } else if (font.basename === 'Nohemi-Regular') {
              font.weight = 400;
            } else if (font.basename === 'Nohemi-Light') {
              font.weight = 300;
            } else if (font.basename === 'Nohemi-ExtraLight') {
              font.weight = 200;
            } else if (font.basename === 'Nohemi-Thin') {
              font.weight = 100;
            }

            return font;
          },
        },
      ],
      display: 'block',
    },
  },
});
