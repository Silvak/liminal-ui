import { build } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

console.log("Building UMD bundle...\n");

await build({
  root: rootDir,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(rootDir, "src/main.js"),
      name: "LiminalUI",
      fileName: "liminal-ui",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});

console.log("\n✨ UMD bundle built successfully!");
