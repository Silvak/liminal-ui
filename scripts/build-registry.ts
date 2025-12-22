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
  'lucide-react': 'lucide-react',
  'date-fns': 'date-fns',
  'cmdk': 'cmdk',
  'embla-carousel-react': 'embla-carousel-react',
  'react-day-picker': 'react-day-picker',
  'recharts': 'recharts',
  'vaul': 'vaul',
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

// Detectar dependencias internas (otros componentes del registry)
function detectRegistryDependencies(content: string, allComponentNames: string[]): string[] {
  const deps = new Set<string>();
  
  // Buscar imports relativos que podrían ser componentes
  // Patterns: from "./button", from "../button", from "@/components/ui/button"
  const patterns = [
    // Relative imports: from "./component" or from "../component"
    /import\s+.*?from\s+['"](\.\.?\/)+([a-z][a-z0-9-]*)['"](?!\.)/gi,
    // Aliased imports: from "@/components/ui/component"
    /import\s+.*?from\s+['"]@\/components\/ui\/([a-z][a-z0-9-]*)['"](?!\.)/gi,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      // Get the last capture group (component name)
      const componentName = match[match.length - 1];
      
      // Only add if it's a known component in our registry
      if (allComponentNames.includes(componentName)) {
        deps.add(componentName);
      }
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
const componentFiles = fs.readdirSync(uiPath)
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));

// First pass: get all component names
const allComponentNames = componentFiles.map(file => file.replace(/\.(tsx|ts)$/, ''));

// Second pass: build component metadata with registry dependencies
const components = componentFiles.map((file) => {
  const content = fs.readFileSync(path.join(uiPath, file), 'utf-8');
  const name = file.replace(/\.(tsx|ts)$/, '');
  const dependencies = detectDependencies(content);
  const registryDependencies = detectRegistryDependencies(content, allComponentNames)
    .filter(dep => dep !== name); // Don't include self as dependency
  
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
    registryDependencies, // NEW: internal component dependencies
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

// Log any detected registry dependencies
const depsFound = components.filter(c => c.registryDependencies.length > 0);
if (depsFound.length > 0) {
  console.log('\n📦 Components with internal dependencies:');
  for (const c of depsFound) {
    console.log(`   ${c.name} → ${c.registryDependencies.join(', ')}`);
  }
}
