# TechnoUI Components

Techno-UI is a futuristic UI component library for React, designed to bring modernity and innovation to interface development.

## 📌 Versions

- **v0.8.0** → Components: `Button`, `Stack`, `Text` + TypeScript support
- **v0.4.1** → Components: `Button`, `Stack`, `Text`
- **v0.0.1** → Initial version

## ✨ Features

- ✅ Modern React components with forwardRef support
- ✅ Full TypeScript support with type definitions
- ✅ Tailwind CSS powered styling
- ✅ Tree-shakeable ES modules
- ✅ Accessible and semantic HTML
- ✅ Zero runtime overhead

## 🚀 Installation

To install the library, run the following command:

```sh
npm install techno-components
```

## ⚙️ Configuration

**¡No requiere configuración!** 🎉

Los estilos se cargan automáticamente cuando importas cualquier componente. Simplemente instala y usa:

```bash
npm install techno-components
```

**Nota:** Si tu bundler no procesa CSS de node_modules automáticamente, puedes importar manualmente:

```js
import "techno-components/styles.css"; // Opcional
```

## 📖 Usage Example

### 📌 Initial Setup

```js
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✨ Los estilos se cargan automáticamente al importar componentes
// No necesitas importar "techno-components/styles.css" manualmente

createRoot(document.getElementById("root")).render(<App />);
```

### 📌 Using Components

Existen **dos formas** de importar los componentes:

#### Opción 1: Importación Directa por Componente (Recomendado) 🚀

```js
// ✨ Los estilos se cargan automáticamente
import Button from "techno-components/Button";
import Stack from "techno-components/Stack";
import Text from "techno-components/Text";

function App() {
  return (
    <Stack col spacing={4}>
      <Text size="2xl" weight="bold">
        Hello World
      </Text>
      <Button variant="primary">Click Me</Button>
    </Stack>
  );
}

export default App;
```

**Ventajas:**

- ✅ **Estilos automáticos** - No necesitas importar CSS
- ✅ Mejor tree-shaking (solo importas lo que usas)
- ✅ Más directo y limpio
- ✅ Tamaño de bundle optimizado

#### Opción 2: Importación desde el Barrel Export

```js
// ✨ Los estilos también se cargan automáticamente
import { Button, Stack, Text } from "techno-components";

function App() {
  return (
    <Stack col spacing={4}>
      <Text size="2xl" weight="bold">
        Hello World
      </Text>
      <Button variant="primary">Click Me</Button>
    </Stack>
  );
}

export default App;
```

**Cuándo usar:** Para importar múltiples componentes rápidamente. Los estilos se incluyen automáticamente.

### 📌 TypeScript Support

The library includes full TypeScript definitions:

```tsx
// Importación directa (recomendado)
import Button, { type ButtonProps } from "techno-components/Button";

// O importación desde el barrel export
import { Button, type ButtonProps } from "techno-components";

const MyButton: React.FC = () => {
  return (
    <Button variant="primary" size="lg" onClick={() => console.log("Clicked!")}>
      Click me
    </Button>
  );
};
```

### 📌 Available Components

#### Button

```tsx
<Button variant="primary" size="md" rounded="pill">
  Primary Button
</Button>
```

**Props:**

- `variant`: `'default' | 'primary' | 'secondary' | 'warning' | 'danger'`
- `size`: `'sm' | 'md' | 'lg'`
- `rounded`: `'default' | 'basic' | 'rounded' | 'pill'`
- `outline`: `boolean`

#### Text

```tsx
<Text as="h1" size="3xl" weight="bold" align="center">
  Hello World
</Text>
```

**Props:**

- `as`: Any HTML element (`'p' | 'h1' | 'h2' | 'span'`, etc.)
- `size`: `'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'`
- `weight`: `'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'`
- `align`: `'left' | 'center' | 'right'`
- `italic`: `boolean`
- `underline`: `boolean`

#### Stack

```tsx
<Stack col spacing={4}>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</Stack>
```

**Props:**

- `col`: `boolean` - Stack vertically
- `spacing`: `string | number` - Gap between items

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Build the library
npm run build

# Run Storybook
npm run storybook
```

---

Enjoy building interfaces with Techno-UI! 🚀
