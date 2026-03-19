import type {
  LandingComponentsCopy,
  LandingThemingCopy,
} from "../../lib/landing-dictionary";

export const landingPageHeroEn = {
  title1: "LIMINAL UI",
  title2: "DESIGN",
  title3: "SYSTEM",
  subtitle: "Own every line. Ship with confidence.",
  body: "Copy-paste React components built on Ark UI primitives and styled with Tailwind v4. No wrappers, no lock-in — just clean, composable code you fully control.",
  ctaStarted: "GET STARTED",
  ctaComponents: "VIEW COMPONENTS",
  panelSys: "SYS.v0.15.0",
  panelArkTw: "ARK UI / TW CSS",
  panelBrand: "LIMINAL.UI",
};

export const landingAboutEn = {
  title: "Build clean UIs faster.",
  description:
    "Start with a minimal setup and ship reusable components with full control over your design system.",
};

export const landingThemingEn: LandingThemingCopy = {
  overline: "THEMING ENGINE",
  titleLine1: "One system.",
  titleLine2: "Infinite palettes.",
  blurb:
    "Switch between curated presets or craft your own. Every variable updates in real time — what you see is what you ship.",
  footerPresets: "{count} presets included — fully customizable",
  openPlayground: "Open Playground →",
  presetLabels: {
    default: "Default",
    ocean: "Ocean",
    forest: "Forest",
    sunset: "Sunset",
    midnight: "Midnight",
  },
  cardDemo: {
    componentLabel: "COMPONENT",
    profileCard: "Profile Card",
    description:
      "A composable card built on Ark UI primitives — accessible, themeable, zero lock-in.",
    tags: ["Accessible", "Themeable", "Composable"],
    saved: "★ Saved",
    save: "☆ Save",
    viewDocs: "View Docs",
    lampAlt: "Decorative lamp on sample card",
  },
};

export const landingComingSoonEn = {
  overline: "COMING SOON",
  titleLine1: "Full dashboards.",
  titleLine2: "Complex components.",
  body: "We're building ready-to-drop dashboard layouts and richer composite components — data tables, charts, sidebars, and multi-step flows. All built on the same primitives you already use, so they fit seamlessly into your stack.",
  closing: "Stay tuned for updates.",
  imageAlt: "Dashboard and complex components preview",
};

export const landingComponentsEn: LandingComponentsCopy = {
  overline: "COMPONENT SYSTEM",
  titleLine1: "Built to compose.",
  titleLine2: "Ready to ship.",
  description:
    "Pick a component. Adjust its props. See the result live. Every piece is accessible, themeable, and yours to own.",
  componentIndex: "Component Index",
  livePreview: "Live Preview",
  interactive: "Interactive",
  footerLine: "{count} components shown — 24+ available in docs",
  exploreDocs: "Explore Docs →",
  items: [
    { name: "Button", category: "Actions", count: "6 variants" },
    { name: "Alert", category: "Feedback", count: "4 types" },
    { name: "Card", category: "Layout", count: "Composable" },
    { name: "Badge", category: "Display", count: "3 variants" },
    { name: "Tabs", category: "Navigation", count: "Accessible" },
    { name: "Separator", category: "Layout", count: "H + V" },
  ],
  button: {
    execute: "Execute",
    inspect: "Inspect",
    clone: "Clone",
    size: "Size",
  },
  alert: {
    typeLabel: "Type",
    info: {
      label: "SYSTEM.INFO",
      msg: "Component ready. Source in ./components/ui/alert.tsx",
    },
    success: {
      label: "SYSTEM.OK",
      msg: "All checks passed. Build successful.",
    },
    warning: {
      label: "SYSTEM.WARN",
      msg: "Deprecated prop detected. See migration guide.",
    },
    error: {
      label: "SYSTEM.ERR",
      msg: "Failed to resolve dependency. Check config.",
    },
  },
  card: {
    title: "Card Title",
    subtitle: "Composable",
    body: "Card body content goes here. Fully composable — add or remove sections as needed.",
    cancel: "Cancel",
    save: "Save",
    headerToggle: "Header",
    footerToggle: "Footer",
  },
  badge: {
    variant: "Variant",
    solid: "solid",
    outline: "outline",
    accent: "accent",
    outline1: "Tailwind v4",
    outline2: "Next.js",
    outline3: "TypeScript",
    accent1: "Open Source",
    accent2: "MIT License",
  },
  tabs: {
    labels: ["Overview", "API", "Examples"],
    paragraphs: [
      "A fully accessible tab component built on Ark UI primitives. Keyboard navigable with arrow keys.",
      "Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content — composable API with zero hidden logic.",
      "Use with icons, badges, or custom indicators. Animated underline included.",
    ],
  },
  separator: {
    horizontal: "Horizontal",
    vertical: "Vertical",
  },
};
