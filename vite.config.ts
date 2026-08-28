import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/icon-64.png",
        "icons/apple-touch-icon.png",
      ],
      manifest: {
        id: "/",
        name: "Plano Alimentar Para Lactantes",
        short_name: "Plano Lactante",
        description:
          "Cardápio, receitas e conteúdos de apoio para a nutrição no puerpério, guiado pela nutricionista Ákila Samara Castro.",
        lang: "pt-BR",
        theme_color: "#C84600",
        background_color: "#FAF8F6",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
});
