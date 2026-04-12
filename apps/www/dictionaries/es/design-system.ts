import type { DesignSystemDictionary } from "../../lib/design-system-dictionary";

export const designSystemEs: DesignSystemDictionary = {
  meta: {
    title: "Sistema de Diseño — Liminal UI",
    description:
      "El lenguaje visual de Liminal UI: degradados, cristal, transiciones y la estética de los umbrales.",
  },
  hero: {
    overline: "Sistema de Diseño",
    title1: "La Estética",
    title2: "Liminal",
    subtitle:
      "Liminal UI existe en el espacio entre estados — un lenguaje de diseño de umbral construido sobre degradados suaves, vidrio esmerilado, animaciones transitorias y la geometría quieta de puertas y ventanas.",
    portalLabel: "Umbral",
  },
  principles: {
    overline: "Fundamentos",
    title: "Seis Principios Liminales",
    items: [
      {
        index: "01",
        title: "Umbral",
        body: "Cada superficie es un pasaje. Los bordes y marcos actúan como puertas — nunca decorativos, siempre con propósito.",
        tag: "Estructura",
      },
      {
        index: "02",
        title: "Translucidez",
        body: "La transparencia revela profundidad sin exponerlo todo. El cristal esmerilado crea espacio por capas.",
        tag: "Superficies",
      },
      {
        index: "03",
        title: "Degradado",
        body: "El color transiciona lentamente, nunca bruscamente. Los degradados sugieren movimiento entre estados, luz y atmósfera.",
        tag: "Color",
      },
      {
        index: "04",
        title: "Quietud",
        body: "Las animaciones son transitorias y sutiles. El movimiento marca el cambio sin exigir atención.",
        tag: "Movimiento",
      },
      {
        index: "05",
        title: "Espacio",
        body: "El espacio vacío no es ausencia — es campo. El espaciado generoso preserva el sentido liminal de paso.",
        tag: "Layout",
      },
      {
        index: "06",
        title: "Legibilidad",
        body: "La tipografía es clara y tranquila. Las etiquetas monoespaciadas anclan el sistema; el texto display lo abre.",
        tag: "Tipografía",
      },
    ],
  },
  colors: {
    overline: "Color",
    title: "Paleta Semántica",
    subtitle:
      "Todos los colores usan oklch para uniformidad perceptual. Los tokens se adaptan automáticamente entre los modos claro y oscuro.",
    semanticLabel: "Tokens semánticos",
    lightMode: "Claro",
    darkMode: "Oscuro",
    copyToken: "Copiar",
    copied: "Copiado",
    items: [
      {
        name: "Fondo",
        token: "--background",
        description: "Base de página y superficie",
      },
      {
        name: "Primer plano",
        token: "--foreground",
        description: "Texto e iconos principales",
      },
      {
        name: "Primario",
        token: "--primary",
        description: "Acento de marca, foco interactivo",
      },
      {
        name: "Texto primario",
        token: "--primary-foreground",
        description: "Texto sobre superficies primarias",
      },
      {
        name: "Silenciado",
        token: "--muted",
        description: "Áreas de fondo sutil",
      },
      {
        name: "Texto silenciado",
        token: "--muted-foreground",
        description: "Etiquetas y sugerencias atenuadas",
      },
      {
        name: "Tarjeta",
        token: "--card",
        description: "Fondo de superficie elevada",
      },
      {
        name: "Borde",
        token: "--border",
        description: "Líneas, divisores, marcos",
      },
      {
        name: "Acento",
        token: "--accent",
        description: "Color de resaltado secundario",
      },
      {
        name: "Anillo",
        token: "--ring",
        description: "Anillo indicador de foco",
      },
      {
        name: "Destructivo",
        token: "--destructive",
        description: "Estados de error y peligro",
      },
    ],
  },
  typography: {
    overline: "Tipografía",
    title: "Sistema Tipográfico",
    displayLabel: "Geist Sans — Display",
    monoLabel: "Geist Mono — UI y Etiquetas",
    displayDesc:
      "Usado para titulares, títulos y texto expresivo. Tracking amplio en tamaños grandes, ajustado en pequeños.",
    monoDesc:
      "Usado para etiquetas, metadatos, código y copy de interfaz. Mayúsculas con tracking amplio.",
    scaleLabel: "Escala tipográfica",
    samples: [
      {
        label: "Display XL",
        size: "text-9xl",
        weight: "font-semibold",
        tracking: "tracking-tight",
        example: "Liminal",
      },
      {
        label: "Display L",
        size: "text-7xl",
        weight: "font-semibold",
        tracking: "tracking-tight",
        example: "Umbral",
      },
      {
        label: "Display M",
        size: "text-5xl",
        weight: "font-semibold",
        tracking: "tracking-tight",
        example: "Sistema de Diseño",
      },
      {
        label: "Encabezado",
        size: "text-3xl",
        weight: "font-semibold",
        tracking: "tracking-tight",
        example: "Color y Forma",
      },
      {
        label: "Subencabezado",
        size: "text-xl",
        weight: "font-medium",
        tracking: "tracking-wide",
        example: "Fundamentos",
      },
      {
        label: "Cuerpo",
        size: "text-base",
        weight: "font-normal",
        tracking: "tracking-normal",
        example: "Los espacios liminales existen entre estados definidos.",
      },
      {
        label: "Etiqueta",
        size: "text-xs",
        weight: "font-bold",
        tracking: "tracking-widest",
        example: "ETIQUETA SISTEMA",
      },
    ],
  },
  spacing: {
    overline: "Espaciado",
    title: "Espacio y Layout",
    subtitle:
      "El espacio no es vacío — es campo. Cada hueco es un umbral entre elementos.",
    baseUnit: "Unidad base: 4px (0.25rem)",
    scaleLabel: "Escala de espaciado",
    containerLabel: "Sistema de contenedor",
    containerDesc:
      "max-w-[1440px] con border-x crea un marco editorial contenido — como una ventana hacia el contenido.",
    thresholdLabel: "Umbral",
  },
  glass: {
    overline: "Cristal y Transparencia",
    title: "Vidrio Esmerilado",
    subtitle:
      "La translucidez revela capas. Las superficies de cristal usan backdrop-blur y canales alfa para crear profundidad sin opacidad.",
    blurLabel: "Intensidad de blur",
    opacityLabel: "Opacidad de superficie",
    noiseLabel: "Ruido superpuesto",
    examplesLabel: "Ejemplos de uso",
    headerExample: "Cabecera de navegación",
    codeExample: "Bloque de código",
    modalExample: "Modal / Overlay",
  },
  gradients: {
    overline: "Degradados",
    title: "Degradados Liminales",
    subtitle:
      "El color no se detiene — transiciona. Los degradados sugieren atmósfera, luz y el paso entre estados.",
    linearLabel: "Lineal",
    radialLabel: "Radial",
    fadeLabel: "Fundido en borde",
    lampLabel: "Cono de luz",
    items: [
      {
        name: "Fundido de fondo",
        description:
          "bg-gradient-to-t from-background to-transparent — usado en bordes de sección",
      },
      {
        name: "Barrido primario",
        description:
          "Degradado horizontal primary-a-transparent para separadores",
      },
      {
        name: "Resplandor radial",
        description:
          "Suave resplandor radial de lámpara desde el centro, fundido a transparente",
      },
      {
        name: "Profundidad portal",
        description:
          "Centro oscuro hacia bordes más claros, sugiriendo profundidad espacial",
      },
    ],
  },
  animations: {
    overline: "Movimiento",
    title: "Animaciones Transitorias",
    subtitle:
      "El movimiento en Liminal UI marca el cambio sin exigir atención. Las animaciones son sutiles, intencionadas y transitorias.",
    playLabel: "Reproducir",
    replayLabel: "Repetir",
    principleNote:
      "Principio liminal: las animaciones revelan en lugar de entretener. Nunca loopees a menos que el elemento sea inherentemente vivo.",
    categories: [
      {
        name: "Entrada",
        items: [
          {
            name: "Reveal Up",
            className: "animate-reveal-up",
            description:
              "Aparece desde abajo — para contenido que aparece en scroll",
          },
          {
            name: "Counter In",
            className: "animate-counter-in",
            description:
              "Escala y fundido — para métricas y pantallas numéricas",
          },
        ],
      },
      {
        name: "Ambiente",
        items: [
          {
            name: "Float Geo",
            className: "animate-float-geo",
            description:
              "Flotación vertical lenta con ligera rotación — para elementos decorativos",
          },
          {
            name: "Pulse Glow",
            className: "animate-pulse-glow",
            description:
              "Pulso de resplandor respirante — para indicadores en vivo",
          },
          {
            name: "Lamp Flicker",
            className: "",
            description:
              "Variación sutil de opacidad — simula atmósfera de luz cálida",
          },
        ],
      },
      {
        name: "Interfaz",
        items: [
          {
            name: "Terminal Blink",
            className: "animate-terminal-blink",
            description:
              "Parpadeo de cursor — para interfaces de código y terminal",
          },
          {
            name: "Scan Line",
            className: "",
            description:
              "Barrido vertical sobre superficies — referencia CRT sutil",
          },
          {
            name: "Glitch",
            className: "animate-glitch-1",
            description:
              "Distorsión de clip-path — para estados de error o transición",
          },
        ],
      },
    ],
  },
  borders: {
    overline: "Bordes y Forma",
    title: "Bloques, Puertas y Ventanas",
    subtitle:
      "Liminal UI usa geometría cuadrada por defecto. Los bordes son estructurales — enmarcan pasajes, no solo contenido.",
    radiusLabel: "Radio de borde",
    squaredLabel: "Cuadrado (por defecto)",
    softLabel: "Suave",
    pillLabel: "Píldora",
    portalLabel: "Marco portal",
    windowLabel: "Panel ventana",
    sharedBorderLabel: "Bordes compartidos",
  },
  icons: {
    overline: "Iconografía",
    title: "Sistema de Iconos",
    subtitle:
      "Los iconos son de Lucide React — trazo fino, geométrico y mínimo. Apoyan la estética liminal sin decoración.",
    sizeLabel: "Tamaños de icono",
    strokeLabel: "Grosor de trazo",
    usageNote:
      "Los iconos nunca deben llamar la atención sobre sí mismos. Etiquetan, indican y guían — nada más.",
    contextLabel: "En contexto",
  },
};
