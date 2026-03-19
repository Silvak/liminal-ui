import type {
  LandingComponentsCopy,
  LandingThemingCopy,
} from "../../lib/landing-dictionary";

export const landingPageHeroEs = {
  title1: "LIMINAL UI",
  title2: "DESIGN",
  title3: "SYSTEM",
  subtitle: "Cada línea es tuya. Publica con confianza.",
  body: "Componentes React para copiar y pegar, sobre primitivos Ark UI y estilados con Tailwind v4. Sin capas de más, sin ataduras: código limpio y componible que controlas al completo.",
  ctaStarted: "EMPEZAR",
  ctaComponents: "VER COMPONENTES",
  panelSys: "SYS.v0.15.0",
  panelArkTw: "ARK UI / TW CSS",
  panelBrand: "LIMINAL.UI",
};

export const landingAboutEs = {
  title: "Construye interfaces limpias más rápido.",
  description:
    "Empieza con un setup mínimo y entrega componentes reutilizables con control total sobre tu design system.",
};

export const landingThemingEs: LandingThemingCopy = {
  overline: "MOTOR DE TEMAS",
  titleLine1: "Un sistema.",
  titleLine2: "Infinitas paletas.",
  blurb:
    "Alterna entre presets curados o crea el tuyo. Cada variable se actualiza en tiempo real: lo que ves es lo que publicas.",
  footerPresets: "{count} presets incluidos — totalmente personalizables",
  openPlayground: "Abrir playground →",
  presetLabels: {
    default: "Default",
    ocean: "Ocean",
    forest: "Forest",
    sunset: "Sunset",
    midnight: "Midnight",
  },
  cardDemo: {
    componentLabel: "COMPONENTE",
    profileCard: "Tarjeta de perfil",
    description:
      "Tarjeta componible sobre primitivos Ark UI: accesible, tematizable, sin ataduras.",
    tags: ["Accesible", "Tematizable", "Componible"],
    saved: "★ Guardado",
    save: "☆ Guardar",
    viewDocs: "Ver docs",
    lampAlt: "Lámpara decorativa sobre la tarjeta de ejemplo",
  },
};

export const landingComingSoonEs = {
  overline: "PRÓXIMAMENTE",
  titleLine1: "Dashboards completos.",
  titleLine2: "Componentes complejos.",
  body: "Estamos preparando layouts de dashboard listos para usar y componentes compuestos más ricos: tablas de datos, gráficos, barras laterales y flujos multipaso. Todo sobre los mismos primitivos que ya usas, para encajar en tu stack sin fricción.",
  closing: "Mantente al tanto de las novedades.",
  imageAlt: "Vista previa de dashboard y componentes complejos",
};

export const landingComponentsEs: LandingComponentsCopy = {
  overline: "SISTEMA DE COMPONENTES",
  titleLine1: "Hecho para componer.",
  titleLine2: "Listo para producción.",
  description:
    "Elige un componente. Ajusta sus props. Ve el resultado en vivo. Cada pieza es accesible, tematizable y te pertenece.",
  componentIndex: "Índice de componentes",
  livePreview: "Vista previa en vivo",
  interactive: "Interactivo",
  footerLine: "{count} componentes mostrados — más de 24 en la documentación",
  exploreDocs: "Explorar docs →",
  items: [
    { name: "Button", category: "Acciones", count: "6 variantes" },
    { name: "Alert", category: "Retroalimentación", count: "4 tipos" },
    { name: "Card", category: "Layout", count: "Componible" },
    { name: "Badge", category: "Visualización", count: "3 variantes" },
    { name: "Tabs", category: "Navegación", count: "Accesible" },
    { name: "Separator", category: "Layout", count: "H + V" },
  ],
  button: {
    execute: "Ejecutar",
    inspect: "Inspeccionar",
    clone: "Clonar",
    size: "Tamaño",
  },
  alert: {
    typeLabel: "Tipo",
    info: {
      label: "SYSTEM.INFO",
      msg: "Componente listo. Fuente en ./components/ui/alert.tsx",
    },
    success: {
      label: "SYSTEM.OK",
      msg: "Todas las comprobaciones pasaron. Build correcto.",
    },
    warning: {
      label: "SYSTEM.WARN",
      msg: "Prop obsoleta detectada. Consulta la guía de migración.",
    },
    error: {
      label: "SYSTEM.ERR",
      msg: "No se pudo resolver la dependencia. Revisa la configuración.",
    },
  },
  card: {
    title: "Título de tarjeta",
    subtitle: "Componible",
    body: "El cuerpo de la tarjeta va aquí. Totalmente componible: añade o quita secciones según necesites.",
    cancel: "Cancelar",
    save: "Guardar",
    headerToggle: "Cabecera",
    footerToggle: "Pie",
  },
  badge: {
    variant: "Variante",
    solid: "sólido",
    outline: "contorno",
    accent: "acento",
    outline1: "Tailwind v4",
    outline2: "Next.js",
    outline3: "TypeScript",
    accent1: "Open Source",
    accent2: "Licencia MIT",
  },
  tabs: {
    labels: ["Resumen", "API", "Ejemplos"],
    paragraphs: [
      "Pestañas totalmente accesibles sobre primitivos Ark UI. Navegación por teclado con flechas.",
      "Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content: API componible sin lógica oculta.",
      "Úsalas con iconos, badges o indicadores personalizados. Subrayado animado incluido.",
    ],
  },
  separator: {
    horizontal: "Horizontal",
    vertical: "Vertical",
  },
};
