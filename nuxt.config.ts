// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  imports: {
    dirs: [],
    autoImport: true,
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [],
  },
});
