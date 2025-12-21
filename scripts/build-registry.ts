// Este script leerá la carpeta registry/ui/
// Generará el archivo registry.json con metadata
// Lo guardará en packages/cli/src/registry.json
import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.join(process.cwd(), 'registry');
const OUTPUT_PATH = path.join(process.cwd(), 'packages/cli/src/registry.json');

// Dependencias conocidas que se pueden detectar de los imports
const KNOWN_DEPENDENCIES: Record<string, string> = {
  '@ark-ui/react': '@ark-ui/react',
  'class-variance-authority': 'class-variance-authority',
  'clsx': 'clsx',
  'tailwind-merge': 'tailwind-merge',
};

// Detectar dependencias desde el contenido del archivo
function detectDependencies(content: string): string[] {
  const deps = new Set<string>();
  
  // Buscar imports de paquetes externos
  const importRegex = /import\s+.*?from\s+['"]([^'"./][^'"]*)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Obtener el nombre del paquete (sin rutas internas)
    const packageName = importPath.startsWith('@') 
      ? importPath.split('/').slice(0, 2).join('/')
      : importPath.split('/')[0];
    
    if (KNOWN_DEPENDENCIES[packageName]) {
      deps.add(KNOWN_DEPENDENCIES[packageName]);
    }
  }
  
  return Array.from(deps);
}

// Leer archivos de lib/
const libPath = path.join(REGISTRY_PATH, 'lib');
const libFiles: Record<string, string> = {};

if (fs.existsSync(libPath)) {
  fs.readdirSync(libPath)
    .filter(file => file.endsWith('.ts') || file.endsWith('.tsx'))
    .forEach(file => {
      libFiles[file] = fs.readFileSync(path.join(libPath, file), 'utf-8');
    });
}

// Leer componentes UI
const uiPath = path.join(REGISTRY_PATH, 'ui');
const components = fs.readdirSync(uiPath)
  // Filtrar archivos que no son componentes (.gitkeep, etc.)
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
  .map((file) => {
    const content = fs.readFileSync(path.join(uiPath, file), 'utf-8');
    const name = file.replace(/\.(tsx|ts)$/, '');
    const dependencies = detectDependencies(content);
    
    // Detectar si usa utils
    const usesUtils = content.includes('../lib/utils') || content.includes('@/lib/utils');
    
    const files = [
      {
        name: file,
        content: content
      }
    ];
    
    // Agregar utils.ts si el componente lo usa
    if (usesUtils && libFiles['utils.ts']) {
      files.push({
        name: 'utils.ts',
        content: libFiles['utils.ts']
      });
      // Agregar dependencias de utils
      dependencies.push('clsx', 'tailwind-merge');
    }
    
    return {
      name,
      dependencies: [...new Set(dependencies)], // Eliminar duplicados
      files,
      type: "components:ui"
    };
  });

const registry = {
  name: "liminal-ui",
  items: components
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2));
console.log(`✅ Registry built with ${components.length} components at ${OUTPUT_PATH}`);
