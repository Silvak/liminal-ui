# Gap de componentes Ark UI vs Liminal UI

Fecha de análisis: 2026-03-27

## Alcance y fuentes

- Inventario interno:
  - `registry/ui/*.tsx`
  - `packages/cli/src/registry.json`
- Inventario Ark UI (React) actual:
  - Context7 (Ark UI)
  - `@ark-ui/react@latest` (README/lista "Available Components" en npm)

## Normalización aplicada (alias internos -> canónico Ark)

- `dropdown-menu` -> `menu`
- `progress` -> `progress-linear`
- `sonner` -> `toast` (wrapper equivalente funcional)

## Resumen ejecutivo

- Componentes internos analizados: **31**
- Componentes canónicos Ark UI (lista oficial actual): **38**
- Cobertura actual sobre Ark UI: **22/38 (57.9%)**
- Faltantes Ark UI: **16**
- Componentes internos no-Ark (válidos como utilidades propias): **9**

## Implementados (mapeados a Ark UI)

- `accordion`
- `avatar`
- `checkbox`
- `combobox`
- `date-picker`
- `dialog`
- `field`
- `file-upload`
- `menu` (vía `dropdown-menu`)
- `number-input`
- `pagination`
- `pin-input`
- `popover`
- `progress-linear` (vía `progress`)
- `radio-group`
- `select`
- `slider`
- `switch`
- `tabs`
- `tags-input`
- `toast` (vía `sonner`)
- `tooltip`

## Faltantes Ark UI (con prioridad sugerida)

| Componente Ark UI   | Prioridad | Motivo breve                                   |
| ------------------- | --------- | ---------------------------------------------- |
| `collapsible`       | media     | Similar a accordion, bajo costo de adopción    |
| `editable`          | media     | Edición inline útil para dashboards            |
| `fieldset`          | media     | Agrupación semántica/accesible de campos       |
| `hover-card`        | media     | Patrón UI frecuente en productos SaaS          |
| `rating-group`      | media     | Reviews y feedback                             |
| `segment-group`     | media     | Alternancia compacta de vistas/filtros         |
| `splitter`          | media     | Layouts avanzados redimensionables             |
| `toggle-group`      | media     | Selecciones múltiples o exclusivas             |
| `carousel`          | baja      | Útil en marketing/media, no siempre core       |
| `clipboard`         | baja      | Acción específica, fácil wrapper               |
| `color-picker`      | baja      | Casos de edición visual especializados         |
| `progress-circular` | baja      | Complemento visual de progreso                 |
| `qr-code`           | baja      | Caso puntual según negocio                     |
| `signature-pad`     | baja      | Caso específico (legal/ops)                    |
| `timer`             | baja      | Caso de uso menos transversal                  |
| `tree-view`         | baja      | Estructuras jerárquicas especializadas         |

## Componentes internos no-Ark (no cuentan como faltantes)

- `alert`
- `badge`
- `button`
- `card`
- `input`
- `label`
- `separator`
- `skeleton`
- `textarea`

## Notas

- Este documento compara contra la lista oficial de componentes expuesta actualmente por Ark UI para React.
- Si Ark UI publica nuevos componentes, basta con actualizar el inventario canónico y recalcular el gap.
