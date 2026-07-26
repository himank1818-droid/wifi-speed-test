import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The admin panel is built separately from the public site because the
// public site uses vite-plugin-singlefile (inlines everything into one
// index.html for offline/portable use), and that plugin does not support
// multiple HTML entry points. The admin panel doesn't need single-file
// output, so it gets its own normal multi-chunk build here, merged into
// the same dist/ folder (emptyOutDir: false so it doesn't wipe the main
// site's output).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        admin: path.resolve(__dirname, "admin.html"),
      },
    },
  },
});
