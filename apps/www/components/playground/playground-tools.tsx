"use client";

import * as React from "react";
import { RotateCcw, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePlaygroundStore } from "../../store/playground";
import type { ThemeVars, ShadowConfig } from "./theme-presets";

// ─── Editable color row: swatch + text input ──────────────────────────────────

interface ColorRowProps {
  value: string;
  varKey: keyof ThemeVars;
  onChange: (key: keyof ThemeVars, value: string) => void;
}

function ColorRow({ value, varKey, onChange }: ColorRowProps) {
  const [localValue, setLocalValue] = React.useState(value);

  // Sync when external value changes (e.g. preset switch)
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const commit = () => {
    const trimmed = localValue.trim();
    if (trimmed && trimmed !== value) {
      onChange(varKey, trimmed);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Color swatch — opens native color picker */}
      <div
        className="h-8 w-8 shrink-0 border border-border cursor-pointer overflow-hidden relative"
        style={{ backgroundColor: value }}
        title={value}
      >
        <input
          type="color"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          onChange={(e) => onChange(varKey, e.target.value)}
        />
      </div>
      {/* Editable text field */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className="flex-1 h-7 px-2 border border-input bg-background text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring min-w-0"
      />
    </div>
  );
}

// ─── Color group with bottom separator ───────────────────────────────────────

interface ColorGroupProps {
  title: string;
  entries: { key: keyof ThemeVars; label: string }[];
  themeVars: ThemeVars;
  onChange: (key: keyof ThemeVars, value: string) => void;
  isLast?: boolean;
}

function ColorGroup({ title, entries, themeVars, onChange, isLast }: ColorGroupProps) {
  return (
    <div className={cn("space-y-2.5", !isLast && "pb-4 border-b border-border")}>
      <p className="text-xs font-semibold text-foreground">{title}</p>
      <div className="space-y-2">
        {entries.map(({ key, label }) => (
          <div key={key} className="space-y-1">
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <ColorRow
              value={themeVars[key] ?? "oklch(0.5 0 0)"}
              varKey={key}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Slider + numeric field combo ────────────────────────────────────────────

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

function SliderField({ label, value, onChange, min, max, step, unit }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 accent-primary h-1.5 cursor-pointer"
        />
        <div className="flex items-center gap-1 shrink-0">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-16 h-7 border border-input bg-background px-1.5 text-xs font-mono text-foreground text-right focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-xs text-muted-foreground w-7 shrink-0">{unit}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Color groups config ──────────────────────────────────────────────────────

const COLOR_GROUPS: { title: string; entries: { key: keyof ThemeVars; label: string }[] }[] = [
  {
    title: "Primary Colors",
    entries: [
      { key: "primary", label: "Primary" },
      { key: "primary-foreground", label: "Primary Foreground" },
    ],
  },
  {
    title: "Secondary Colors",
    entries: [
      { key: "secondary", label: "Secondary" },
      { key: "secondary-foreground", label: "Secondary Foreground" },
    ],
  },
  {
    title: "Accent Colors",
    entries: [
      { key: "accent", label: "Accent" },
      { key: "accent-foreground", label: "Accent Foreground" },
    ],
  },
  {
    title: "Base Colors",
    entries: [
      { key: "background", label: "Background" },
      { key: "foreground", label: "Foreground" },
    ],
  },
  {
    title: "Card Colors",
    entries: [
      { key: "card", label: "Card Background" },
      { key: "card-foreground", label: "Card Foreground" },
    ],
  },
  {
    title: "Popover Colors",
    entries: [
      { key: "popover", label: "Popover Background" },
      { key: "popover-foreground", label: "Popover Foreground" },
    ],
  },
  {
    title: "Muted Colors",
    entries: [
      { key: "muted", label: "Muted" },
      { key: "muted-foreground", label: "Muted Foreground" },
    ],
  },
  {
    title: "Destructive Colors",
    entries: [
      { key: "destructive", label: "Destructive" },
      { key: "destructive-foreground", label: "Destructive Foreground" },
    ],
  },
  {
    title: "Border & Input Colors",
    entries: [
      { key: "border", label: "Border" },
      { key: "input", label: "Input" },
      { key: "ring", label: "Ring" },
    ],
  },
  {
    title: "Chart Colors",
    entries: [
      { key: "chart-1", label: "Chart 1" },
      { key: "chart-2", label: "Chart 2" },
      { key: "chart-3", label: "Chart 3" },
      { key: "chart-4", label: "Chart 4" },
      { key: "chart-5", label: "Chart 5" },
    ],
  },
  {
    title: "Sidebar Colors",
    entries: [
      { key: "sidebar", label: "Sidebar Background" },
      { key: "sidebar-foreground", label: "Sidebar Foreground" },
      { key: "sidebar-primary", label: "Sidebar Primary" },
      { key: "sidebar-primary-foreground", label: "Sidebar Primary FG" },
      { key: "sidebar-accent", label: "Sidebar Accent" },
      { key: "sidebar-accent-foreground", label: "Sidebar Accent FG" },
      { key: "sidebar-border", label: "Sidebar Border" },
      { key: "sidebar-ring", label: "Sidebar Ring" },
    ],
  },
];

// ─── Tab panels ───────────────────────────────────────────────────────────────

function ColorsPanel() {
  const { themeVars, setThemeVar, resetToPreset } = usePlaygroundStore();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
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
      {COLOR_GROUPS.map((group, i) => (
        <ColorGroup
          key={group.title}
          title={group.title}
          entries={group.entries}
          themeVars={themeVars}
          onChange={setThemeVar}
          isLast={i === COLOR_GROUPS.length - 1}
        />
      ))}
    </div>
  );
}

const SANS_FONTS = [
  "Geist Sans",
  "Inter",
  "Space Grotesk",
  "Outfit",
  "Plus Jakarta Sans",
  "DM Sans",
  "Sora",
  "Nunito Sans",
];

const SERIF_FONTS = [
  "Georgia",
  "Playfair Display",
  "Merriweather",
  "Lora",
  "Source Serif 4",
  "Libre Baskerville",
  "Crimson Text",
];

const MONO_FONTS = [
  "Geist Mono",
  "JetBrains Mono",
  "Fira Code",
  "Source Code Pro",
  "IBM Plex Mono",
  "Space Mono",
  "Roboto Mono",
];

interface FontSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

function FontSelect({ label, value, options, onChange }: FontSelectProps) {
  return (
    <div className="space-y-1">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 pl-2 pr-6 border border-input bg-background text-xs text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {options.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </div>
  );
}

function TypographyPanel() {
  const {
    letterSpacing,
    setLetterSpacing,
    fontSans,
    fontSerif,
    fontMono,
    setFontSans,
    setFontSerif,
    setFontMono,
  } = usePlaygroundStore();

  return (
    <div className="p-4 space-y-5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Typography
      </p>

      {/* Font Family selectors */}
      <div className="pb-4 border-b border-border space-y-3">
        <p className="text-xs font-semibold text-foreground">Font Family</p>
        <div className="space-y-2">
          <FontSelect
            label="Sans-serif"
            value={fontSans}
            options={SANS_FONTS}
            onChange={setFontSans}
          />
          <FontSelect
            label="Serif"
            value={fontSerif}
            options={SERIF_FONTS}
            onChange={setFontSerif}
          />
          <FontSelect
            label="Monospace"
            value={fontMono}
            options={MONO_FONTS}
            onChange={setFontMono}
          />
        </div>
      </div>

      {/* Letter Spacing */}
      <SliderField
        label="Letter Spacing"
        value={letterSpacing}
        onChange={setLetterSpacing}
        min={-0.1}
        max={0.5}
        step={0.01}
        unit="em"
      />
    </div>
  );
}

function OtherPanel() {
  const { radius, spacing, shadow, setRadius, setSpacing, setShadowProp } =
    usePlaygroundStore();

  const shadowNumericFields: {
    key: keyof ShadowConfig;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
  }[] = [
    { key: "x", label: "X", unit: "px", min: -50, max: 50, step: 1 },
    { key: "y", label: "Y", unit: "px", min: -50, max: 50, step: 1 },
    { key: "blur", label: "Blur", unit: "px", min: 0, max: 100, step: 1 },
    { key: "spread", label: "Spread", unit: "px", min: -50, max: 50, step: 1 },
    { key: "opacity", label: "Opacity", unit: "", min: 0, max: 1, step: 0.01 },
  ];

  return (
    <div className="p-4 space-y-5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Other
      </p>

      {/* Radius */}
      <div className="pb-4 border-b border-border">
        <SliderField
          label="Radius"
          value={radius}
          onChange={setRadius}
          min={0}
          max={2}
          step={0.125}
          unit="rem"
        />
      </div>

      {/* Spacing */}
      <div className="pb-4 border-b border-border">
        <SliderField
          label="Spacing"
          value={spacing}
          onChange={setSpacing}
          min={0}
          max={1}
          step={0.05}
          unit="rem"
        />
      </div>

      {/* Shadow */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground">Shadow</p>

        {/* Shadow color swatch */}
        <div className="space-y-1">
          <span className="text-[11px] text-muted-foreground">Color</span>
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 shrink-0 border border-border cursor-pointer overflow-hidden relative"
              style={{ backgroundColor: shadow.color }}
              title={shadow.color}
            >
              <input
                type="color"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => setShadowProp("color", e.target.value)}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground truncate flex-1">
              {shadow.color}
            </span>
          </div>
        </div>

        {/* Shadow sliders */}
        <div className="space-y-3">
          {shadowNumericFields.map(({ key, label, unit, min, max, step }) => (
            <div key={key} className="space-y-1.5">
              <span className="text-[11px] text-muted-foreground">{label}</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={shadow[key] as number}
                  onChange={(e) =>
                    setShadowProp(key, parseFloat(e.target.value))
                  }
                  className="flex-1 accent-primary h-1.5 cursor-pointer"
                />
                <div className="flex items-center gap-1 shrink-0">
                  <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={shadow[key] as number}
                    onChange={(e) =>
                      setShadowProp(key, parseFloat(e.target.value) || 0)
                    }
                    className="w-14 h-7 border border-input bg-background px-1.5 text-xs font-mono text-foreground text-right focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  {unit && (
                    <span className="text-[11px] text-muted-foreground w-5 shrink-0">
                      {unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function PlaygroundTools() {
  const { activeToolTab, setActiveToolTab } = usePlaygroundStore();

  const tabs = [
    { id: "colors" as const, label: "Colors" },
    { id: "typography" as const, label: "Typography" },
    { id: "other" as const, label: "Other" },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Tab bar */}
      <div className="flex border-b border-border shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveToolTab(tab.id)}
            className={cn(
              "flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px",
              activeToolTab === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {activeToolTab === "colors" && <ColorsPanel />}
        {activeToolTab === "typography" && <TypographyPanel />}
        {activeToolTab === "other" && <OtherPanel />}
      </div>
    </div>
  );
}
