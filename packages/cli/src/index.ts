#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import ora from "ora";

// Utils
import { installDependencies, checkInstalledDependencies } from "./utils/install-deps.js";
import {
  getConfig,
  configExists,
  writeConfig,
  getComponentsDir,
  getLibDir,
  DEFAULT_CONFIG,
  CONFIG_FILE_NAME,
  type Config,
} from "./utils/get-config.js";
import {
  confirmOverwrite,
  promptInit,
  confirmInstallDependencies,
  type InitOptions,
} from "./utils/prompts.js";
import { transformImports, transformKnownPatterns } from "./utils/transform-imports.js";
import { getThemeByName, generateThemeCSS } from "./themes.js";

// Registry
import registry from "./registry.json" assert { type: "json" };

// Types
interface RegistryItem {
  name: string;
  dependencies: string[];
  registryDependencies?: string[];
  files: { name: string; content: string }[];
  type: string;
}

const program = new Command();

program
  .name("liminal")
  .description("CLI to add Liminal UI components to your project")
  .version("0.1.0");

// ============================================================================
// COMANDO INIT
// ============================================================================
program
  .command("init")
  .description("Initialize Liminal UI configuration in your project")
  .option("-y, --yes", "Use default values without prompting")
  .option("--force", "Overwrite existing configuration")
  .action(async (options) => {
    const spinner = ora();

    try {
      // Check if config already exists
      if (configExists() && !options.force) {
        console.log(chalk.yellow(`⚠️ A ${CONFIG_FILE_NAME} file already exists.`));
        console.log(chalk.gray("   Use --force to overwrite it."));
        return;
      }

      let config: Config;
      let themeOptions: { copyThemeCSS: boolean; themePreset: string; cssPath: string };

      if (options.yes) {
        // Use defaults
        config = { ...DEFAULT_CONFIG };
        console.log(chalk.blue("🔧 Using default configuration..."));

        themeOptions = {
          copyThemeCSS: true,
          themePreset: DEFAULT_CONFIG.tailwind.baseColor,
          cssPath: DEFAULT_CONFIG.tailwind.css,
        };
      } else {
        // Interactive prompts
        console.log(chalk.blue("\n🔧 Configuring Liminal UI...\n"));
        const answers: InitOptions = await promptInit();

        config = {
          ...DEFAULT_CONFIG,
          tsx: answers.useTypeScript,
          rsc: answers.useRsc,
          aliases: {
            ...DEFAULT_CONFIG.aliases,
            ui: answers.componentsPath,
            lib: answers.libPath,
            utils: `${answers.libPath}/utils`,
          },
        };

        themeOptions = {
          copyThemeCSS: answers.copyThemeCSS ?? true,
          themePreset: answers.themePreset ?? DEFAULT_CONFIG.tailwind.baseColor,
          cssPath: answers.cssPath ?? DEFAULT_CONFIG.tailwind.css,
        };
      }

      // Persist Tailwind theme info in config
      config = {
        ...config,
        tailwind: {
          ...config.tailwind,
          baseColor: themeOptions.themePreset,
          css: themeOptions.cssPath,
        },
      };

      // Write config file
      spinner.start("Writing configuration...");
      await writeConfig(config);
      spinner.succeed(`Configuration saved to ${chalk.cyan(CONFIG_FILE_NAME)}`);

      // Create directories
      const componentsDir = getComponentsDir(config);
      const libDir = getLibDir(config);

      if (!existsSync(componentsDir)) {
        mkdirSync(componentsDir, { recursive: true });
        console.log(chalk.green(`   ✅ Created: ${chalk.gray(componentsDir)}`));
      }

      if (!existsSync(libDir)) {
        mkdirSync(libDir, { recursive: true });
        console.log(chalk.green(`   ✅ Created: ${chalk.gray(libDir)}`));
      }

      // Copy theme CSS if requested
      if (themeOptions.copyThemeCSS) {
        const preset = getThemeByName(themeOptions.themePreset);
        const cssContent = generateThemeCSS(preset);
        const targetCssPath = path.resolve(process.cwd(), themeOptions.cssPath);
        const cssDir = path.dirname(targetCssPath);

        if (!existsSync(cssDir)) {
          mkdirSync(cssDir, { recursive: true });
        }

        if (existsSync(targetCssPath)) {
          const overwrite = await confirmOverwrite(targetCssPath, "CSS tokens");
          if (!overwrite) {
            console.log(chalk.gray(`   ⏭️ Skipped: ${chalk.gray(targetCssPath)}`));
          } else {
            await fs.writeFile(targetCssPath, cssContent, "utf8");
            console.log(
              chalk.green(
                `   ✅ Theme "${preset.label}" copied to ${chalk.gray(targetCssPath)}`,
              ),
            );
          }
        } else {
          await fs.writeFile(targetCssPath, cssContent, "utf8");
          console.log(
            chalk.green(
              `   ✅ Theme "${preset.label}" copied to ${chalk.gray(targetCssPath)}`,
            ),
          );
        }
      }

      console.log(chalk.green("\n✅ Liminal UI initialized successfully!"));
      console.log(chalk.gray("\n   You can now add components with:"));
      console.log(chalk.cyan("   liminal add button\n"));

    } catch (error) {
      spinner.fail("Error during initialization");
      console.error(chalk.red("❌ Error:"), error);
      process.exit(1);
    }
  });

