#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

// 1. Inicializar el programa
const program = new Command();

program
  .name("liminal-ui")
  .description("CLI para agregar componentes de Liminal UI")
  .version("0.0.2");

// 2. Definir el comando 'init' (placeholder)
program
  .command("init")
  .description("Configura tu proyecto para usar Liminal UI")
  .action(() => {
    console.log(chalk.green("✅ Inicializando configuración... (Próximamente)"));
  });

// 3. Definir el comando 'add' (placeholder)
program
  .command("add")
  .argument("[component]", "El componente a agregar")
  .description("Agrega un componente a tu proyecto")
  .action((component) => {
    if (!component) {
      console.log(chalk.red("❌ Por favor especifica un componente."));
      return;
    }
    console.log(chalk.blue(`Bajando el componente: ${component}... (Simulado)`));
  });

// 4. Ejecutar
program.parse(process.argv);
