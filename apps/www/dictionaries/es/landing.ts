import type { LandingDictionary } from "../../lib/landing-dictionary";

export const landingEs: LandingDictionary = {
  meta: {
    title: "Liminal UI — Crea interfaces que te pertenecen",
    description:
      "Componentes React para copiar y pegar, con Ark UI y Tailwind CSS. Sin cajas negras: solo código fuente que controlas.",
  },
  hero: {
    sysVersion: "SYS.v0.15.0",
    arkTw: "ARK UI / TW CSS",
    online: "EN LÍNEA",
    liminalUi: "LIMINAL.UI",
    pillLabel: "Biblioteca de componentes — Tu UI, tu código",
    title1: "LIMINAL",
    title2: "UI SYSTEM",
    descriptor1Line1: "Componentes React para copiar y pegar.",
    descriptor1Line2: "Sin cajas negras.",
    descriptor2Line1: "Basados en primitivos Ark UI.",
    descriptor2Line2: "Estilizados con Tailwind v4.",
    ctaInit: "Iniciar",
    ctaBrowse: "Ver componentes",
    coord: "COORD: 40.7128°N / 74.0060°W",
    thresholdState: "// ESTADO LÍMITE",
    scroll: "DESPLAZAR",
  },
  philosophy: {
    overline: "§ DOCTRINA CORE",
    titleLine1: "LA DOCTRINA",
    titleLine2: "LIMINAL",
    pillars: [
      {
        index: "01",
        title: "DISEÑO EN EL UMBRAL",
        body: "Operamos en el espacio entre la utilidad cruda y la estética refinada. Liminal UI habita el umbral: no es un framework ni una librería al uso. Código que copias, adaptas y posees de verdad.",
        tag: "// FILOSOFÍA",
      },
      {
        index: "02",
        title: "CERO CAJAS NEGRAS",
        body: "Cada componente vive en tu repositorio. No hay dependencia en runtime que actualizar. No hay opiniones propietarias escondidas en node_modules. Solo código fuente: transparente, modificable, tuyo.",
        tag: "// PROPIEDAD",
      },
      {
        index: "03",
        title: "LIBERTAD ESTRUCTURADA",
        body: "Ark UI lleva la lógica. Tailwind lleva la estética. Tú llevas la visión. Los primitivos son invisibles; solo queda la geometría de tu interfaz.",
        tag: "// ARQUITECTURA",
      },
    ],
    footerQuote:
      "> Pensado para desarrolladores que creen que la distancia entre idea e interfaz debe ser mínima.",
    footerBadge: "ESTADO LÍMITE ACTIVO",
  },
  showcase: {
    overline: "§ LABORATORIO DE COMPONENTES",
    titleLine1: "QUÉ INCLUYE",
    titleLine2: "EL SISTEMA",
    subtitle: "Elige un componente. Ajusta sus props. Ve el resultado en vivo.",
    livePreview: "// VISTA PREVIA EN VIVO",
    interactive: "INTERACTIVO",
    footerText: "Todos los componentes son accesibles por defecto",
    viewAll: "Ver todos →",
    components: [
      { name: "Button", category: "Acción", count: "5 variantes" },
      { name: "Alert", category: "Retroalimentación", count: "4 variantes" },
      { name: "Card", category: "Layout", count: "composable" },
      { name: "Badge", category: "Etiqueta", count: "3 variantes" },
      { name: "Tabs", category: "Navegación", count: "animado" },
      { name: "Separator", category: "Layout", count: "decorativo" },
    ],
  },
  architecture: {
    overline: "§ ARQUITECTURA DEL SISTEMA",
    titleLine1: "EL BLUEPRINT",
    titleLine2: "DEL STACK",
    intro:
      "Liminal UI no es una dependencia en runtime: es una arquitectura por capas que respeta tu propiedad en cada nivel. Desde la capa de renderizado hasta el sustrato de CSS.",
    notes: [
      "No requiere runtime propietario",
      "Compatible con tree-shaking",
      "Cero configuración para empezar",
      "Funciona con cualquier proyecto Tailwind",
    ],
    stack: [
      {
        layer: "L1",
        name: "TU CÓDIGO",
        description:
          "Los componentes viven en tu repo. Visibles, editables, eliminables.",
        width: "100%",
      },
      {
        layer: "L2",
        name: "TAILWIND CSS v4",
        description:
          "Configuración CSS-first. Design tokens como variables CSS.",
        width: "82%",
      },
      {
        layer: "L3",
        name: "PRIMITIVOS ARK UI",
        description:
          "Lógica headless. ARIA-compliant. Agnóstico al framework.",
        width: "65%",
      },
      {
        layer: "L4",
        name: "REACT / NEXT.JS",
        description: "Soporte de primera clase. Componentes server y client.",
        width: "50%",
      },
    ],
    noteLabel: "NOTA:",
    noteText: "Solo L1 existe en tu proyecto. Las capas 2–4 son peer deps.",
  },
  metrics: {
    overline: "§ TELEMETRÍA",
    watermark: "DATA",
    stats: [
      { value: "15+", label: "Componentes", sub: "listos para producción" },
      { value: "0", label: "Cajas negras", sub: "todo visible" },
      { value: "100%", label: "Propiedad", sub: "copia a tu repo" },
      { value: "∞", label: "Adaptable", sub: "sin dep en runtime" },
    ],
    terminalTitle: "TERMINAL — liminal-ui v0.15.0",
    terminalLine1: "init",
    terminalOutput1: "✓ Dependencias resueltas",
    terminalOutput2: "✓ Copiado a ./components/ui/button.tsx",
    terminalOutput3: "✓ Listo. Sin ataduras.",
  },
  cta: {
    overline: "§ PROTOCOLO DE INICIALIZACIÓN",
    titleLine1: "EMPIEZA",
    titleLine2: "A CONSTRUIR.",
    sub: "Dos comandos. Propiedad total. Componentes que respetan tu arquitectura.",
    ctaGetStarted: "Comenzar",
    ctaGitHub: "GitHub ↗",
    footer: "Open source · Licencia MIT · No requiere cuenta",
  },
  carousel: {
    items: [
      { iconKey: "Terminal", label: "REACT 19" },
      { iconKey: "Layers", label: "ARK UI" },
      { iconKey: "Wind", label: "TAILWIND V4" },
      { iconKey: "Clipboard", label: "COPY-PASTE" },
      { iconKey: "Box", label: "COMPOSABLE" },
      { iconKey: "Lock", label: "ZERO LOCK-IN" },
      { iconKey: "Cpu", label: "HEADLESS" },
      { iconKey: "FileCode", label: "SOURCE OWNED" },
      { iconKey: "GitBranch", label: "OPEN SOURCE" },
    ],
  },
};
