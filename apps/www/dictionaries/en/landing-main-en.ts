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
    core: "Core",
    edge: "Edge",
    bloom: "Bloom",
    ether: "Ether",
    drift: "Drift",
  },
  cardDemo: {
    core: {
      componentLabel: "COMPONENT",
      badge: "v2.4",
      profileCard: "System Card",
      description:
        "Baseline implementation on Ark UI primitives with predictable structure and zero lock-in.",
      tags: ["Accessible", "Themeable", "Composable"],
      saved: "★ Saved",
      save: "☆ Save",
      viewDocs: "View Docs",
      lampAlt: "Decorative lamp above core sample card",
    },
    edge: {
      componentLabel: "MODULE",
      badge: "BETA",
      profileCard: "Action Panel",
      description:
        "Sharp visual hierarchy for high-contrast UIs, optimized for fast scanning and direct actions.",
      tags: ["Reactive", "Stateless", "Fast"],
      saved: "★ Pinned",
      save: "☆ Pin",
      viewDocs: "Run Now",
      lampAlt: "Decorative lamp above edge sample card",
    },
    bloom: {
      componentLabel: "WIDGET",
      badge: "NEW",
      profileCard: "Creator Card",
      description:
        "Playful composition layer for expressive interfaces, balancing vivid accents and clear content.",
      tags: ["Colorful", "Playful", "Modular"],
      saved: "★ Favorited",
      save: "☆ Favorite",
      viewDocs: "Explore",
      lampAlt: "Decorative lamp above bloom sample card",
    },
    ether: {
      componentLabel: "ELEMENT",
      badge: "ALPHA",
      profileCard: "Data Lens",
      description:
        "Soft glass-like presentation for layered contexts, designed for focus without heavy chrome.",
      tags: ["Fluid", "Minimal", "Layered"],
      saved: "★ Tracked",
      save: "☆ Track",
      viewDocs: "Inspect",
      lampAlt: "Decorative lamp above ether sample card",
    },
    drift: {
      componentLabel: "BLOCK",
      badge: "STABLE",
      profileCard: "Activity Feed",
      description:
        "Rounded and adaptive composition tuned for comfortable reading in long, mixed-content streams.",
      tags: ["Adaptive", "Smooth", "Semantic"],
      saved: "★ Following",
      save: "☆ Follow",
      viewDocs: "Details",
      lampAlt: "Decorative lamp above drift sample card",
    },
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

export const landingHomeParallaxEn = {
  overline: "LIMINAL UI",
  title: "Open components. Ark UI + Tailwind. You own the source.",
};

export const landingContactEn = {
  overline: "CONTACT",
  title: "Let's talk.",
  body: "Questions about the library, contributions, or collaborations — reach out by email or on GitHub.",
  emailCta: "Email",
  githubCta: "GitHub",
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
