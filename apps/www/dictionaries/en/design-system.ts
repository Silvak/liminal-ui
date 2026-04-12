import type { DesignSystemDictionary } from "../../lib/design-system-dictionary";

export const designSystemEn: DesignSystemDictionary = {
  meta: {
    title: "Design System — Liminal UI",
    description:
      "The visual language of Liminal UI: gradients, glass, transitions, and the aesthetic of thresholds.",
  },
  hero: {
    overline: "Design System",
    title1: "The Liminal",
    title2: "Aesthetic",
    subtitle:
      "Liminal UI exists in the space between states — a threshold design language built on soft gradients, frosted glass, transitory animations, and the quiet geometry of doors and windows.",
    portalLabel: "Threshold",
  },
  principles: {
    overline: "Foundations",
    title: "Six Liminal Principles",
    items: [
      {
        index: "01",
        title: "Threshold",
        body: "Every surface is a passage. Borders and frames act as doorways — never decorative, always purposeful.",
        tag: "Structure",
      },
      {
        index: "02",
        title: "Translucency",
        body: "Transparency reveals depth without exposing everything. Frosted glass creates layered space.",
        tag: "Surfaces",
      },
      {
        index: "03",
        title: "Gradient",
        body: "Color transitions slowly, never sharply. Gradients suggest movement between states, light, and atmosphere.",
        tag: "Color",
      },
      {
        index: "04",
        title: "Stillness",
        body: "Animations are transitory and subtle. Motion marks change without demanding attention.",
        tag: "Motion",
      },
      {
        index: "05",
        title: "Space",
        body: "Empty space is not absence — it is field. Generous spacing preserves the liminal sense of passage.",
        tag: "Layout",
      },
      {
        index: "06",
        title: "Legibility",
        body: "Typography is clear and unhurried. Monospaced labels ground the system; display text opens it.",
        tag: "Typography",
      },
    ],
  },
  colors: {
    overline: "Color",
    title: "Semantic Palette",
    subtitle:
      "All colors use oklch for perceptual uniformity. Tokens adapt automatically between light and dark modes.",
    semanticLabel: "Semantic tokens",
    lightMode: "Light",
    darkMode: "Dark",
    copyToken: "Copy",
    copied: "Copied",
    items: [
      {
        name: "Background",
        token: "--background",
        description: "Page and surface base",
      },
      {
        name: "Foreground",
        token: "--foreground",
        description: "Primary text and icons",
      },
      {
        name: "Primary",
        token: "--primary",
        description: "Brand accent, interactive focus",
      },
      {
        name: "Primary Foreground",
        token: "--primary-foreground",
        description: "Text on primary surfaces",
      },
      {
        name: "Muted",
        token: "--muted",
        description: "Subtle background areas",
      },
      {
        name: "Muted Foreground",
        token: "--muted-foreground",
        description: "Subdued labels and hints",
      },
      {
        name: "Card",
        token: "--card",
        description: "Elevated surface background",
      },
      {
        name: "Border",
        token: "--border",
        description: "Lines, dividers, frames",
      },
      {
        name: "Accent",
        token: "--accent",
        description: "Secondary highlight color",
      },
      {
        name: "Ring",
        token: "--ring",
        description: "Focus indicator ring",
      },
      {
        name: "Destructive",
        token: "--destructive",
        description: "Error and danger states",
      },
    ],
  },
  typography: {
    overline: "Typography",
    title: "Type System",
    displayLabel: "Geist Sans — Display",
    monoLabel: "Geist Mono — UI & Labels",
    displayDesc:
      "Used for headlines, titles, and expressive text. Large tracking at big sizes, tight at small.",
    monoDesc:
      "Used for labels, metadata, code, and interface copy. Uppercase with wide tracking.",
    scaleLabel: "Type scale",
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
        example: "Threshold",
      },
      {
        label: "Display M",
        size: "text-5xl",
        weight: "font-semibold",
        tracking: "tracking-tight",
        example: "Design System",
      },
      {
        label: "Heading",
        size: "text-3xl",
        weight: "font-semibold",
        tracking: "tracking-tight",
        example: "Color & Form",
      },
      {
        label: "Subheading",
        size: "text-xl",
        weight: "font-medium",
        tracking: "tracking-wide",
        example: "Foundations",
      },
      {
        label: "Body",
        size: "text-base",
        weight: "font-normal",
        tracking: "tracking-normal",
        example: "Liminal spaces exist between defined states.",
      },
      {
        label: "Label",
        size: "text-xs",
        weight: "font-bold",
        tracking: "tracking-widest",
        example: "SYSTEM LABEL",
      },
    ],
  },
  spacing: {
    overline: "Spacing",
    title: "Space & Layout",
    subtitle:
      "Space is not emptiness — it is field. Every gap is a threshold between elements.",
    baseUnit: "Base unit: 4px (0.25rem)",
    scaleLabel: "Spacing scale",
    containerLabel: "Container system",
    containerDesc:
      "max-w-[1440px] with border-x creates a contained editorial frame — like a window into the content.",
    thresholdLabel: "Threshold",
  },
  glass: {
    overline: "Glass & Transparency",
    title: "Frosted Glass",
    subtitle:
      "Translucency reveals layers. Glass surfaces use backdrop-blur and alpha channels to create depth without opacity.",
    blurLabel: "Blur intensity",
    opacityLabel: "Surface opacity",
    noiseLabel: "Noise overlay",
    examplesLabel: "Usage examples",
    headerExample: "Navigation header",
    codeExample: "Code block",
    modalExample: "Modal / Overlay",
  },
  gradients: {
    overline: "Gradients",
    title: "Liminal Gradients",
    subtitle:
      "Color does not stop — it transitions. Gradients suggest atmosphere, light, and the passage between states.",
    linearLabel: "Linear",
    radialLabel: "Radial",
    fadeLabel: "Edge fade",
    lampLabel: "Light cone",
    items: [
      {
        name: "Background fade",
        description:
          "bg-gradient-to-t from-background to-transparent — used at section edges",
      },
      {
        name: "Primary sweep",
        description: "Horizontal primary-to-transparent gradient for separators",
      },
      {
        name: "Radial glow",
        description: "Soft radial lamp glow from center, fading to transparent",
      },
      {
        name: "Portal depth",
        description: "Dark center to lighter edges, suggesting spatial depth",
      },
    ],
  },
  animations: {
    overline: "Motion",
    title: "Transitory Animations",
    subtitle:
      "Motion in Liminal UI marks change without demanding attention. Animations are subtle, purposeful, and transitory.",
    playLabel: "Play",
    replayLabel: "Replay",
    principleNote:
      "Liminal principle: animations reveal rather than entertain. Never loop unless the element is inherently alive.",
    categories: [
      {
        name: "Entry",
        items: [
          {
            name: "Reveal Up",
            className: "animate-reveal-up",
            description: "Fade in from below — for content appearing on scroll",
          },
          {
            name: "Counter In",
            className: "animate-counter-in",
            description: "Scale and fade — for numeric or metric displays",
          },
        ],
      },
      {
        name: "Ambient",
        items: [
          {
            name: "Float Geo",
            className: "animate-float-geo",
            description:
              "Slow vertical float with slight rotation — for decorative elements",
          },
          {
            name: "Pulse Glow",
            className: "animate-pulse-glow",
            description: "Breathing glow pulse — for live indicators",
          },
          {
            name: "Lamp Flicker",
            className: "",
            description:
              "Subtle opacity variation — simulates warm light atmosphere",
          },
        ],
      },
      {
        name: "Interface",
        items: [
          {
            name: "Terminal Blink",
            className: "animate-terminal-blink",
            description: "Cursor blink — for code and terminal interfaces",
          },
          {
            name: "Scan Line",
            className: "",
            description: "Vertical scan across surfaces — subtle CRT reference",
          },
          {
            name: "Glitch",
            className: "animate-glitch-1",
            description: "Clip-path distortion — for error or transition states",
          },
        ],
      },
    ],
  },
  borders: {
    overline: "Borders & Form",
    title: "Blocks, Doors & Windows",
    subtitle:
      "Liminal UI uses square geometry by default. Borders are structural — they frame passages, not just content.",
    radiusLabel: "Border radius",
    squaredLabel: "Squared (default)",
    softLabel: "Soft",
    pillLabel: "Pill",
    portalLabel: "Portal frame",
    windowLabel: "Window panel",
    sharedBorderLabel: "Shared borders",
  },
  icons: {
    overline: "Iconography",
    title: "Icon System",
    subtitle:
      "Icons are from Lucide React — thin stroke, geometric, and minimal. They support the liminal aesthetic without decoration.",
    sizeLabel: "Icon sizes",
    strokeLabel: "Stroke width",
    usageNote:
      "Icons should never draw attention to themselves. They label, indicate, and guide — nothing more.",
    contextLabel: "In context",
  },
};
