"use client";

import * as React from "react";
import { RotateCcw, Sun, Moon, LayoutDashboard, LayoutGrid } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { usePlaygroundStore, type PlaygroundLayout, type PlaygroundMode } from "../../store/playground";
import { THEME_PRESETS, type ThemeVars } from "./theme-presets";

function oklchToHex(oklch: string): string {
  // Fallback: return a neutral hex if we can't parse
  // Color pickers show hex; we store oklch. We use a simple mapping for display.
  return "#888888";
}

interface ColorSwatchProps {
  label: string;
  varKey: keyof ThemeVars;
  value: string;
  onChange: (key: keyof ThemeVars, value: string) => void;
}

function ColorSwatch({ label, varKey, value, onChange }: ColorSwatchProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground truncate flex-1">{label}</span>
      <div
        className="h-6 w-6 rounded border border-border cursor-pointer shrink-0 overflow-hidden relative"
        title={value}
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={(e) => {
            // Convert hex to oklch approximation via CSS
            onChange(varKey, e.target.value);
          }}
        />
      </div>
    </div>
  );
}

const COLOR_VARS: { label: string; key: keyof ThemeVars }[] = [
  { label: "Background", key: "background" },
  { label: "Foreground", key: "foreground" },
  { label: "Primary", key: "primary" },
  { label: "Primary FG", key: "primary-foreground" },
  { label: "Secondary", key: "secondary" },
  { label: "Accent", key: "accent" },
  { label: "Muted", key: "muted" },
  { label: "Card", key: "card" },
  { label: "Border", key: "border" },
  { label: "Destructive", key: "destructive" },
];

export function PlaygroundTools() {
  const {
    activeLayout,
    activePreset,
    themeVars,
    radius,
    mode,
    setActiveLayout,
    setPreset,
    setThemeVar,
    setRadius,
    setMode,
    resetToPreset,
  } = usePlaygroundStore();

  return (
    <div className="flex flex-col h-full bg-background border-border">
      {/* Layout tabs */}
      <div className="p-4 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Layout
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveLayout("dashboard")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors",
              activeLayout === "dashboard"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
            )}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveLayout("cards")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors",
              activeLayout === "cards"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Cards
          </button>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="p-4 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Mode
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("light")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors",
              mode === "light"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
            )}
          >
            <Sun className="h-3.5 w-3.5" />
            Light
          </button>
          <button
            onClick={() => setMode("dark")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors",
              mode === "dark"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
            )}
          >
            <Moon className="h-3.5 w-3.5" />
            Dark
          </button>
        </div>
      </div>

      {/* Preset selector */}
      <div className="p-4 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Theme Preset
        </p>
        <div className="flex flex-col gap-1.5">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setPreset(preset.name)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm border transition-colors text-left",
                activePreset === preset.name
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
              )}
            >
              <span
                className="h-3.5 w-3.5 rounded-full shrink-0 border border-white/20"
                style={{
                  backgroundColor:
                    mode === "light"
                      ? preset.light.primary
                      : preset.dark.primary,
                }}
              />
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Border radius */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Border Radius
          </p>
          <span className="text-xs text-muted-foreground font-mono">
            {radius.toFixed(2)}rem
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1.5}
          step={0.125}
          value={radius}
          onChange={(e) => setRadius(parseFloat(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">0</span>
          <span className="text-xs text-muted-foreground">1.5rem</span>
        </div>
      </div>

      {/* Colors */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Colors
          </p>
          <button
            onClick={resetToPreset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Reset to preset"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {COLOR_VARS.map(({ label, key }) => (
            <ColorSwatch
              key={key}
              label={label}
              varKey={key}
              value={themeVars[key] ?? "oklch(0.5 0 0)"}
              onChange={(k, v) => setThemeVar(k, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
