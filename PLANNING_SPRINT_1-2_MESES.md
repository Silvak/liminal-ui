# Liminal UI — Sprint 1-2 meses

Plan de desarrollo para llevar el proyecto a un nivel competitivo en 1-2 meses, optimizando tiempo en las partes más importantes. Mantiene el sentido del proyecto (code ownership) y mejora time-to-beautiful-UI con APIs de conveniencia.

---

## Visión del sprint

Mantener la identidad del proyecto (code ownership, CLI copy-paste) pero que cada componente venga **listo para usar bonito** con una API de conveniencia (como ya hace `Select`), sin obligar al usuario a ensamblar partes manualmente para el caso común.

**Patrón dual para TODOS los componentes:**

- **API de conveniencia:** `<Tooltip content="Hola"><button>Hover</button></Tooltip>` (rápido)
- **API compuesta:** `<TooltipRoot><TooltipTrigger>...` (control total)

---

## To-Do (checklist)

### Semana 1-2: Componentes core

- [x] Crear componentes de formulario: `input`, `textarea`, `checkbox`, `switch`, `label`
- [x] Crear componentes de layout: `card`, `badge`, `separator`
- [x] Ejecutar `npm run build:registry` y verificar ~13 componentes en `registry.json`

### Semana 3-4: Componentes interactivos + temas

- [x] Crear componentes overlay/feedback: `popover`, `alert`, `toast` (evaluar sonner)
- [x] Crear componentes de navegación: `tabs`, `avatar`
- [x] Sistema de temas básico: `registry/lib/themes.css`, opción en CLI `init` para copiar CSS de tokens, 2-3 presets (slate, blue, green)

### Semana 5-6: Documentación + CLI

- [x] Añadir docs MDX para cada componente nuevo en `apps/www/content/docs/components/`
- [x] Actualizar navegación en `apps/www/app/docs/layout.tsx`
- [ ] Mejorar cada doc: ejemplo rápido, ejemplo completo, props, variantes
- [ ] Crear página `/docs/theming`
- [x] Pulir landing `apps/www/app/page.tsx`
- [x] Mejorar CLI `init`: preguntar si copiar CSS de tokens
- [ ] Verificar `liminal add` con todos los componentes nuevos

### Semana 7-8: Pulido y release

- [ ] Revisión de diseño: consistencia (radius, colores, animaciones, espaciados)
- [ ] Componentes extra si da tiempo: `dropdown-menu`, `progress`, `slider`
- [ ] Testing local: proyecto Next.js limpio con `init` + `add` de varios componentes
- [ ] Release final: changeset, push, merge "Version Packages"
- [ ] Actualizar README con lista completa de componentes y features

---

## Semana 1-2: Componentes core (los más usados)

**Objetivo:** Pasar de 5 a ~15 componentes. Priorizar los que todo proyecto necesita.

**Grupo 1 — Formularios (alta prioridad):**

- `input` — Text input con variantes (default, error, disabled). Usa `ark.input` o `ark.field`.
- `textarea` — Similar a input, multilínea.
- `checkbox` — Ark `Checkbox` (Root, Control, Label). Conveniencia: `<Checkbox label="Acepto" />`.
- `switch` — Ark `Switch`. Conveniencia: `<Switch label="Dark mode" />`.
- `label` — Wrapper simple para labels estilizados.

**Grupo 2 — Layout/Display:**

- `card` — No requiere Ark. Div estilizado con `Card`, `CardHeader`, `CardContent`, `CardFooter` (solo HTML + cn).
- `badge` — Span con CVA variants (default, secondary, destructive, outline). Sin Ark.
- `separator` — `<hr>` estilizado o div. Sin Ark.

**Dónde crearlos:** `registry/ui/<nombre>.tsx`, siguiendo el patrón:

