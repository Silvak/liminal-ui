# 🚀 Guía Rápida - TechnoUI

## ⚡ Instalación

```bash
npm install techno-components
```

## 📦 Importación de Componentes

**¡Los estilos se cargan automáticamente!** ✨ No necesitas importar CSS manualmente.

Tu paquete ahora soporta **2 formas de importación**:

### ✅ Método 1: Importación Directa (RECOMENDADO)

```js
// Los estilos se incluyen automáticamente ✨
import Button from "techno-components/Button";
import Text from "techno-components/Text";
import Stack from "techno-components/Stack";
```

**Ventajas:**

- 🚀 Mejor tree-shaking
- 📦 Bundle más pequeño
- 🎯 Más directo y limpio
- ⚡ Solo importas lo que usas

### ✅ Método 2: Barrel Export

```js
// Los estilos también se incluyen automáticamente ✨
import { Button, Text, Stack } from "techno-components";
```

**Cuándo usar:** Cuando necesitas importar múltiples componentes rápidamente.

---

## 💡 Ejemplos de Uso

### Ejemplo Básico

```jsx
// ¡Sin import de CSS! ✨
import Button from "techno-components/Button";

function App() {
  return <Button variant="primary">Click Me</Button>;
}
```

### Ejemplo con Múltiples Componentes

```jsx
// ¡Sin import de CSS! ✨
import Button from "techno-components/Button";
import Text from "techno-components/Text";
import Stack from "techno-components/Stack";

function App() {
  return (
    <Stack col spacing={4}>
      <Text size="2xl" weight="bold">
        Bienvenido
      </Text>
      <Button variant="primary">Comenzar</Button>
    </Stack>
  );
}
```

### Con TypeScript

```tsx
// ¡Sin import de CSS! ✨
import Button, { type ButtonProps } from "techno-components/Button";
import Text, { type TextProps } from "techno-components/Text";
import Stack, { type StackProps } from "techno-components/Stack";

function App() {
  const handleClick = () => console.log("Clicked!");

  return (
    <Stack col spacing={4}>
      <Text size="2xl" weight="bold">
        Bienvenido
      </Text>
      <Button variant="primary" onClick={handleClick}>
        Comenzar
      </Button>
    </Stack>
  );
}
```

---

## 🎨 Props de Componentes

### Button

```tsx
<Button
  variant="primary" // 'default' | 'primary' | 'secondary' | 'warning' | 'danger'
  size="md" // 'sm' | 'md' | 'lg'
  rounded="rounded" // 'default' | 'basic' | 'rounded' | 'pill'
  outline={false} // boolean
>
  Click Me
</Button>
```

### Text

```tsx
<Text
  as="p" // 'p' | 'h1' | 'h2' | 'span' | etc.
  size="base" // 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  weight="normal" // 'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  align="left" // 'left' | 'center' | 'right'
  italic={false} // boolean
  underline={false} // boolean
>
  Hello World
</Text>
```

### Stack

```tsx
<Stack
  col={false} // boolean - vertical layout
  spacing={4} // string | number
>
  {/* children */}
</Stack>
```

---

## 📊 Comparación de Importaciones

```js
// ❌ ANTES (confuso y manual)
import { Button } from "techno-components";
import "techno-components/dist/techno-ui.css"; // ← Tenías que importar esto

// ✅ AHORA (directo y automático)
import Button from "techno-components/Button";
// ✨ ¡Los estilos se cargan solos!
```

---

## ✨ Características

- ✅ Importación directa por componente
- ✅ Tree-shaking optimizado
- ✅ TypeScript completo
- ✅ Refs funcionan perfectamente
- ✅ Props HTML nativas soportadas
- ✅ Compatible con React 18 y 19

---

## 🎯 ¿Cuál método usar?

### Usa Importación Directa cuando:

- 🎯 Quieras el bundle más pequeño posible
- 🚀 Solo uses uno o pocos componentes
- 📦 Te importe la optimización del tamaño

### Usa Barrel Export cuando:

- ⚡ Necesites importar muchos componentes
- 🔄 Estés migrando código existente
- 💨 Quieras desarrollo más rápido

---

## 💡 Tips

1. **¡No necesitas importar CSS!** Los estilos se cargan automáticamente ✨

2. **Combina con Tailwind** para personalización:

   ```jsx
   <Button className="w-full shadow-lg">Custom Button</Button>
   ```

3. **Usa refs cuando necesites**:
   ```jsx
   const ref = useRef();
   <Button ref={ref}>Button</Button>;
   ```

---

¡Disfruta construyendo con TechnoUI! 🚀
