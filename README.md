# Liminal UI

> A source-based component registry system for React and Next.js. Build beautiful, accessible, and highly customizable UI components using the Registry Pattern.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

---

## ⚠️ Project Status

**Liminal UI is currently in active development.** The project is being restructured as a Registry Pattern-based component system. The CLI, component registry, and documentation site are under construction.

**Not ready for production use yet.**

---

## Overview

Liminal UI is a modern component system built on the **Registry Pattern**—a source-based distribution model that gives developers full ownership and control over their component code. Unlike traditional npm libraries, components are copied directly into your project as source files, allowing for unlimited customization without breaking changes.

### Key Philosophy

- **Source Ownership**: Components live in your codebase, not in `node_modules`
- **Maximum Customization**: Modify any component to fit your exact needs
- **No Breaking Changes**: Update components on your timeline
- **Headless by Default**: Built with [Ark UI](https://ark-ui.com/) for complete styling control
- **Type-Safe**: Full TypeScript support out of the box

### How It Works

Instead of installing a pre-compiled library, you use a CLI tool to add components directly to your project:

```bash
npx liminal-ui add button
```

The CLI downloads the component source code and its dependencies, places them in your project, and ensures all necessary npm packages are installed. You now own the code and can modify it as needed.

---

## Architecture

Liminal UI follows a **Registry Pattern** architecture, similar to [shadcn/ui](https://ui.shadcn.com/), but with enhanced customization capabilities.

### Core Components

1. **Registry**: The source of truth containing component source files (`registry/ui/`)
2. **CLI Tool**: Command-line interface that downloads and installs components (`packages/cli/`)
3. **Documentation Site**: Web application serving component documentation and registry metadata (`apps/www/`)

### Monorepo Structure

```
liminal-ui/
├── registry/              # Source of truth - component source files
│   ├── ui/               # Component implementations
│   └── lib/              # Shared utilities (utils.ts)
├── packages/
│   └── cli/              # CLI tool (npx liminal-ui)
├── apps/
│   └── www/              # Documentation and registry server
└── scripts/
    └── build-registry.ts # Generates registry.json metadata
```

### Technology Stack

- **Components**: React 18+, TypeScript
- **Styling**: Tailwind CSS, Tailwind Variants
- **Logic**: Ark UI (Zag.js) for headless UI primitives
- **CLI**: Node.js, Commander.js, Zod
- **Build**: TypeScript, tsup

---

## Installation

> **Note**: The CLI is not yet published. This section describes the intended usage.

### Prerequisites

- Node.js 18+ 
- A React or Next.js project
- Tailwind CSS configured in your project

### Adding Components

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

## Development

This section is for contributors and maintainers.

### Prerequisites

- Node.js 18+
- npm (workspaces support)

### Getting Started

```bash
# Install dependencies
npm install

# Build the registry metadata
npm run build:registry

# Develop the CLI locally
cd packages/cli
npm run dev
```

### Project Structure

#### `registry/`
Contains the source files for all components. This is where you develop new components.

#### `packages/cli/`
The CLI tool that users interact with. Built with TypeScript and compiled to JavaScript.

#### `apps/www/`
Documentation site (to be implemented) that will:
- Display component documentation
- Serve registry metadata (JSON)
- Provide component previews

#### `scripts/build-registry.ts`
Script that scans `registry/ui/` and generates the registry metadata JSON file used by the CLI.

### Contributing

Contributions are welcome! However, please note that the project is in active development and the architecture may change.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure the registry builds correctly: `npm run build:registry`
5. Submit a pull request

---

## Roadmap

- [ ] Complete CLI implementation with dependency resolution
- [ ] Build component registry with initial components (Button, Card, Dialog)
- [ ] Create documentation site
- [ ] Implement registry build script
- [ ] Publish CLI to npm
- [ ] Add more components
- [ ] Provide component examples and documentation

---

## License

MIT © Liminal UI Contributors

---

## Links

- [GitHub Repository](https://github.com/yourusername/liminal-ui)
- [Issues](https://github.com/yourusername/liminal-ui/issues)
- [Discussions](https://github.com/yourusername/liminal-ui/discussions)

---

Made with ❤️ using React, TypeScript, Tailwind CSS, and Ark UI
