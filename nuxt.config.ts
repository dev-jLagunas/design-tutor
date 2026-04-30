import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxtjs/color-mode", "@nuxt/icon", "@pinia/nuxt"],
  colorMode: {
    classSuffix: "",
  },
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    preset: "netlify",
  },
  ssr: false,
});
clearInterval;