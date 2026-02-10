# Liminal UI

> Source-based component library for React/Next.js. Full ownership, unlimited customization.

[![npm](https://img.shields.io/npm/v/liminal-ui.svg)](https://www.npmjs.com/package/liminal-ui)
[![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why Liminal UI?

- **You own the code** — Components live in your project, not `node_modules`
- **Zero breaking changes** — Update on your timeline
- **Fully customizable** — Modify any component freely
- **Headless foundation** — Built with [Ark UI](https://ark-ui.com/) + Tailwind CSS

## Quick Start

```bash
# 1. Initialize config
npx liminal-ui init

# 2. Add components
npx liminal-ui add button
npx liminal-ui add dialog accordion select
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `liminal init` | Create `components.json` config |
| `liminal add <name>` | Add component(s) to your project |
| `liminal add <name> -y` | Auto-install npm dependencies |
| `liminal add <name> -f` | Force overwrite existing files |
| `liminal list` | Show available components |
| `liminal diff <name>` | Compare local vs registry |

## Available Components

- `accordion` — Expandable content sections with Ark UI
- `badge` — Small status pill with variants (default, secondary, destructive, outline)
- `button` — Variants: default, destructive, outline, secondary, ghost, link
- `card` — Layout container with `CardHeader`, `CardContent`, `CardFooter`, etc.
- `checkbox` — Ark UI checkbox with convenience API (`<Checkbox label="Acepto" />`) y API compuesta
- `dialog` — Modal with overlay, header, footer, close button
- `input` — Text input with error state via `aria-invalid`
- `label` — Styled label for form fields
- `select` — Dropdown selection with groups and convenience `Select` component
- `separator` — Horizontal/vertical divider
- `switch` — Toggle switch with convenience API (`<Switch label="Dark mode" />`)
- `textarea` — Multiline text area aligned with `Input` styles
- `tooltip` — Simple tooltip built on Ark UI
- `alert` — Static alert banner with `AlertTitle` y `AlertDescription` (variantes `default`, `destructive`)
- `tabs` — Ark Tabs con API compuesta y conveniencia (`<Tabs items={[{ value, label, content }]}/>`)
- `avatar` — Ark Avatar con API dual (`Avatar`, `AvatarRoot`, `AvatarImage`, `AvatarFallback`)
- `popover` — Ark Popover posicionado con Portal + Positioner, más componente de conveniencia (`<Popover trigger={...}>`)
- `toast` — Wrapper de [`sonner`](https://sonner.emilkowal.dev/) con tokens de Liminal (`Toaster`, `toast(...)`)

## Theming

Liminal UI usa un sistema de tokens CSS basado en variables HSL, compatible con shadcn/ui y herramientas como [`tweakcn`](https://tweakcn.com/editor/theme).

- Los tokens base viven en `registry/lib/themes.css` (preset **slate** por defecto).
- El CLI ofrece 3 presets de color: **slate**, **blue**, **green**.
- Durante `liminal init` puedes elegir:
  - Copiar el CSS de tokens base a tu archivo global (por defecto `app/globals.css`).
  - Elegir el preset de color.
- Si quieres personalizar visualmente el tema:
  1. Genera un preset con `liminal init` o copia `registry/lib/themes.css`.
  2. Abre [`tweakcn`](https://tweakcn.com/editor/theme), ajusta los colores.
  3. Exporta el CSS y reemplaza las variables en tu `globals.css`.

Mientras mantengas los mismos nombres de variables (`--background`, `--primary`, `--card`, etc.), todos los componentes de Liminal UI seguirán funcionando.

## Project Structure

```
liminal-ui/
├── registry/          # Component source files
│   ├── ui/           # Components (button.tsx, dialog.tsx, ...)
│   └── lib/          # Utilities (utils.ts)
├── packages/cli/      # CLI tool
└── scripts/          # Build scripts
```

## Development

```bash
# Install dependencies
npm install

# Build registry
npm run build:registry

# Build CLI
cd packages/cli && npm run build

# Test locally
npm link
npx liminal list
```

## Tech Stack

- **UI Logic**: Ark UI (headless)
- **Styling**: Tailwind CSS
- **CLI**: Commander.js, Zod, Prompts
- **Build**: TypeScript, tsup

## License

MIT © Liminal UI Contributors
