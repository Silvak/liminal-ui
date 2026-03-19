import type { LandingDictionary } from "../../lib/landing-dictionary";
import {
  landingAboutEn,
  landingComingSoonEn,
  landingComponentsEn,
  landingPageHeroEn,
  landingThemingEn,
} from "./landing-main-en";

export const landingEn: LandingDictionary = {
  meta: {
    title: "Liminal UI — Build beautiful UIs you own",
    description:
      "Copy-paste React components built with Ark UI and Tailwind CSS. No black boxes, just source code you control.",
  },
  pageHero: landingPageHeroEn,
  about: landingAboutEn,
  theming: landingThemingEn,
  components: landingComponentsEn,
  comingSoon: landingComingSoonEn,
  hero: {
    sysVersion: "SYS.v0.15.0",
    arkTw: "ARK UI / TW CSS",
    online: "ONLINE",
    liminalUi: "LIMINAL.UI",
    pillLabel: "Component Library — Own Your UI",
    title1: "LIMINAL",
    title2: "UI SYSTEM",
    descriptor1Line1: "Copy-paste React components.",
    descriptor1Line2: "No black boxes.",
    descriptor2Line1: "Built on Ark UI primitives.",
    descriptor2Line2: "Styled with Tailwind v4.",
    ctaInit: "Initialize",
    ctaBrowse: "Browse Components",
    coord: "COORD: 40.7128°N / 74.0060°W",
    thresholdState: "// THRESHOLD STATE",
    scroll: "SCROLL",
  },
  philosophy: {
    overline: "§ CORE DOCTRINE",
    titleLine1: "THE LIMINAL",
    titleLine2: "DOCTRINE",
    pillars: [
      {
        index: "01",
        title: "THRESHOLD DESIGN",
        body: "We operate in the space between raw utility and refined aesthetics. Liminal UI inhabits the threshold — not quite framework, not quite library. Code you copy, adapt, and truly own.",
        tag: "// PHILOSOPHY",
      },
      {
        index: "02",
        title: "ZERO BLACK BOXES",
        body: "Every component lives in your repository. There is no runtime dependency to version bump. No proprietary opinions buried in node_modules. Just source code — transparent, hackable, yours.",
        tag: "// OWNERSHIP",
      },
      {
        index: "03",
        title: "STRUCTURED FREEDOM",
        body: "Ark UI handles the logic. Tailwind handles the aesthetics. You handle the vision. The primitives are invisible — only the geometry of your interface remains.",
        tag: "// ARCHITECTURE",
      },
    ],
    footerQuote:
      "> Designed for developers who believe that the gap between idea and interface should be as thin as possible.",
    footerBadge: "THRESHOLD STATE ACTIVE",
  },
  showcase: {
    overline: "§ COMPONENT LAB",
    titleLine1: "WHAT'S IN",
    titleLine2: "THE SYSTEM",
    subtitle: "Select a component. Tweak its props. See the result live.",
    livePreview: "// LIVE PREVIEW",
    interactive: "INTERACTIVE",
    footerText: "All components accessible by default",
    viewAll: "View all →",
    components: [
      { name: "Button", category: "Action", count: "5 variants" },
      { name: "Alert", category: "Feedback", count: "4 variants" },
      { name: "Card", category: "Layout", count: "composable" },
      { name: "Badge", category: "Label", count: "3 variants" },
      { name: "Tabs", category: "Navigation", count: "animated" },
      { name: "Separator", category: "Layout", count: "decorative" },
    ],
  },
  architecture: {
    overline: "§ SYSTEM ARCHITECTURE",
    titleLine1: "THE STACK",
    titleLine2: "BLUEPRINT",
    intro:
      "Liminal UI is not a runtime dependency — it's a layered architecture that respects your ownership at every level. From the rendering layer down to the raw CSS substrate.",
    notes: [
      "No proprietary runtime required",
      "Tree-shaking friendly",
      "Zero config to get started",
      "Works with any Tailwind project",
    ],
    stack: [
      {
        layer: "L1",
        name: "YOUR CODEBASE",
        description:
          "Components live in your repo. Fully visible, editable, deletable.",
        width: "100%",
      },
      {
        layer: "L2",
        name: "TAILWIND CSS v4",
        description:
          "CSS-first configuration. Design tokens as CSS variables.",
        width: "82%",
      },
      {
        layer: "L3",
        name: "ARK UI PRIMITIVES",
        description:
          "Headless logic. ARIA-compliant. Framework-agnostic.",
        width: "65%",
      },
      {
        layer: "L4",
        name: "REACT / NEXT.JS",
        description: "First-class support. Server & client components.",
        width: "50%",
      },
    ],
    noteLabel: "NOTE:",
    noteText: "Only L1 exists in your project. Layers 2–4 are peer deps.",
  },
  metrics: {
    overline: "§ TELEMETRY",
    watermark: "DATA",
    stats: [
      { value: "15+", label: "Components", sub: "production-ready" },
      { value: "0", label: "Black Boxes", sub: "everything visible" },
      { value: "100%", label: "Ownership", sub: "copy into your repo" },
      { value: "∞", label: "Adaptable", sub: "no runtime dep" },
    ],
    terminalTitle: "TERMINAL — liminal-ui v0.15.0",
    terminalLine1: "init",
    terminalOutput1: "✓ Resolved dependencies",
    terminalOutput2: "✓ Copied to ./components/ui/button.tsx",
    terminalOutput3: "✓ Ready. No lock-in.",
  },
  cta: {
    overline: "§ INITIALIZATION PROTOCOL",
    titleLine1: "START",
    titleLine2: "BUILDING.",
    sub: "Two commands. Full ownership. Components that respect your architecture.",
    ctaGetStarted: "Get Started",
    ctaGitHub: "GitHub ↗",
    footer: "Open source · MIT License · No account required",
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
