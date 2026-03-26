# Liminal UI

> Source-based component library for React/Next.js. Full ownership, unlimited customization.

[![npm](https://img.shields.io/npm/v/liminal-ui.svg)](https://www.npmjs.com/package/liminal-ui)
[![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why Liminal UI?

- **You own the code** — Components live in your project, not `node_modules`
- **Zero breaking changes** — Update on your timeline
- **Fully customizable** — Modify any component freely
- **Headless foundation** — Built with [Ark UI](https://ark-ui.com/) + Tailwind CSS

## Current Features

- **Source-based architecture** — Components are copied into your app, so you keep full ownership.
- **CLI workflow** — `init`, `add`, `list`, and `diff` for setup, install, discovery, and sync checks.
- **Token-based theming** — CSS variables with presets (`slate`, `blue`, `green`) and easy customization.
- **React/Next.js ready** — Works with modern React apps and supports RSC-aware setups.
- **Headless + utility-first** — Ark UI primitives with Tailwind-friendly component APIs.

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
- `alert` — Static alert banner with semantic title and description slots
- `avatar` — Avatar primitive with root, image, and fallback APIs
- `badge` — Status badges with `default`, `secondary`, `destructive`, and `outline` variants
- `button` — Variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) and sizes
- `card` — Composable card layout (`CardHeader`, `CardContent`, `CardFooter`, etc.)
- `checkbox` — Checkbox primitive with convenience API and composed parts
- `dialog` — Modal dialog with overlay, content, title, description, and close controls
- `dropdown-menu` — Context/dropdown menu with groups, labels, separators, and items
- `input` — Text input with consistent tokens and invalid-state styling
- `label` — Form label component with accessible defaults
- `popover` — Positioned popover with portal/positioner pattern and convenience wrapper
- `progress` — Progress indicator with track/range and optional value text
- `radio-group` — Radio group with item controls and text labels
- `select` — Select component with collection API, groups, and item indicators
- `separator` — Horizontal/vertical visual divider
- `skeleton` — Loading placeholders with size variants
- `slider` — Slider primitive with track, range, and thumb controls
- `sonner` — Toast integration wrapper (`Toaster`, `toast`) for notifications
- `switch` — Toggle switch with convenience API and composed parts
- `tabs` — Tab system with list, triggers, content, and optional indicator
- `textarea` — Multiline input aligned with `Input` styles
- `tooltip` — Lightweight tooltip primitive with trigger and content

Para ver ejemplos y detalles de uso de cada componente, consulta la documentación en la app de docs (`apps/www`), por ejemplo en `/docs/components/button`, `/docs/components/dialog`, etc.

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
