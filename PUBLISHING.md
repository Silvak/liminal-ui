# Guía de Publicación Manual

Esta guía describe el proceso de publicación manual del CLI hasta que semantic-release esté completamente configurado.

## Prerequisitos

1. Estar autenticado en npm: `npm login`
2. Tener 2FA habilitado (requerirá código OTP)

## Proceso de Publicación

### 1. Actualizar Versión

Actualizar la versión en `packages/cli/package.json` y `packages/cli/src/index.ts`:

```bash
# En package.json
"version": "0.0.X"

# En src/index.ts
.version("0.0.X")
```

### 2. Compilar el CLI

```bash
cd packages/cli
npm run build
```

### 3. Publicar a npm

```bash
npm publish --otp=<TU_CODIGO_OTP>
```

### 4. Establecer Tag Latest (si es necesario)

Si publicaste una versión que debe ser la principal:

```bash
npm dist-tag add liminal-ui@0.0.X latest --otp=<TU_CODIGO_OTP>
```

## Verificar Publicación

```bash
# Ver tags
npm dist-tag ls liminal-ui

# Ver información del paquete
npm view liminal-ui

# Ver todas las versiones
npm view liminal-ui versions --json
```

## Notas

- El README.md debe estar en `packages/cli/README.md` para que npm lo muestre automáticamente
- El campo `files` en package.json controla qué archivos se incluyen en la publicación
- Actualmente solo se publica `dist/` y `README.md`
