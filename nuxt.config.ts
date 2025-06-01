// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: [],
    autoImport: true,
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: process.env.NODE_ENV === "development" }, // Disable in production
  css: ["~/assets/css/global.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  modules: ["shadcn-nuxt"],
  runtimeConfig: {
    public: { 
      apiUrl: process.env.NUXT_API_URL || "http://localhost:3001/api",
    },
  },
  nitro: {
    preset: 'vercel',
    routeRules: {
      '/**': { swr: false }
    }
  }
});