// ============================================================================
// COMANDO ADD
// ============================================================================
program
  .command("add")
  .argument("<component>", "Component name (e.g. button)")
  .option("-y, --yes", "Install dependencies automatically without prompting")
  .option("-f, --force", "Overwrite existing components without prompting")
  .option("--no-deps", "Do not install npm dependencies")
  .option("--dry-run", "Show what would be installed without making changes")
  .description("Install a component in your project")
  .action(async (componentName, options) => {
    const spinner = ora();

    try {
      // 1. Check config exists
      const config = await getConfig();
      if (!config) {
        console.error(chalk.red(`❌ ${CONFIG_FILE_NAME} not found.`));
        console.log(chalk.gray("   Run first: liminal init"));
        process.exit(1);
      }

      // 2. Find component in registry
      const component = registry.items.find((item) => item.name === componentName) as RegistryItem | undefined;

      if (!component) {
        console.error(chalk.red(`❌ Component "${componentName}" not found in the registry.`));
        console.log(chalk.gray(`   Available components: ${registry.items.map(i => i.name).join(", ")}`));
        process.exit(1);
      }

      // 3. Collect all components to install (including registry dependencies)
      const componentsToInstall = new Set<string>();
      const allNpmDeps = new Set<string>();

      async function collectComponents(name: string): Promise<void> {
        if (componentsToInstall.has(name)) return;

        const comp = registry.items.find((item) => item.name === name) as RegistryItem | undefined;
        if (!comp) {
          console.warn(chalk.yellow(`⚠️ Internal dependency "${name}" not found in the registry.`));
          return;
        }

        // Check registry dependencies first (recursive)
        if (comp.registryDependencies && comp.registryDependencies.length > 0) {
          for (const dep of comp.registryDependencies) {
            await collectComponents(dep);
          }
        }

        // Add this component
        componentsToInstall.add(name);

        // Collect npm dependencies
        for (const dep of comp.dependencies) {
          allNpmDeps.add(dep);
        }
      }

      spinner.start(`Resolving dependencies for ${componentName}...`);
      await collectComponents(componentName);
      spinner.succeed(`${componentsToInstall.size} component(s) to install`);

      // Show what will be installed
      if (componentsToInstall.size > 1) {
        console.log(chalk.blue("\n📦 Components to install:"));
        for (const name of componentsToInstall) {
          console.log(chalk.gray(`   • ${name}`));
        }
      }

      // Dry run - just show what would happen
      if (options.dryRun) {
        console.log(chalk.yellow("\n🔍 Dry run - no changes will be made:\n"));
        console.log(chalk.gray("   Components:"));
        for (const name of componentsToInstall) {
          console.log(chalk.cyan(`     • ${name}`));
        }
        if (allNpmDeps.size > 0) {
          console.log(chalk.gray("\n   npm dependencies:"));
          console.log(chalk.cyan(`     ${Array.from(allNpmDeps).join(", ")}`));
        }
        return;
      }

      // 4. Install each component
      const componentsDir = getComponentsDir(config);
      const libDir = getLibDir(config);

      // Ensure directories exist
      if (!existsSync(componentsDir)) {
        await fs.mkdir(componentsDir, { recursive: true });
      }
      if (!existsSync(libDir)) {
        await fs.mkdir(libDir, { recursive: true });
      }

      console.log(chalk.blue("\n📝 Writing files...\n"));

      for (const name of componentsToInstall) {
        const comp = registry.items.find((item) => item.name === name) as RegistryItem;

        for (const file of comp.files) {
          let content = file.content;
          let targetPath: string;
          let displayPath: string;

          // Determine target location
          if (file.name === "utils.ts") {
            targetPath = path.join(libDir, file.name);
            displayPath = `${config.aliases.lib}/${file.name}`;
          } else {
            // Transform imports for component files
            content = transformImports(content, config);
            content = transformKnownPatterns(content, config);

            targetPath = path.join(componentsDir, file.name);
            displayPath = `${config.aliases.ui}/${file.name}`;
          }

          // Check for overwrite
          if (existsSync(targetPath) && !options.force) {
            const shouldOverwrite = await confirmOverwrite(displayPath, name);
            if (!shouldOverwrite) {
              console.log(chalk.gray(`   ⏭️ Skipped: ${displayPath}`));
              continue;
            }
          }

          await fs.writeFile(targetPath, content, "utf8");
          console.log(chalk.green(`   ✅ ${displayPath}`));
        }
      }

      // 5. Handle npm dependencies
      if (allNpmDeps.size > 0 && options.deps !== false) {
        const missingDeps = await checkInstalledDependencies(Array.from(allNpmDeps));

        if (missingDeps.length > 0) {
          console.log("");

          if (options.yes) {
            await installDependencies(missingDeps);
          } else {
            const shouldInstall = await confirmInstallDependencies(missingDeps);
            if (shouldInstall) {
              await installDependencies(missingDeps);
            } else {
              console.log(chalk.yellow("\n⚠️ Missing dependencies:"));
              console.log(chalk.cyan(`   npm install ${missingDeps.join(" ")}`));
            }
          }
        }
      }

      console.log(chalk.green(`\n✅ Installation complete!`));

    } catch (error) {
      spinner.fail("Error installing component");
      console.error(chalk.red("❌ Error:"), error);
      process.exit(1);
    }
  });

