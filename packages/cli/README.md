# Liminal UI CLI

> Copy-paste component library for React/Next.js with full ownership

[![npm](https://img.shields.io/npm/v/liminal-ui.svg)](https://www.npmjs.com/package/liminal-ui)
[![MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Quick Start

```bash
# 1. Initialize config
npx liminal-ui init

# 2. Add components
npx liminal-ui add button
npx liminal-ui add dialog
```

## Commands

| Command | Description |
|---------|-------------|
| `liminal init` | Setup `components.json` config file |
| `liminal add <name>` | Add component to your project |
| `liminal add <name> -y` | Add + auto-install dependencies |
| `liminal add <name> -f` | Force overwrite existing files |
| `liminal list` | Show available components |
| `liminal diff <name>` | Compare local vs registry version |

## Configuration

Running `liminal init` creates `components.json`:

```json
{
  "tsx": true,
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib",
    "utils": "@/lib/utils"
  }
}
```

## Requirements

- **Tailwind CSS** with CSS variables (`background`, `foreground`, `primary`, etc.)
- **TypeScript** (optional but recommended)

You have two options for the CSS tokens:

1. **Let `liminal init` copy them for you** (recommended)
   - During `liminal init`, answer:
     - `¿Copiar CSS de tokens base?` → **yes**
     - Choose a preset: `slate`, `blue`, `green`
     - Confirm the path for your global CSS (default `app/globals.css`)
   - The CLI will write a full `@layer base { :root { ... } .dark { ... } }` block compatible with shadcn/ui.

2. **Copy tokens manually**
   - Use the reference file `registry/lib/themes.css` from this repo.
   - Or generate a theme visually with tools like [`tweakcn`](https://tweakcn.com/editor/theme) and paste the exported CSS into your global stylesheet.

## Usage

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="space-x-2">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
```

## License

MIT
