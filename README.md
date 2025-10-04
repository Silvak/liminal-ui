# Liminal UI

> Modern, accessible, and tree-shakeable React component library with pre-compiled Tailwind styles.

[![npm version](https://img.shields.io/npm/v/liminal-ui.svg)](https://www.npmjs.com/package/liminal-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎨 **Modern React Components** - Built with `forwardRef` and `displayName`
- 📘 **TypeScript Support** - Full type definitions included
- 🎭 **Pre-compiled Styles** - No Tailwind installation required for usage
- 🌳 **Tree-shakeable** - Import only what you need
- ♿ **Accessible** - Semantic HTML and ARIA support
- ⚡ **Zero Runtime Overhead** - Optimized for performance
- 🌍 **Universal** - Works with any React project
- 📦 **Direct Imports** - `import Button from "liminal-ui/Button"`

---

## 🚀 Quick Start

### Installation

```bash
npm install liminal-ui
```

### Setup (One-time)

Import the CSS file once in your project:

**React (Vite/CRA):**

```js
// main.jsx
import "liminal-ui/styles.css";
```

**Next.js (App Router):**

```jsx
// app/layout.jsx
import "liminal-ui/styles.css";
```

**Next.js (Pages Router):**

```jsx
// pages/_app.jsx
import "liminal-ui/styles.css";
```

**Remix:**

```jsx
// app/root.jsx
import "liminal-ui/styles.css";
```

### Basic Usage

```jsx
import Button from "liminal-ui/Button";

function App() {
  return <Button variant="primary">Click Me</Button>;
}
```

That's it! ✅

---

## 🎯 Framework Compatibility

| Framework                  | Status         | Setup Required          | Tailwind Needed |
| -------------------------- | -------------- | ----------------------- | --------------- |
| **React (Vite/CRA)**       | ✅ Plug & Play | Import CSS once in main | ❌ No           |
| **React + TypeScript**     | ✅ Plug & Play | Import CSS once in main | ❌ No           |
| **Next.js (App Router)**   | ✅ Compatible  | Import CSS in layout    | ❌ No           |
| **Next.js (Pages Router)** | ✅ Compatible  | Import CSS in \_app     | ❌ No           |
| **Remix**                  | ✅ Compatible  | Import CSS in root      | ❌ No           |

**🌟 Key Advantage:** You don't need Tailwind CSS installed unless you want to fork and modify component source code.

---

## 📚 Usage Levels

This package supports **3 levels of usage** depending on your needs:

### 📌 Level 1: Basic Usage (90% of users) - **No Tailwind Required** ✅

Simply import and use components with the provided props:

```jsx
import Button from "liminal-ui/Button";
import Stack from "liminal-ui/Stack";
import Text from "liminal-ui/Text";

function App() {
  return (
    <Stack col spacing={4}>
      <Text size="2xl" weight="bold">
        Hello World
      </Text>
      <Button variant="primary" size="lg">
        Click Me
      </Button>
    </Stack>
  );
}
```

**What you get:**

- ✅ All styles pre-compiled and included
- ✅ No Tailwind installation needed
- ✅ Works in any React project

---

### 📌 Level 2: Custom Styling - **No Tailwind Required** ✅

Add your own CSS classes alongside component props:

```jsx
import Button from "liminal-ui/Button";

function App() {
  return (
    <Button
      variant="primary"
      outline
      rounded="pill"
      className="my-custom-class"
    >
      Custom Styled
    </Button>
  );
}
```

```css
/* your-styles.css */
.my-custom-class {
  background: linear-gradient(to right, purple, pink);
  transform: scale(1.1);
}
```

**What you get:**

- ✅ Combine component variants with your own styles
- ✅ Use regular CSS, CSS Modules, or styled-components
- ✅ No Tailwind needed

---

### 📌 Level 3: Fork & Modify - **Tailwind Required** ⚠️

Copy the component source code to your project and modify it:

```jsx
// src/components/MyCustomButton.jsx
import { forwardRef } from "react";
import { cva } from "class-variance-authority";

const button = cva("inline-block px-2 py-2", {
  variants: {
    variant: {
      primary: "bg-purple-700 text-white", // ← New custom color
      rainbow: "bg-gradient-to-r from-pink-500 to-blue-500",
    },
  },
});

export const MyCustomButton = forwardRef(({ variant, ...props }, ref) => {
  return <button ref={ref} className={button({ variant })} {...props} />;
});
```

**Requirements:**

- ⚠️ Requires Tailwind CSS installed in your project
- ⚠️ Requires `class-variance-authority` package
- ✅ Full control over component code

---

## 📦 Import Methods

### Option 1: Direct Import (Recommended) 🚀

```js
import Button from "liminal-ui/Button";
import Stack from "liminal-ui/Stack";
import Text from "liminal-ui/Text";
```

**Advantages:**

- ✅ Better tree-shaking (import only what you use)
- ✅ Smaller bundle size
- ✅ More explicit imports

### Option 2: Barrel Export

```js
import { Button, Stack, Text } from "liminal-ui";
```

**When to use:** Quick imports for multiple components.

---

## 🧩 Available Components

### Button

```jsx
<Button variant="primary" size="md" rounded="pill">
  Click Me
</Button>
```

**Props:**

- `variant`: `'default' | 'primary' | 'secondary' | 'warning' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `rounded`: `'default' | 'basic' | 'rounded' | 'pill'`
- `outline`: `boolean`
- `className`: `string` - Add custom classes
- `ref`: `React.Ref` - Forward ref to button element

---

### Text

```jsx
<Text size="2xl" weight="bold" align="center">
  Hello World
</Text>
```

**Props:**

- `size`: `'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'`
- `weight`: `'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'`
- `align`: `'left' | 'center' | 'right'`
- `italic`: `boolean`
- `underline`: `boolean`
- `className`: `string`
- `as`: `'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` (default: `'p'`)
- `ref`: `React.Ref`

---

### Stack

```jsx
<Stack col spacing={4} align="center">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Stack>
```

**Props:**

- `col`: `boolean` - Vertical layout (default: horizontal)
- `spacing`: `number` - Gap between items (1-24)
- `align`: `'start' | 'center' | 'end'`
- `justify`: `'start' | 'center' | 'end' | 'between'`
- `wrap`: `boolean` - Enable flex-wrap
- `className`: `string`
- `ref`: `React.Ref`

---

## 📘 TypeScript Support

Full TypeScript definitions are included:

```tsx
import Button, { type ButtonProps } from "liminal-ui/Button";
import Text, { type TextProps } from "liminal-ui/Text";
import Stack, { type StackProps } from "liminal-ui/Stack";

const MyButton: React.FC = () => {
  return (
    <Button variant="primary" size="lg" onClick={() => console.log("Clicked!")}>
      Click me
    </Button>
  );
};
```

**Barrel export types:**

```tsx
import { Button, type ButtonProps } from "liminal-ui";
```

---

## 🎭 Do You Need Tailwind CSS?

**Short answer: NO (for 90%+ of use cases)**

| Usage Level                | Tailwind Required | What You Can Do                                 |
| -------------------------- | ----------------- | ----------------------------------------------- |
| **Level 1: Basic**         | ❌ No             | Use components with provided props              |
| **Level 2: Custom Styles** | ❌ No             | Add your own CSS/styles alongside               |
| **Level 3: Fork Source**   | ✅ Yes            | Modify component code, add new Tailwind classes |

**Why?** All Tailwind styles are pre-compiled and included in `liminal-ui.css`. You only need Tailwind if you want to fork the component source code and add completely new Tailwind classes.

### Comparison with Other Libraries

| Library         | Requires Tailwind      | Why                               |
| --------------- | ---------------------- | --------------------------------- |
| **liminal-ui**  | ❌ No (unless forking) | Pre-compiled CSS                  |
| **shadcn/ui**   | ✅ Yes                 | Components copied to your project |
| **daisyUI**     | ✅ Yes                 | Tailwind plugin                   |
| **NextUI**      | ⚠️ Recommended         | Uses tailwind-variants            |
| **Ant Design**  | ❌ No                  | Own CSS system                    |
| **Material-UI** | ❌ No                  | CSS-in-JS (Emotion)               |

---

## 📖 Examples

### Basic Example

```jsx
import Button from "liminal-ui/Button";

function App() {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger" outline>
        Danger Outline
      </Button>
    </div>
  );
}
```

### Complete Example

```jsx
import Button from "liminal-ui/Button";
import Stack from "liminal-ui/Stack";
import Text from "liminal-ui/Text";

function App() {
  return (
    <Stack col spacing={6} align="center">
      <Text size="3xl" weight="bold" align="center">
        Welcome to Liminal UI
      </Text>

      <Text size="lg" align="center">
        Modern React components with pre-compiled Tailwind styles
      </Text>

      <Stack spacing={4}>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="secondary" size="lg" outline>
          Learn More
        </Button>
      </Stack>
    </Stack>
  );
}
```

### TypeScript Example

```tsx
import { useState } from "react";
import Button from "liminal-ui/Button";
import Text from "liminal-ui/Text";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Text size="2xl" weight="bold">
        Count: {count}
      </Text>
      <Button variant="primary" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}
```

---

## 🛠️ Development

### Building the Package

```bash
npm run build
```

### Running Storybook

```bash
npm run storybook
```

### Linting

```bash
npm run lint
```

---

## 📝 Publishing

### Automatic (with semantic-release)

Push to `main` branch with conventional commits:

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Manual

```bash
npm version patch|minor|major
npm run build
npm publish
git push origin main --follow-tags
```

---

## 📄 License

MIT © [Your Name]

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📌 Versions

- **v0.9.0** → Current version with updated documentation
- **v0.8.0** → Components: `Button`, `Stack`, `Text` + TypeScript support
- **v0.4.1** → Components: `Button`, `Stack`, `Text`
- **v0.0.1** → Initial version

---

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/liminal-ui)
- [GitHub Repository](https://github.com/yourusername/techno-ui)
- [Issues](https://github.com/yourusername/techno-ui/issues)

---

Made with ❤️ using React, TypeScript, and Tailwind CSS