// ============================================================================
// COMANDO LIST
// ============================================================================
program
  .command("list")
  .description("List all available components")
  .action(() => {
    console.log(chalk.blue("\n📋 Available components:\n"));
    for (const item of registry.items) {
      const registryItem = item as RegistryItem;
      console.log(chalk.green(`   • ${registryItem.name}`));
      if (registryItem.dependencies.length > 0) {
        console.log(chalk.gray(`     deps: ${registryItem.dependencies.join(", ")}`));
      }
      if (registryItem.registryDependencies && registryItem.registryDependencies.length > 0) {
        console.log(chalk.cyan(`     uses: ${registryItem.registryDependencies.join(", ")}`));
      }
    }
    console.log("");
  });

// ============================================================================
// COMANDO DIFF (Nuevo - para ver cambios)
// ============================================================================
program
  .command("diff")
  .argument("<component>", "Component name")
  .description("Show differences between local component and registry version")
  .action(async (componentName) => {
    try {
      const config = await getConfig();
      if (!config) {
        console.error(chalk.red(`❌ ${CONFIG_FILE_NAME} not found.`));
        process.exit(1);
      }

      const component = registry.items.find((item) => item.name === componentName) as RegistryItem | undefined;
      if (!component) {
        console.error(chalk.red(`❌ Component "${componentName}" not found.`));
        process.exit(1);
      }

      const componentsDir = getComponentsDir(config);
      const componentFile = component.files.find(f => f.name !== "utils.ts");

      if (!componentFile) {
        console.error(chalk.red("❌ Component file not found."));
        process.exit(1);
      }

      const localPath = path.join(componentsDir, componentFile.name);

      if (!existsSync(localPath)) {
        console.log(chalk.yellow(`⚠️ Component ${componentName} is not installed locally.`));
        return;
      }

      const localContent = await fs.readFile(localPath, "utf8");
      let registryContent = componentFile.content;

      // Apply same transforms that would be applied during install
      registryContent = transformImports(registryContent, config);
      registryContent = transformKnownPatterns(registryContent, config);

      if (localContent === registryContent) {
        console.log(chalk.green(`✅ Component ${componentName} is in sync with the registry.`));
      } else {
        console.log(chalk.yellow(`⚠️ Component ${componentName} has local differences.`));
        console.log(chalk.gray("   Use 'liminal add " + componentName + " --force' to update."));
      }

    } catch (error) {
      console.error(chalk.red("❌ Error:"), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