1. Mirar Anatomy en [Ark UI docs](https://ark-ui.com/react/docs/components).
2. Si tiene partes → patrón compound + componente de conveniencia.
3. Si es un solo elemento → patrón Button (CVA + forwardRef).
4. Si no es de Ark (card, badge) → solo HTML + Tailwind + cn.

**Al final de semana 2:** `npm run build:registry` y verificar que `registry.json` tiene ~13 componentes.

---

## Semana 3-4: Componentes interactivos + sistema de temas

**Grupo 3 — Overlays/Feedback:**

- `popover` — Ark `Popover` (Root, Trigger, Positioner, Content). Conveniencia: `<Popover trigger={<button>Click</button>}>Contenido</Popover>`.
- `alert` — Solo HTML + cn. Variantes: default, destructive, warning, info.
- `toast` / `sonner` — Evaluar integrar [sonner](https://sonner.emilkowal.dev/) como dependencia externa. Conveniencia máxima: `toast("Guardado")`.

**Grupo 4 — Navegación:**

- `tabs` — Ark `Tabs` (Root, List, Trigger, Content). Conveniencia: `<Tabs items={[{label, content}]} />`.
- `avatar` — Ark `Avatar` (Root, Image, Fallback). Conveniencia: `<Avatar src="..." fallback="JD" />`.

**Sistema de temas (paralelo):**

Mejorar lo que ya existe en `apps/www/app/globals.css`. Actualmente tiene tokens light/dark pero no se distribuyen con el CLI.

Acciones:

1. Crear `registry/lib/themes.css` con los tokens actuales (`:root` + `.dark`) como archivo que el CLI copie.
2. Agregar al `init` del CLI la opción de copiar este CSS base.
3. Añadir 2-3 presets de color (default/slate, blue, green) como variaciones de tokens.
4. Documentar en `installation.mdx` que el `init` ahora genera el CSS de tokens.

Esto NO es un plugin de Tailwind completo (eso tomaría meses); es distribuir un CSS de tokens base que funcione bien con los componentes.

---

## Semana 5-6: Documentación + mejoras CLI

**Documentación (apps/www/):**

El sitio ya tiene estructura funcional (`app/docs/layout.tsx` con sidebar). Hay que:

1. Agregar docs MDX para cada nuevo componente en `apps/www/content/docs/components/`.
2. Actualizar la navegación en `app/docs/layout.tsx` para incluir todos los componentes.
3. Mejorar cada doc MDX con: ejemplo "rápido" (API de conveniencia), ejemplo "completo" (API compuesta), props table básica, sección de variantes/sizes si aplica.
4. Crear una página `/docs/theming` explicando los tokens CSS y cómo personalizarlos.
5. Pulir la landing `apps/www/app/page.tsx`: hero con ejemplo visual, lista de features, link a docs.

**CLI:**

1. Mejorar `liminal init` para que pregunte si quiere copiar el CSS de tokens.
2. Verificar que `liminal add` funcione con TODOS los nuevos componentes (testear localmente).

---

## Semana 7-8: Pulido, consistencia y release

1. **Revisión de diseño:** Pasar por todos los componentes y verificar consistencia visual: mismos border-radius (`--radius`), mismos colores semánticos, mismas animaciones, mismos espaciados.
2. **Componentes extra si da tiempo:** `dropdown-menu`, `progress`, `slider`.
3. **Testing local:** En un proyecto Next.js limpio, ejecutar `npx liminal-ui init` + `npx liminal-ui add button dialog tabs input` y verificar que todo funciona.
4. **Release final:** Changeset con bump minor, push, merge "Version Packages".
5. **README y docs finales:** Actualizar `README.md` con la lista completa de componentes y features.

---

## Resumen de prioridades

De mayor a menor impacto:

1. **Componentes de formulario** (input, checkbox, switch) — los usa todo el mundo.
2. **Card y Badge** — rápidos de hacer, muy visibles.
3. **API de conveniencia** en cada componente — diferencia clave vs Ark puro.
4. **Tabs y Popover** — los segundos más usados.
5. **Temas básicos** (CSS tokens distribuidos) — que el usuario tenga dark mode "gratis".
6. **Docs actualizadas** — sin docs nadie adopta.
7. **Landing pulida** — primera impresión.

---

## Lo que NO entra en este sprint (backlog)

- Plugin de Tailwind custom (como HeroUI).
- Figma kit.
- Playground interactivo en la web.
- Prop polimórfica `as`.
- Más de 20 componentes.
- Testing automatizado (Jest/Vitest).
- i18n.

Estas cosas quedan para un sprint posterior (meses 3-6).
