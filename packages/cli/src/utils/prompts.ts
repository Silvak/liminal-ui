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
    message: `El componente ${chalk.cyan(componentName)} ya existe en ${chalk.gray(filePath)}. ¿Quieres sobreescribirlo?`,
    initial: false,
  });

  // Handle Ctrl+C
  if (response.overwrite === undefined) {
    console.log(chalk.yellow("\n⚠️ Operación cancelada."));
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
    message: `¿Quieres instalar ${dependencies.length} dependencia(s) faltante(s)?`,
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
  message: string = "Selecciona los componentes a instalar:"
): Promise<string[]> {
  const response = await prompts({
    type: "multiselect",
    name: "components",
    message,
    choices: available.map(name => ({
      title: name,
      value: name,
    })),
    hint: "- Espacio para seleccionar, Enter para confirmar",
  });

  if (response.components === undefined) {
    console.log(chalk.yellow("\n⚠️ Operación cancelada."));
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
}

export async function promptInit(): Promise<InitOptions> {
  const response = await prompts([
    {
      type: "text",
      name: "componentsPath",
      message: "¿Dónde quieres instalar los componentes UI?",
      initial: "@/components/ui",
    },
    {
      type: "text",
      name: "libPath",
      message: "¿Dónde quieres instalar las utilidades (lib)?",
      initial: "@/lib",
    },
    {
      type: "confirm",
      name: "useTypeScript",
      message: "¿Usar TypeScript?",
      initial: true,
    },
    {
      type: "confirm",
      name: "useRsc",
      message: "¿Usar React Server Components?",
      initial: true,
    },
  ]);

  // Handle Ctrl+C
  if (!response.componentsPath) {
    console.log(chalk.yellow("\n⚠️ Operación cancelada."));
    process.exit(0);
  }

  return {
    componentsPath: response.componentsPath,
    libPath: response.libPath,
    useTypeScript: response.useTypeScript ?? true,
    useRsc: response.useRsc ?? true,
  };
}
