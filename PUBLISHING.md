# Guía de Publicación con Changesets

Esta guía describe el proceso de publicación usando Changesets, la herramienta estándar para gestionar versiones en monorepos.

## ¿Qué es Changesets?

Changesets es una herramienta diseñada específicamente para monorepos que te permite:
- Control explícito sobre las versiones (no depende de mensajes de commit)
- Gestión automática de dependencias internas
- Flujo basado en Pull Requests para mayor control
- Generación automática de changelogs

## Prerequisitos

1. Estar autenticado en npm: `npm login`
2. Tener configurado `NPM_TOKEN` en los secrets de GitHub Actions
3. Tener configurado `GITHUB_TOKEN` en los secrets de GitHub Actions (se configura automáticamente)

## Flujo de Trabajo

### 1. Hacer Cambios en el Código

Realiza tus cambios en `packages/cli` o cualquier otro paquete del monorepo.

### 2. Crear un Changeset

Antes de hacer commit, ejecuta en la raíz del proyecto:

```bash
npx changeset
```

Este comando te preguntará:
- **¿Qué paquetes cambiaron?** → Selecciona `liminal-ui` (packages/cli)
- **¿Es major, minor o patch?** → Elige según el tipo de cambio:
  - `patch`: Correcciones de bugs (1.0.0 → 1.0.1)
  - `minor`: Nuevas funcionalidades sin romper compatibilidad (1.0.0 → 1.1.0)
  - `major`: Cambios que rompen compatibilidad (1.0.0 → 2.0.0)
- **Mensaje del changeset**: Describe qué cambió

Esto creará un archivo `.md` en la carpeta `.changeset/` con un nombre aleatorio.

### 3. Commit y Push

Haz commit del changeset junto con tus cambios:

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push
```

### 4. Proceso Automático en GitHub

1. **GitHub Actions detecta el changeset** y crea/actualiza una Pull Request llamada "Version Packages"
2. **La PR incluye**:
   - Incremento automático de versión en `packages/cli/package.json`
   - Actualización automática del `CHANGELOG.md`
   - Resumen de todos los changesets pendientes

### 5. Publicación a npm

Cuando **apruebes y hagas merge** de la PR "Version Packages":
- GitHub Actions ejecutará automáticamente `npm run release`
- Se compilarán todos los workspaces
- Se publicará el paquete a npm usando `changeset publish`
- Se creará un release en GitHub con el changelog

## Comandos Útiles

### Ver changesets pendientes

```bash
npx changeset status
```

### Pre-version (ver qué cambiaría sin hacer cambios)

```bash
npx changeset version
```

### Publicación manual (solo si es necesario)

```bash
npm run release
```

## Verificar Publicación

```bash
# Ver información del paquete
npm view liminal-ui

# Ver todas las versiones
npm view liminal-ui versions --json

# Ver tags
npm dist-tag ls liminal-ui
```

## Notas Importantes

- **No edites manualmente las versiones**: Changesets las gestiona automáticamente
- **Siempre crea un changeset**: Si haces cambios sin changeset, no se publicarán
- **El paquete `@liminal-ui/www` está ignorado**: Nunca se publicará (está en `ignore` del config)
- **El README.md debe estar en `packages/cli/README.md`** para que npm lo muestre automáticamente
- **El campo `files` en package.json** controla qué archivos se incluyen en la publicación (actualmente `dist/` y `README.md`)

## Ventajas sobre semantic-release

- ✅ Control explícito: Tú decides cuándo y qué versión publicar
- ✅ Diseñado para monorepos: Maneja múltiples paquetes nativamente
- ✅ Flujo basado en PRs: Revisas los cambios antes de publicar
- ✅ Sin dependencia de mensajes de commit: Más flexible y menos propenso a errores
- ✅ Gestión de dependencias internas: Si un paquete depende de otro, se actualizan ambos automáticamente
