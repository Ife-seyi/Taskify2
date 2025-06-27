import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Taskify",
        short_name: "Taskify",
        description: "Your productivity task manager",
        theme_color: "#4FBDBA",
        background_color: "#E6F7F6",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/taskify-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/taskify-icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/taskify-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/taskify-home-540x720.png",
            sizes: "540x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
