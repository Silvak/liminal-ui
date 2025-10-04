# 📦 Guía de Publicación

## ✨ Mejoras Implementadas

### 1. **Exportaciones Simplificadas**

- **Antes:** `import "techno-components/dist/techno-ui.css"`
- **Ahora:** `import "techno-components/styles.css"`

### 2. **Soporte Completo de TypeScript**

- Definiciones de tipos para todos los componentes
- Autocompletado inteligente en editores
- Tipos exportables: `import { Button, type ButtonProps } from "techno-components"`

### 3. **Mejores Prácticas de React**

- `displayName` en todos los componentes
- `forwardRef` implementado correctamente con `ref` pasado al elemento DOM
- Props tipadas y documentadas

### 4. **Optimización del Paquete**

- `.npmignore` configurado para excluir archivos innecesarios
- `sideEffects` declarados para mejor tree-shaking
- `peerDependencies` correctamente configuradas

### 5. **Compatibilidad Mejorada**

- Soporte para React 18 y 19
- Exports condicionales para CommonJS y ESM
- Tipos priorizados en la resolución de módulos

## 🚀 Cómo Publicar

### Pre-requisitos

```bash
# 1. Asegúrate de estar autenticado en npm
npm login

# 2. Verifica tu usuario
npm whoami
```

### Proceso de Publicación

#### Opción 1: Publicación Manual

```bash
# 1. Asegúrate de que todo esté actualizado
git pull origin main

# 2. Ejecuta el build
npm run build

# 3. Verifica que los archivos estén correctos
npm pack --dry-run

# 4. Actualiza la versión (major, minor, o patch)
npm version patch  # 0.8.0 -> 0.8.1
npm version minor  # 0.8.0 -> 0.9.0
npm version major  # 0.8.0 -> 1.0.0

# 5. Publica a npm
npm publish

# 6. Sube los cambios y tags a git
git push origin main --follow-tags
```

#### Opción 2: Publicación Automática con Semantic Release

El proyecto ya está configurado con `semantic-release`. Simplemente:

```bash
# 1. Haz commits siguiendo Conventional Commits
git commit -m "feat: nueva funcionalidad"
git commit -m "fix: corrección de bug"

# 2. Push a main
git push origin main

# 3. Semantic Release se encargará del resto automáticamente
```

## 📋 Checklist Antes de Publicar

- [ ] ✅ Todos los tests pasan
- [ ] ✅ El build se completa sin errores: `npm run build`
- [ ] ✅ Los tipos TypeScript están correctos
- [ ] ✅ El README está actualizado
- [ ] ✅ El CHANGELOG está actualizado (si no usas semantic-release)
- [ ] ✅ La versión está actualizada en package.json
- [ ] ✅ Probaste el paquete localmente con `npm link`

## 🧪 Probar el Paquete Localmente

### Usando npm link

```bash
# En tu proyecto techno-ui
npm link

# En otro proyecto de prueba
cd /ruta/a/proyecto-test
npm link techno-components

# Usar normalmente
import { Button } from "techno-components";
import "techno-components/styles.css";
```

### Usando npm pack

```bash
# En tu proyecto techno-ui
npm pack

# Esto genera: techno-components-0.8.0.tgz
# En otro proyecto de prueba
npm install /ruta/a/techno-components-0.8.0.tgz
```

## 📊 Comparación: Antes vs Ahora

### Instalación y Uso

```jsx
// ❌ ANTES - Confuso y verboso
import { Button } from "techno-components";
import "techno-components/dist/techno-ui.css"; // Ruta confusa

// ✅ AHORA - Claro y simple
import { Button } from "techno-components";
import "techno-components/styles.css"; // Ruta estándar
```

### TypeScript

```tsx
// ❌ ANTES - Sin tipos
import { Button } from "techno-components"; // No autocompletado

// ✅ AHORA - Con tipos completos
import { Button, type ButtonProps } from "techno-components";
// Autocompletado y validación de tipos completo
```

### Refs

```jsx
// ❌ ANTES - ref no funcionaba correctamente
const buttonRef = useRef();
<Button ref={buttonRef}>Click</Button>; // ref no se pasaba al DOM

// ✅ AHORA - ref funciona perfectamente
const buttonRef = useRef();
<Button ref={buttonRef}>Click</Button>; // ref funciona ✓
```

## 🎯 Próximos Pasos Sugeridos

1. **Agregar más componentes** (Input, Card, Modal, etc.)
2. **Mejorar la documentación** con más ejemplos
3. **Agregar tests unitarios** con Jest/Vitest
4. **Crear un sitio de documentación** con Storybook público
5. **Agregar temas** (dark mode, diferentes paletas de colores)
6. **CI/CD** para publicación automática
7. **Bundle analyzer** para optimizar el tamaño

## 📚 Recursos Útiles

- [NPM Publishing Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [TypeScript Library Guide](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

¡Tu librería ahora funciona como las grandes! 🚀
