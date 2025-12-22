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

- `button` — Variants: default, destructive, outline, secondary, ghost, link
- `dialog` — Modal with overlay, header, footer, close button
- `accordion` — Expandable content sections
- `select` — Dropdown selection with groups

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
