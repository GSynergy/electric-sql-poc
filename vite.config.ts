import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [react()],
  envPrefix: "ELECTRIC_",
  optimizeDeps: {
    exclude: ["wa-sqlite", "@sqlite.org/sqlite-wasm", "src/mysql/index"],
  },
});
