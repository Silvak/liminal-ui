import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/main.js"),
        "Button/Button": resolve(__dirname, "src/Button/Button.jsx"),
        "Text/Text": resolve(__dirname, "src/Text/Text.jsx"),
        "Stack/Stack": resolve(__dirname, "src/Stack/Stack.jsx"),
      },
      formats: ["es"],
      fileName: (format, entryName) => {
        if (entryName === "index") {
          return "techno-components.js";
        }
        return `${entryName}.js`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        preserveModules: false,
        assetFileNames: "techno-components[extname]",
      },
    },
  },
});
