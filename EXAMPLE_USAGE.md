# 💡 Ejemplos de Uso Completos

## Instalación Básica

```bash
npm install techno-components
```

## Setup en tu proyecto

### JavaScript (React)

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "techno-components/styles.css"; // ✨ Ruta simplificada

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### TypeScript (React)

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "techno-components/styles.css"; // ✨ Ruta simplificada

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Ejemplos por Componente

### 🔘 Button

#### Ejemplo Básico

```jsx
import { Button } from "techno-components";

function App() {
  return <Button variant="primary">Click Me</Button>;
}
```

#### Todas las Variantes

```jsx
import { Button, Stack } from "techno-components";

function ButtonShowcase() {
  return (
    <Stack col spacing={4}>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
    </Stack>
  );
}
```

#### Tamaños y Formas

```jsx
import { Button, Stack } from "techno-components";

function ButtonSizes() {
  return (
    <Stack col spacing={4}>
      {/* Tamaños */}
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>

      {/* Formas */}
      <Button variant="primary" rounded="basic">
        Basic
      </Button>
      <Button variant="primary" rounded="rounded">
        Rounded
      </Button>
      <Button variant="primary" rounded="pill">
        Pill
      </Button>

      {/* Outline */}
      <Button variant="primary" outline>
        Outline
      </Button>
    </Stack>
  );
}
```

#### Con Refs (TypeScript)

```tsx
import { Button } from "techno-components";
import { useRef } from "react";

function ButtonWithRef() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const focusButton = () => {
    buttonRef.current?.focus();
  };

  return (
    <>
      <Button ref={buttonRef} variant="primary">
        Button con Ref
      </Button>
      <Button onClick={focusButton}>Focus el otro botón</Button>
    </>
  );
}
```

#### Con Props HTML Nativas

```jsx
import { Button } from "techno-components";

function AccessibleButton() {
  return (
    <Button
      variant="primary"
      onClick={() => console.log("Clicked!")}
      disabled={false}
      aria-label="Submit form"
      type="submit"
    >
      Submit
    </Button>
  );
}
```

### 📝 Text

#### Ejemplo Básico

```jsx
import { Text } from "techno-components";

function App() {
  return <Text>Hello World</Text>;
}
```

#### Tamaños y Estilos

```jsx
import { Text, Stack } from "techno-components";

function TextShowcase() {
  return (
    <Stack col spacing={2}>
      <Text size="sm">Small Text</Text>
      <Text size="base">Base Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
      <Text size="2xl">2X Large Text</Text>
      <Text size="3xl">3X Large Text</Text>
    </Stack>
  );
}
```

#### Pesos y Alineación

```jsx
import { Text, Stack } from "techno-components";

function TextWeights() {
  return (
    <Stack col spacing={2}>
      <Text weight="thin">Thin</Text>
      <Text weight="normal">Normal</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="semibold">Semibold</Text>
      <Text weight="bold">Bold</Text>
      <Text weight="black">Black</Text>

      {/* Alineación */}
      <Text align="left">Left Aligned</Text>
      <Text align="center">Center Aligned</Text>
      <Text align="right">Right Aligned</Text>
    </Stack>
  );
}
```

#### Decoraciones

```jsx
import { Text, Stack } from "techno-components";

function TextDecorations() {
  return (
    <Stack col spacing={2}>
      <Text italic>Italic Text</Text>
      <Text underline>Underlined Text</Text>
      <Text italic underline weight="bold">
        Bold Italic Underlined
      </Text>
    </Stack>
  );
}
```

#### Elementos Semánticos (as)

```jsx
import { Text, Stack } from "techno-components";

function SemanticText() {
  return (
    <Stack col spacing={2}>
      <Text as="h1" size="3xl" weight="bold">
        Heading 1
      </Text>
      <Text as="h2" size="2xl" weight="semibold">
        Heading 2
      </Text>
      <Text as="h3" size="xl" weight="medium">
        Heading 3
      </Text>
      <Text as="p" size="base">
        Paragraph text
      </Text>
      <Text as="span" size="sm" emphasis="low">
        Small caption
      </Text>
    </Stack>
  );
}
```

#### Con TypeScript

