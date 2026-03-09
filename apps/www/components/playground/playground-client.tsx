"use client";

import * as React from "react";
import {
  LayoutDashboard,
  LayoutGrid,
  Sun,
  Moon,
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { usePlaygroundStore } from "../../store/playground";
import { THEME_PRESETS } from "./theme-presets";
import { PlaygroundTools } from "./playground-tools";
import { PlaygroundPreview } from "./playground-preview";
import { Switch } from "../ui/switch";

// ─── Shared sub-components ────────────────────────────────────────────────────

function PresetSelect() {
  const { activePreset, mode, setPreset } = usePlaygroundStore();
  const items = THEME_PRESETS.map((p) => ({
    value: p.name,
    label: p.label,
    primaryColor: mode === "light" ? p.light.primary : p.dark.primary,
  }));

  return (
    <div className="relative">
      <select
        value={activePreset}
        onChange={(e) => setPreset(e.target.value)}
        className="h-8 pl-8 pr-6 border border-input bg-background/50 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border border-white/20"
        style={{
          backgroundColor:
            items.find((i) => i.value === activePreset)?.primaryColor ??
            "oklch(0.5 0 0)",
        }}
      />
      <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
    </div>
  );
}

function LayoutTabs() {
  const { activeLayout, setActiveLayout } = usePlaygroundStore();
  return (
    <div className="flex items-center border border-border">
      <button
        onClick={() => setActiveLayout("dashboard")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors border-r border-border",
          activeLayout === "dashboard"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <LayoutDashboard className="h-3.5 w-3.5" />
        Dashboard
      </button>
      <button
        onClick={() => setActiveLayout("cards")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors",
          activeLayout === "cards"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        Cards
      </button>
    </div>
  );
}

function DarkModeSwitch() {
  const { mode, setMode } = usePlaygroundStore();
  return (
    <div className="flex items-center gap-2">
      <Sun className="h-3.5 w-3.5 text-muted-foreground" />
      <Switch
        checked={mode === "dark"}
        onCheckedChange={(details) =>
          setMode(details.checked ? "dark" : "light")
        }
        className="scale-90"
      />
      <Moon className="h-3.5 w-3.5 text-muted-foreground" />
    </div>
  );
}

// ─── Copy config button ───────────────────────────────────────────────────────

function CopyConfigButton() {
  const [copied, setCopied] = React.useState(false);
  const store = usePlaygroundStore();

  const handleCopy = async () => {
    const {
      themeVars,
      radius,
      spacing,
      letterSpacing,
      shadow,
      fontSans,
      fontSerif,
      fontMono,
    } = store;

    const fontSansValue =
      fontSans === "Geist Sans"
        ? "var(--font-geist-sans), ui-sans-serif, sans-serif"
        : `"${fontSans}", ui-sans-serif, sans-serif`;
    const fontSerifValue =
      fontSerif === "Georgia"
        ? "ui-serif, Georgia, Cambria, serif"
        : `"${fontSerif}", ui-serif, Georgia, serif`;
    const fontMonoValue =
      fontMono === "Geist Mono"
        ? "var(--font-geist-mono), ui-monospace, monospace"
        : `"${fontMono}", ui-monospace, monospace`;

    const { color, x, y, blur, spread, opacity } = shadow;
    const shadowValue = `${x}px ${y}px ${blur}px ${spread}px ${color.replace("oklch(", "oklch(").replace(")", ` / ${opacity})`)}`;

    const colorLines = Object.entries(themeVars)
      .map(([k, v]) => `  --${k}: ${v};`)
      .join("\n");

    const css = `:root {
${colorLines}
  --radius: ${radius}rem;
  --spacing: ${spacing}rem;
  --tracking-normal: ${letterSpacing}em;
  --font-sans: ${fontSansValue};
  --font-serif: ${fontSerifValue};
  --font-mono: ${fontMonoValue};
  --shadow-color: ${color};
  --shadow-opacity: ${opacity};
  --shadow-sm: ${shadowValue};
  --shadow: ${shadowValue};
  --shadow-md: ${shadowValue};
  --shadow-lg: ${shadowValue};
}`;

    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing silently
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy CSS config"
      className="flex items-center gap-1.5 h-8 px-2.5 border border-input bg-background/50 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      <span className="hidden lg:inline">{copied ? "Copied!" : "Copy CSS"}</span>
    </button>
  );
}

// ─── Desktop top bar ──────────────────────────────────────────────────────────

function DesktopTopBar() {
  return (
    <div className="hidden md:flex items-center justify-between px-3 py-2 border-b border-border bg-background/70 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-2">
        <PresetSelect />
        <CopyConfigButton />
      </div>
      <div className="flex items-center gap-3">
        <LayoutTabs />
        <DarkModeSwitch />
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function PlaygroundClient() {
  const [mobileToolsOpen, setMobileToolsOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Desktop top bar */}
      <DesktopTopBar />

      {/* Main content: sidebar + preview */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-72 md:shrink-0 border-r border-border overflow-hidden">
          <PlaygroundTools />
        </aside>

        {/* Preview area */}
        <main className="flex-1 overflow-auto scrollbar-hide min-h-0">
          <PlaygroundPreview />
        </main>

        {/* Mobile bottom panel */}
        <div className="md:hidden flex flex-col border-t border-border bg-background shrink-0">
          {/* Mobile controls row */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <PresetSelect />
            <DarkModeSwitch />
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setMobileToolsOpen((prev) => !prev)}
            className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            aria-expanded={mobileToolsOpen}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span>Theme Tools</span>
            </div>
            {mobileToolsOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {/* Collapsible tools */}
          {mobileToolsOpen && (
            <div className="max-h-[55vh] overflow-hidden border-t border-border">
              <PlaygroundTools />
            </div>
          )}

          {/* Mobile layout tabs */}
          <div className="flex items-center justify-center gap-2 px-4 py-2 border-t border-border">
            <LayoutTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
