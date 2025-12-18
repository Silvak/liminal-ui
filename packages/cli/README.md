# Liminal UI CLI

> CLI tool for Liminal UI - A source-based component registry system for React and Next.js

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## ⚠️ Project Status

**Liminal UI is currently in active development.** The CLI, component registry, and documentation site are under construction.

**Not ready for production use yet.**

---

## Overview

Liminal UI uses the **Registry Pattern**—a source-based distribution model that gives you full ownership and control over your component code. Unlike traditional npm libraries, components are copied directly into your project as source files, allowing for unlimited customization without breaking changes.

### Key Benefits

- **Source Ownership**: Components live in your codebase, not in `node_modules`
- **Maximum Customization**: Modify any component to fit your exact needs
- **No Breaking Changes**: Update components on your timeline
- **Headless by Default**: Built with [Ark UI](https://ark-ui.com/) for complete styling control
- **Type-Safe**: Full TypeScript support out of the box

### How It Works

Instead of installing a pre-compiled library, use this CLI to add components directly to your project:

```bash
npx liminal-ui add button
```

The CLI downloads the component source code and its dependencies, places them in your project, and ensures all necessary npm packages are installed. You now own the code and can modify it as needed.

---

## Installation

### Prerequisites

- Node.js 18+
- A React or Next.js project
- Tailwind CSS configured in your project

### Quick Start

```bash
# Add a single component
npx liminal-ui add button

# Add multiple components
npx liminal-ui add button card dialog
```

The CLI will:
1. Download component source files to `src/components/ui/`
2. Install required npm dependencies
3. Resolve component dependencies (e.g., Card depends on Button)
4. Ensure the `utils.ts` helper file exists

### Initial Setup

The first time you use the CLI, it will prompt you for configuration:
- Component directory (default: `src/components/ui`)
- Utils file location (default: `src/lib/utils.ts`)
- TypeScript/JavaScript preference

---

## Usage

### Commands

- `npx liminal-ui init` - Configure your project for Liminal UI
- `npx liminal-ui add <component>` - Add a component to your project

### Examples

```bash
# Initialize configuration
npx liminal-ui init

# Add a button component
npx liminal-ui add button

# Add multiple components at once
npx liminal-ui add button card dialog
```

---

## 📖 Documentation

For complete documentation, architecture details, contributing guidelines, roadmap, and more, please visit the [GitHub Repository](https://github.com/yourusername/liminal-ui).

---

## License

MIT © Liminal UI Contributors
