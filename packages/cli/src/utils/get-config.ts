import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { z } from "zod";

// ============================================================================
// CONFIG SCHEMA
// ============================================================================
export const configSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("default"),
  rsc: z.boolean().default(true),
  tsx: z.boolean().default(true),
  tailwind: z.object({
    config: z.string().default("tailwind.config.js"),
    css: z.string().default("app/globals.css"),
    baseColor: z.string().default("slate"),
    cssVariables: z.boolean().default(true),
  }).default({}),
  aliases: z.object({
    components: z.string().default("@/components"),
    utils: z.string().default("@/lib/utils"),
    ui: z.string().default("@/components/ui"),
    lib: z.string().default("@/lib"),
  }).default({}),
});

export type Config = z.infer<typeof configSchema>;

// ============================================================================
// CONFIG FILE NAME
// ============================================================================
export const CONFIG_FILE_NAME = "components.json";

// ============================================================================
// DEFAULT CONFIG
// ============================================================================
export const DEFAULT_CONFIG: Config = {
  style: "default",
  rsc: true,
  tsx: true,
  tailwind: {
    config: "tailwind.config.js",
    css: "app/globals.css",
    baseColor: "slate",
    cssVariables: true,
  },
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    lib: "@/lib",
  },
};

// ============================================================================
// RESOLVE CONFIG PATH
// ============================================================================
export function resolveConfigPath(cwd: string = process.cwd()): string {
  return path.join(cwd, CONFIG_FILE_NAME);
}

// ============================================================================
// CHECK IF CONFIG EXISTS
// ============================================================================
export function configExists(cwd: string = process.cwd()): boolean {
  return existsSync(resolveConfigPath(cwd));
}

// ============================================================================
// READ CONFIG
// ============================================================================
export async function getConfig(cwd: string = process.cwd()): Promise<Config | null> {
  const configPath = resolveConfigPath(cwd);

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const content = await fs.readFile(configPath, "utf8");
    const json = JSON.parse(content);
    return configSchema.parse(json);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid config file at ${configPath}:\n${error.errors.map(e => `  - ${e.path.join(".")}: ${e.message}`).join("\n")}`
      );
    }
    throw error;
  }
}

// ============================================================================
// RESOLVE COMPONENT PATH FROM ALIAS
// ============================================================================
export function resolveAliasPath(alias: string, cwd: string = process.cwd()): string {
  // Handle @ alias (common in Next.js, Vite, etc.)
  if (alias.startsWith("@/")) {
    const srcDir = path.join(cwd, "src");
    const baseDir = existsSync(srcDir) ? srcDir : cwd;
    return path.join(baseDir, alias.slice(2)); // Remove @/ prefix
  }

  // Handle ~/ alias (some projects use this)
  if (alias.startsWith("~/")) {
    return path.join(cwd, alias.slice(2));
  }

  // Assume relative path
  return path.join(cwd, alias);
}

// ============================================================================
// GET COMPONENT TARGET DIRECTORY
// ============================================================================
export function getComponentsDir(config: Config, cwd: string = process.cwd()): string {
  return resolveAliasPath(config.aliases.ui, cwd);
}

// ============================================================================
// GET LIB TARGET DIRECTORY
// ============================================================================
export function getLibDir(config: Config, cwd: string = process.cwd()): string {
  return resolveAliasPath(config.aliases.lib, cwd);
}

// ============================================================================
// WRITE CONFIG
// ============================================================================
export async function writeConfig(config: Config, cwd: string = process.cwd()): Promise<void> {
  const configPath = resolveConfigPath(cwd);
  const content = JSON.stringify(config, null, 2);
  await fs.writeFile(configPath, content, "utf8");
}
