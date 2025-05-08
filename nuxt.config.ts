import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "万博2025のパビリオンをティア表でまとめよう。お気に入りのパビリオンをランク付けして共有できます。",
        },
        { name: "theme-color", content: "#e60012" },
        { property: "og:title", content: "ばんぱく！Tier メーカー" },
        {
          property: "og:description",
          content: "お気に入りのパビリオンをランク付けして共有しよう！",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/ogp.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "ばんぱく！Tier メーカー" },
        {
          name: "twitter:description",
          content: "お気に入りのパビリオンをランク付けして共有しよう！",
        },
        { name: "twitter:image", content: "/ogp.png" },
      ],
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
