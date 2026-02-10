export type ThemeName = "slate" | "blue" | "green";

export interface ThemePreset {
  name: ThemeName;
  label: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

// ============================================================================
// BASE NEUTRAL TOKENS (COMPARTIDOS)
// ============================================================================
const baseLight: Record<string, string> = {
  background: "0 0% 100%",
  foreground: "222.2 84% 4.9%",
  muted: "210 40% 96.1%",
  "muted-foreground": "215.4 16.3% 46.9%",
  popover: "0 0% 100%",
  "popover-foreground": "222.2 84% 4.9%",
  card: "0 0% 100%",
  "card-foreground": "222.2 84% 4.9%",
  border: "214.3 31.8% 91.4%",
  input: "214.3 31.8% 91.4%",
  secondary: "210 40% 96.1%",
  "secondary-foreground": "222.2 47.4% 11.2%",
  destructive: "0 84.2% 60.2%",
  "destructive-foreground": "210 40% 98%",
  radius: "0.5rem",
};

const baseDark: Record<string, string> = {
  background: "222.2 84% 4.9%",
  foreground: "210 40% 98%",
  muted: "217.2 32.6% 17.5%",
  "muted-foreground": "215 20.2% 65.1%",
  popover: "222.2 84% 4.9%",
  "popover-foreground": "210 40% 98%",
  card: "222.2 84% 4.9%",
  "card-foreground": "210 40% 98%",
  border: "217.2 32.6% 17.5%",
  input: "217.2 32.6% 17.5%",
  secondary: "217.2 32.6% 17.5%",
  "secondary-foreground": "210 40% 98%",
  destructive: "0 62.8% 30.6%",
  "destructive-foreground": "210 40% 98%",
};

// ============================================================================
// PRESETS
// ============================================================================
const slate: ThemePreset = {
  name: "slate",
  label: "Slate (default)",
  light: {
    ...baseLight,
    primary: "222.2 47.4% 11.2%",
    "primary-foreground": "210 40% 98%",
    accent: "210 40% 96.1%",
    "accent-foreground": "222.2 47.4% 11.2%",
    ring: "222.2 84% 4.9%",
  },
  dark: {
    ...baseDark,
    primary: "210 40% 98%",
    "primary-foreground": "222.2 47.4% 11.2%",
    accent: "217.2 32.6% 17.5%",
    "accent-foreground": "210 40% 98%",
    ring: "212.7 26.8% 83.9%",
  },
};

const blue: ThemePreset = {
  name: "blue",
  label: "Blue",
  light: {
    ...baseLight,
    primary: "221.2 83.2% 53.3%", // tailwind blue-600
    "primary-foreground": "210 40% 98%",
    accent: "210 40% 96.1%",
    "accent-foreground": "221.2 83.2% 20%",
    ring: "221.2 83.2% 53.3%",
  },
  dark: {
    ...baseDark,
    primary: "217.2 91.2% 59.8%", // brighter blue for dark
    "primary-foreground": "222.2 47.4% 11.2%",
    accent: "217.2 32.6% 17.5%",
    "accent-foreground": "210 40% 98%",
    ring: "224.3 76.3% 48%",
  },
};

const green: ThemePreset = {
  name: "green",
  label: "Green",
  light: {
    ...baseLight,
    primary: "142.1 76.2% 36.3%", // tailwind emerald-600
    "primary-foreground": "210 40% 98%",
    accent: "210 40% 96.1%",
    "accent-foreground": "142.1 76.2% 20%",
    ring: "142.1 76.2% 36.3%",
  },
  dark: {
    ...baseDark,
    primary: "142.1 70.6% 45.3%", // brighter green for dark
    "primary-foreground": "222.2 47.4% 11.2%",
    accent: "217.2 32.6% 17.5%",
    "accent-foreground": "210 40% 98%",
    ring: "143.8 61.2% 20.2%",
  },
};

export const themes: ThemePreset[] = [slate, blue, green];

// ============================================================================
// HELPERS
// ============================================================================
export function getThemeByName(name: string): ThemePreset {
  const found = themes.find((theme) => theme.name === name);
  return found ?? slate;
}

export function generateThemeCSS(preset: ThemePreset): string {
  const lines: string[] = [];

  lines.push("@layer base {");
  lines.push("  :root {");
  for (const [key, value] of Object.entries(preset.light)) {
    if (key === "radius") {
      lines.push(`    --radius: ${value};`);
    } else {
      lines.push(`    --${key}: ${value};`);
    }
  }
  lines.push("  }");
  lines.push("");
  lines.push("  .dark {");
  for (const [key, value] of Object.entries(preset.dark)) {
    if (key === "radius") {
      // radius is not overridden in dark by defecto
      continue;
    }
    lines.push(`    --${key}: ${value};`);
  }
  lines.push("  }");
  lines.push("}");
  lines.push("");
  lines.push("@layer base {");
  lines.push("  * {");
  lines.push("    border-color: hsl(var(--border));");
  lines.push("  }");
  lines.push("  body {");
  lines.push("    background-color: hsl(var(--background));");
  lines.push("    color: hsl(var(--foreground));");
  lines.push("  }");
  lines.push("}");

  return lines.join("\n");
}

