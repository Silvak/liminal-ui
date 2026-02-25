import prompts from "prompts";
import chalk from "chalk";

// ============================================================================
// CONFIRM OVERWRITE
// ============================================================================
export async function confirmOverwrite(
  filePath: string,
  componentName: string
): Promise<boolean> {
  const response = await prompts({
    type: "confirm",
    name: "overwrite",
    message: `Component ${chalk.cyan(componentName)} already exists at ${chalk.gray(filePath)}. Overwrite?`,
    initial: false,
  });

  // Handle Ctrl+C
  if (response.overwrite === undefined) {
    console.log(chalk.yellow("\n⚠️ Operation cancelled."));
    process.exit(0);
  }

  return response.overwrite;
}

// ============================================================================
// CONFIRM INSTALL DEPENDENCIES
// ============================================================================
export async function confirmInstallDependencies(
  dependencies: string[]
): Promise<boolean> {
  const response = await prompts({
    type: "confirm",
    name: "install",
    message: `Install ${dependencies.length} missing dependency/dependencies?`,
    initial: true,
  });

  if (response.install === undefined) {
    return false;
  }

  return response.install;
}

// ============================================================================
// SELECT COMPONENTS
// ============================================================================
export async function selectComponents(
  available: string[],
  message: string = "Select components to install:"
): Promise<string[]> {
  const response = await prompts({
    type: "multiselect",
    name: "components",
    message,
    choices: available.map(name => ({
      title: name,
      value: name,
    })),
    hint: "- Space to select, Enter to confirm",
  });

  if (response.components === undefined) {
    console.log(chalk.yellow("\n⚠️ Operation cancelled."));
    process.exit(0);
  }

  return response.components;
}

// ============================================================================
// INIT PROMPTS
// ============================================================================
export interface InitOptions {
  componentsPath: string;
  libPath: string;
  useTypeScript: boolean;
  useRsc: boolean;
  copyThemeCSS?: boolean;
  themePreset?: string;
  cssPath?: string;
}

export async function promptInit(): Promise<InitOptions> {
  const response = await prompts([
    {
      type: "text",
      name: "componentsPath",
      message: "Where do you want to install UI components?",
      initial: "@/components/ui",
    },
    {
      type: "text",
      name: "libPath",
      message: "Where do you want to install utilities (lib)?",
      initial: "@/lib",
    },
    {
      type: "confirm",
      name: "useTypeScript",
      message: "Use TypeScript?",
      initial: true,
    },
    {
      type: "confirm",
      name: "useRsc",
      message: "Use React Server Components?",
      initial: true,
    },
    {
      type: "confirm",
      name: "copyThemeCSS",
      message: "Copy base token CSS (recommended)?",
      initial: true,
    },
    {
      type: (prev) => (prev ? "select" : null),
      name: "themePreset",
      message: "Choose a color preset:",
      choices: [
        { title: "Slate (default)", value: "slate" },
        { title: "Blue", value: "blue" },
        { title: "Green", value: "green" },
      ],
      initial: 0,
    },
    {
      type: (_prev, values) => (values.copyThemeCSS ? "text" : null),
      name: "cssPath",
      message: "Path to global CSS file:",
      initial: "app/globals.css",
    },
  ]);

  // Handle Ctrl+C
  if (!response.componentsPath) {
    console.log(chalk.yellow("\n⚠️ Operation cancelled."));
    process.exit(0);
  }

  return {
    componentsPath: response.componentsPath,
    libPath: response.libPath,
    useTypeScript: response.useTypeScript ?? true,
    useRsc: response.useRsc ?? true,
    copyThemeCSS: response.copyThemeCSS ?? true,
    themePreset: response.themePreset ?? "slate",
    cssPath: response.cssPath ?? "app/globals.css",
  };
}
