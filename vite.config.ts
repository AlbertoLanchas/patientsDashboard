import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  server: {
    port: 4100,
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  test: {
    environment: "jsdom", // importante para testear componentes
    globals: true, // para no tener que importar describe/it/expect
    setupFiles: "./src/setupTests", // opcional si querés configuración global
  },
});
