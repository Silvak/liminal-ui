# Liminal UI CLI

> CLI tool for Liminal UI - A source-based component registry system for React and Next.js

[![npm version](https://img.shields.io/npm/v/liminal-ui.svg)](https://www.npmjs.com/package/liminal-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Overview

Liminal UI uses the **Registry Pattern**—components are copied directly into your project as source files, giving you full ownership and unlimited customization.

---

## Prerequisites

Before using Liminal UI, ensure your project has:

### 1. Tailwind CSS (Required)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Required CSS variables for components
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
    },
  },
  plugins: [],
}
```

### 2. CSS Variables

Add these CSS variables to your global CSS file (e.g., `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

---

## Installation

```bash
# Using npx (recommended)
npx liminal-ui add button

# Or install globally
npm install -g liminal-ui
liminal add button
```

---

## Usage

### Add a Component

```bash
npx liminal-ui add button
```

This will:
1. Create `src/components/ui/button.tsx` (or `components/ui/` if no `src/` folder)
2. Create `src/lib/utils.ts` with the `cn()` helper function
3. Show required dependencies to install

### Install Dependencies

After adding a component, install the required dependencies:

```bash
npm install class-variance-authority clsx tailwind-merge
```

### Use the Component

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="p-4 space-x-2">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
```

---

## Commands

| Command | Description |
|---------|-------------|
| `liminal init` | Create component and lib folders |
| `liminal add <component>` | Add a component to your project |

---

## Available Components

| Component | Dependencies |
|-----------|--------------|
| `button` | `class-variance-authority`, `clsx`, `tailwind-merge` |

---

## File Structure

Components are placed based on your project structure:

```
# If src/ exists:
src/
├── components/
│   └── ui/
│       └── button.tsx
└── lib/
    └── utils.ts

# If no src/ folder:
components/
└── ui/
    └── button.tsx
lib/
└── utils.ts
```

---

## TypeScript Path Aliases (Optional)

For cleaner imports like `@/components/ui/button`, configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

For Vite projects, also add to `vite.config.ts`:

```typescript
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

---

## License

MIT © Liminal UI Contributors
