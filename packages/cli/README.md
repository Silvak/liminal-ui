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
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib"
  }
}
```

## Requirements

- **Tailwind CSS** with CSS variables
- **TypeScript** (optional but recommended)

Add to your global CSS:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
  }
}
```

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
