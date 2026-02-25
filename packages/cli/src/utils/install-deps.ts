import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";
import { existsSync } from "fs";
import path from "path";

const execAsync = promisify(exec);

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

/**
 * Detect which package manager is being used in the current project
 */
function detectPackageManager(): PackageManager {
  const cwd = process.cwd();
  
  if (existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

/**
 * Get the install command for a package manager
 */
function getInstallCommand(pm: PackageManager): string {
  switch (pm) {
    case "yarn":
      return "add";
    case "pnpm":
      return "add";
    case "bun":
      return "add";
    default:
      return "install";
  }
}

/**
 * Install dependencies using the detected package manager
 */
export async function installDependencies(dependencies: string[]): Promise<boolean> {
  if (!dependencies.length) return true;

  const packageManager = detectPackageManager();
  const installCmd = getInstallCommand(packageManager);
  const depsString = dependencies.join(" ");

  console.log(chalk.blue(`\n📦 Installing dependencies with ${packageManager}...`));
  console.log(chalk.gray(`   ${dependencies.join(", ")}`));

  try {
    await execAsync(`${packageManager} ${installCmd} ${depsString}`);
    console.log(chalk.green("✅ Dependencies installed successfully."));
    return true;
  } catch (error) {
    console.error(chalk.red("\n❌ Error installing dependencies automatically."));
    console.log(chalk.yellow("   Install them manually with:"));
    console.log(chalk.cyan(`   ${packageManager} ${installCmd} ${depsString}\n`));
    return false;
  }
}

/**
 * Check if dependencies are already installed
 */
export async function checkInstalledDependencies(dependencies: string[]): Promise<string[]> {
  const missing: string[] = [];
  const cwd = process.cwd();
  
  for (const dep of dependencies) {
    const depPath = path.join(cwd, "node_modules", dep);
    if (!existsSync(depPath)) {
      missing.push(dep);
    }
  }
  
  return missing;
}
