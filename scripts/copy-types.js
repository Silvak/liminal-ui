import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Copy custom type definitions to dist
const typeFiles = [
  { src: "src/Button/Button.d.ts", dest: "dist/Button/Button.d.ts" },
  { src: "src/Text/Text.d.ts", dest: "dist/Text/Text.d.ts" },
  { src: "src/Stack/Stack.d.ts", dest: "dist/Stack/Stack.d.ts" },
  { src: "src/index.d.ts", dest: "dist/main.d.ts" },
];

typeFiles.forEach(({ src, dest }) => {
  const srcPath = join(rootDir, src);
  const destPath = join(rootDir, dest);

  try {
    mkdirSync(dirname(destPath), { recursive: true });
    copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`✗ Failed to copy ${src}:`, error.message);
  }
});

console.log("\n✨ Type definitions copied successfully!");
