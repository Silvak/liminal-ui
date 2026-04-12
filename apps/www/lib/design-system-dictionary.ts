export type Locale = "en" | "es";

export type DsColor = {
  name: string;
  token: string;
  description: string;
};

export type DsPrinciple = {
  index: string;
  title: string;
  body: string;
  tag: string;
};

export type DsTypeSample = {
  label: string;
  size: string;
  weight: string;
  tracking: string;
  example: string;
};

export type DsAnimItem = {
  name: string;
  className: string;
  description: string;
};

export type DesignSystemDictionary = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    overline: string;
    title1: string;
    title2: string;
    subtitle: string;
    portalLabel: string;
  };
  principles: {
    overline: string;
    title: string;
    items: DsPrinciple[];
  };
  colors: {
    overline: string;
    title: string;
    subtitle: string;
    semanticLabel: string;
    lightMode: string;
    darkMode: string;
    copyToken: string;
    copied: string;
    items: DsColor[];
  };
  typography: {
    overline: string;
    title: string;
    displayLabel: string;
    monoLabel: string;
    displayDesc: string;
    monoDesc: string;
    scaleLabel: string;
    samples: DsTypeSample[];
  };
  spacing: {
    overline: string;
    title: string;
    subtitle: string;
    baseUnit: string;
    scaleLabel: string;
    containerLabel: string;
    containerDesc: string;
    thresholdLabel: string;
  };
  glass: {
    overline: string;
    title: string;
    subtitle: string;
    blurLabel: string;
    opacityLabel: string;
    noiseLabel: string;
    examplesLabel: string;
    headerExample: string;
    codeExample: string;
    modalExample: string;
  };
  gradients: {
    overline: string;
    title: string;
    subtitle: string;
    linearLabel: string;
    radialLabel: string;
    fadeLabel: string;
    lampLabel: string;
    items: Array<{ name: string; description: string }>;
  };
  animations: {
    overline: string;
    title: string;
    subtitle: string;
    playLabel: string;
    replayLabel: string;
    principleNote: string;
    categories: Array<{
      name: string;
      items: DsAnimItem[];
    }>;
  };
  borders: {
    overline: string;
    title: string;
    subtitle: string;
    radiusLabel: string;
    squaredLabel: string;
    softLabel: string;
    pillLabel: string;
    portalLabel: string;
    windowLabel: string;
    sharedBorderLabel: string;
  };
  icons: {
    overline: string;
    title: string;
    subtitle: string;
    sizeLabel: string;
    strokeLabel: string;
    usageNote: string;
    contextLabel: string;
  };
};

export async function getDesignSystemDictionary(
  locale: Locale
): Promise<DesignSystemDictionary> {
  switch (locale) {
    case "es":
      return (await import("../dictionaries/es/design-system")).designSystemEs;
    default:
      return (await import("../dictionaries/en/design-system")).designSystemEn;
  }
}