```tsx
import { Text, type TextProps } from "techno-components";

function CustomText(props: TextProps) {
  return (
    <Text as="h1" size="3xl" weight="bold" align="center" {...props}>
      {props.children}
    </Text>
  );
}
```

### 📚 Stack

#### Layout Horizontal

```jsx
import { Button, Stack } from "techno-components";

function HorizontalLayout() {
  return (
    <Stack spacing={2}>
      <Button variant="primary">Button 1</Button>
      <Button variant="secondary">Button 2</Button>
      <Button variant="warning">Button 3</Button>
    </Stack>
  );
}
```

#### Layout Vertical

```jsx
import { Button, Stack } from "techno-components";

function VerticalLayout() {
  return (
    <Stack col spacing={4}>
      <Button variant="primary">Button 1</Button>
      <Button variant="secondary">Button 2</Button>
      <Button variant="warning">Button 3</Button>
    </Stack>
  );
}
```

#### Stacks Anidados

```jsx
import { Button, Stack, Text } from "techno-components";

function NestedStacks() {
  return (
    <Stack col spacing={6}>
      <Text as="h2" size="2xl" weight="bold">
        Form Example
      </Text>

      <Stack col spacing={2}>
        <Text>Name</Text>
        <input type="text" className="border p-2 rounded" />
      </Stack>

      <Stack col spacing={2}>
        <Text>Email</Text>
        <input type="email" className="border p-2 rounded" />
      </Stack>

      <Stack spacing={2}>
        <Button variant="primary">Submit</Button>
        <Button variant="default">Cancel</Button>
      </Stack>
    </Stack>
  );
}
```

## 🎨 Ejemplos de Composición

### Card Component

```jsx
import { Stack, Text, Button } from "techno-components";

function Card({ title, description, actions }) {
  return (
    <div className="border rounded-lg p-6 shadow-lg">
      <Stack col spacing={4}>
        <Text as="h3" size="xl" weight="bold">
          {title}
        </Text>
        <Text emphasis="low">{description}</Text>
        <Stack spacing={2}>{actions}</Stack>
      </Stack>
    </div>
  );
}

// Uso
function App() {
  return (
    <Card
      title="Welcome"
      description="This is a card component built with Techno-UI"
      actions={
        <>
          <Button variant="primary">Accept</Button>
          <Button variant="default">Decline</Button>
        </>
      }
    />
  );
}
```

### Hero Section

```jsx
import { Stack, Text, Button } from "techno-components";

function Hero() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <Stack col spacing={6} className="text-center">
        <Text as="h1" size="3xl" weight="black" className="text-white">
          Bienvenido a TechnoUI
        </Text>
        <Text size="lg" className="text-white/90">
          La librería de componentes del futuro
        </Text>
        <Stack spacing={4} className="justify-center">
          <Button variant="primary" size="lg" rounded="pill">
            Comenzar
          </Button>
          <Button variant="default" size="lg" rounded="pill" outline>
            Aprender Más
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
```

### Form con Validación

```jsx
import { useState } from "react";
import { Stack, Text, Button } from "techno-components";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }
    setError("");
    console.log("Login:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <Stack col spacing={6}>
        <Text as="h2" size="2xl" weight="bold" align="center">
          Iniciar Sesión
        </Text>

        <Stack col spacing={2}>
          <Text weight="medium">Email</Text>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            placeholder="tu@email.com"
          />
          {error && (
            <Text size="sm" className="text-red-600">
              {error}
            </Text>
          )}
        </Stack>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Entrar
        </Button>
      </Stack>
    </form>
  );
}
```

## 🎯 Tips y Mejores Prácticas

### 1. Combina con Tailwind CSS

```jsx
import { Button } from "techno-components";

// Puedes agregar clases de Tailwind adicionales
<Button
  variant="primary"
  className="w-full shadow-xl hover:scale-105 transition"
>
  Custom Styled Button
</Button>;
```

### 2. Usa TypeScript para mejor DX

```tsx
import { ButtonProps } from "techno-components";

// Crea wrappers tipados
function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />;
}
```

### 3. Reutiliza Componentes

```jsx
// components/ui/PrimaryButton.jsx
import { Button } from "techno-components";

export function PrimaryButton(props) {
  return <Button variant="primary" rounded="pill" size="lg" {...props} />;
}
```

---

¡Explora y crea interfaces increíbles! 🚀
