import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-data-table-component":
        "react-data-table-component/dist/index.es.js",
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
