#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";

// Importamos el registro generado. 
// TypeScript podría quejarse si el archivo no existe aún. 
// Asegúrate de correr 'npm run build:registry' antes.
import registry from "./registry.json" assert { type: "json" };

const program = new Command();

program
  .name("liminal")
  .description("CLI para agregar componentes de Liminal UI")
  .version("0.0.2");

// --- COMANDO INIT (Simplificado para el MVP) ---
program
  .command("init")
  .description("Configura la estructura base")
  .action(async () => {
    console.log(chalk.blue("🔧 Creando carpeta de componentes..."));
    
    // Detectar estructura del proyecto
    const srcDir = path.join(process.cwd(), "src");
    const baseDir = existsSync(srcDir) ? srcDir : process.cwd();
    const prefix = existsSync(srcDir) ? "src/" : "";
    
    const targetDir = path.join(baseDir, "components", "ui");
    const libDir = path.join(baseDir, "lib");
    
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true });
      console.log(chalk.green(`✅ Carpeta creada en: ${prefix}components/ui`));
    } else {
      console.log(chalk.yellow(`⚠️ La carpeta ${prefix}components/ui ya existe.`));
    }

    if (!existsSync(libDir)) {
      mkdirSync(libDir, { recursive: true });
      console.log(chalk.green(`✅ Carpeta creada en: ${prefix}lib`));
    } else {
      console.log(chalk.yellow(`⚠️ La carpeta ${prefix}lib ya existe.`));
    }
  });

// --- COMANDO ADD (Funcional) ---
program
  .command("add")
  .argument("<component>", "El nombre del componente (ej: button)")
  .description("Instala un componente en tu proyecto")
  .action(async (componentName) => {
    try {
      // 1. Buscar en el registro
      const component = registry.items.find((item) => item.name === componentName);

      if (!component) {
        console.error(chalk.red(`❌ Componente "${componentName}" no encontrado en el registro.`));
        console.log(chalk.gray(`Componentes disponibles: ${registry.items.map(i => i.name).join(", ")}`));
        process.exit(1);
      }

      console.log(chalk.blue(`📦 Instalando ${componentName}...`));

      // 2. Detectar estructura del proyecto (src/ o root)
      const srcDir = path.join(process.cwd(), "src");
      const baseDir = existsSync(srcDir) ? srcDir : process.cwd();
      
      // 3. Definir rutas de destino
      const componentsDir = path.join(baseDir, "components", "ui");
      const libDir = path.join(baseDir, "lib");
      
      if (!existsSync(componentsDir)) {
        await fs.mkdir(componentsDir, { recursive: true });
      }
      if (!existsSync(libDir)) {
        await fs.mkdir(libDir, { recursive: true });
      }

      // 4. Escribir archivos
      const prefix = existsSync(srcDir) ? "src/" : "";
      for (const file of component.files) {
        let content = file.content;
        let filePath: string;
        let displayPath: string;
        
        // Determinar la ubicación correcta del archivo
        if (file.name === 'utils.ts') {
          // utils.ts va en lib/
          filePath = path.join(libDir, file.name);
          displayPath = `${prefix}lib/${file.name}`;
        } else {
          // Componentes van en components/ui/
          // Transformar import path de ../lib/utils a ../../lib/utils
          content = content.replace(
            /from\s+["']\.\.\/lib\/utils["']/g,
            'from "../../lib/utils"'
          );
          filePath = path.join(componentsDir, file.name);
          displayPath = `${prefix}components/ui/${file.name}`;
        }
        
        await fs.writeFile(filePath, content, "utf8");
        console.log(chalk.green(`   + Creado: ${displayPath}`));
      }

      // 4. Mostrar dependencias faltantes
      if (component.dependencies && component.dependencies.length > 0) {
        console.log("\n" + chalk.yellow("⚠️  Dependencias necesarias:"));
        console.log(chalk.cyan(`   npm install ${component.dependencies.join(" ")}`));
      }

      console.log(chalk.green(`\n✅ ${componentName} instalado correctamente.`));

    } catch (error) {
      console.error(chalk.red("❌ Error instalando el componente:"), error);
      process.exit(1);
    }
  });

program.parse(process.argv);

