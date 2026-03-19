export type Locale = "en" | "es";

export type LandingComponentsCopy = {
  overline: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  componentIndex: string;
  livePreview: string;
  interactive: string;
  footerLine: string;
  exploreDocs: string;
  items: Array<{ name: string; category: string; count: string }>;
  button: {
    execute: string;
    inspect: string;
    clone: string;
    size: string;
  };
  alert: {
    typeLabel: string;
    info: { label: string; msg: string };
    success: { label: string; msg: string };
    warning: { label: string; msg: string };
    error: { label: string; msg: string };
  };
  card: {
    title: string;
    subtitle: string;
    body: string;
    cancel: string;
    save: string;
    headerToggle: string;
    footerToggle: string;
  };
  badge: {
    variant: string;
    solid: string;
    outline: string;
    accent: string;
    outline1: string;
    outline2: string;
    outline3: string;
    accent1: string;
    accent2: string;
  };
  tabs: {
    labels: [string, string, string];
    paragraphs: [string, string, string];
  };
  separator: {
    horizontal: string;
    vertical: string;
  };
};

export type LandingThemingCopy = {
  overline: string;
  titleLine1: string;
  titleLine2: string;
  blurb: string;
  footerPresets: string;
  openPlayground: string;
  presetLabels: Record<string, string>;
  cardDemo: {
    componentLabel: string;
    profileCard: string;
    description: string;
    tags: [string, string, string];
    saved: string;
    save: string;
    viewDocs: string;
    lampAlt: string;
  };
};

export type LandingDictionary = {
  meta: {
    title: string;
    description: string;
  };
  pageHero: {
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    body: string;
    ctaStarted: string;
    ctaComponents: string;
    panelSys: string;
    panelArkTw: string;
    panelBrand: string;
  };
  about: {
    title: string;
    description: string;
  };
  theming: LandingThemingCopy;
  components: LandingComponentsCopy;
  comingSoon: {
    overline: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    closing: string;
    imageAlt: string;
  };
  hero: {
    sysVersion: string;
    arkTw: string;
    online: string;
    liminalUi: string;
    pillLabel: string;
    title1: string;
    title2: string;
    descriptor1Line1: string;
    descriptor1Line2: string;
    descriptor2Line1: string;
    descriptor2Line2: string;
    ctaInit: string;
    ctaBrowse: string;
    coord: string;
    thresholdState: string;
    scroll: string;
  };
  philosophy: {
    overline: string;
    titleLine1: string;
    titleLine2: string;
    pillars: Array<{
      index: string;
      title: string;
      body: string;
      tag: string;
    }>;
    footerQuote: string;
    footerBadge: string;
  };
  showcase: {
    overline: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    livePreview: string;
    interactive: string;
    footerText: string;
    viewAll: string;
    components: Array<{ name: string; category: string; count: string }>;
  };
  architecture: {
    overline: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    notes: string[];
    stack: Array<{
      layer: string;
      name: string;
      description: string;
      width: string;
    }>;
    noteLabel: string;
    noteText: string;
  };
  metrics: {
    overline: string;
    watermark: string;
    stats: Array<{ value: string; label: string; sub: string }>;
    terminalTitle: string;
    terminalLine1: string;
    terminalOutput1: string;
    terminalOutput2: string;
    terminalOutput3: string;
  };
  cta: {
    overline: string;
    titleLine1: string;
    titleLine2: string;
    sub: string;
    ctaGetStarted: string;
    ctaGitHub: string;
    footer: string;
  };
  carousel: {
    items: Array<{ iconKey: string; label: string }>;
  };
};

export async function getLandingDictionary(
  locale: Locale
): Promise<LandingDictionary> {
  switch (locale) {
    case "en":
      return (await import("../dictionaries/en/landing")).landingEn;
    case "es":
      return (await import("../dictionaries/es/landing")).landingEs;
    default:
      return (await import("../dictionaries/en/landing")).landingEn;
  }
}
