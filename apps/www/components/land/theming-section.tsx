"use client";

import { useState } from "react";
import Link from "next/link";
import { THEME_PRESETS, type ThemePreset } from "../playground/theme-presets";
import { CodeBlock } from "../code-block";

const THEME_ACCENT_COLORS: Record<string, string> = {
  default: "oklch(0.463 0.2818 264.2203)",
  ocean: "oklch(0.48 0.18 220)",
  forest: "oklch(0.42 0.16 145)",
  sunset: "oklch(0.58 0.22 30)",
  midnight: "oklch(0.45 0.22 290)",
};

const CSS_KEYS = [
  "background",
  "foreground",
  "card",
  "primary",
  "primary-foreground",
  "muted",
  "muted-foreground",
  "border",
  "accent",
  "ring",
] as const;

function buildCssSnippet(preset: ThemePreset): string {
  const lines: string[] = [":root {"];
  for (const key of CSS_KEYS) {
    const val = preset.light[key as keyof typeof preset.light];
    if (val) lines.push(`  --${key}: ${val};`);
  }
  lines.push("}");
  lines.push("");
  lines.push(".dark {");
  for (const key of CSS_KEYS) {
    const val = preset.dark[key as keyof typeof preset.dark];
    if (val) lines.push(`  --${key}: ${val};`);
  }
  lines.push("}");
  return lines.join("\n");
}

function buildPreviewVars(preset: ThemePreset): React.CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, val] of Object.entries(preset.light)) {
    vars[`--${key}`] = val as string;
  }
  return vars as React.CSSProperties;
}

function CardDemo({ vars }: { vars: React.CSSProperties }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      style={{
        ...vars,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "inherit",
      }}
      className="w-full h-full p-6 flex items-center justify-center"
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--card-foreground)",
          borderRadius: "var(--radius)",
          width: "100%",
          maxWidth: "340px",
        }}
        className="overflow-hidden"
      >
        {/* Card header */}
        <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 20px" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                COMPONENT
              </p>
              <p
                className="font-display text-2xl tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Profile Card
              </p>
            </div>
            <span
              className="font-ibm text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                borderRadius: "var(--radius)",
              }}
            >
              v2.4
            </span>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "16px 20px" }} className="space-y-4">
          <p
            className="font-ibm text-[13px] leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            A composable card component built on Ark UI primitives. Fully
            accessible, themeable, and zero lock-in.
          </p>

          <div className="flex flex-wrap gap-2">
            {["Accessible", "Themeable", "Composable"].map((tag) => (
              <span
                key={tag}
                className="font-ibm text-[10px] uppercase tracking-[0.15em] px-2.5 py-1"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                  borderRadius: "var(--radius)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="h-px w-full" style={{ backgroundColor: "var(--border)" }} />

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center font-display text-sm"
              style={{
                backgroundColor: "var(--muted)",
                color: "var(--foreground)",
                borderRadius: "var(--radius)",
              }}
            >
              LU
            </div>
            <div>
              <p className="font-ibm text-[12px] font-bold" style={{ color: "var(--foreground)" }}>
                Liminal UI
              </p>
              <p className="font-ibm text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                Design System
              </p>
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div
          style={{ borderTop: "1px solid var(--border)", padding: "12px 20px" }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => setLiked((p) => !p)}
            className="font-ibm text-[11px] uppercase tracking-[0.15em] transition-colors"
            style={{ color: liked ? "var(--primary)" : "var(--muted-foreground)" }}
          >
            {liked ? "★ Saved" : "☆ Save"}
          </button>
          <button
            className="font-ibm text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              borderRadius: "var(--radius)",
            }}
          >
            View Docs
          </button>
        </div>
      </div>
    </div>
  );
}

export function ThemingSection({ locale }: { locale: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreset = THEME_PRESETS[activeIndex];
  const previewVars = buildPreviewVars(activePreset);
  const cssCode = buildCssSnippet(activePreset);

  return (
    <section className="w-full px-6 md:px-8">
      <div className="relative flex mx-auto h-min-content max-w-[1440px] border-x flex-col">
        {/* Header */}
        <div className="w-full border-b px-6 py-8 md:px-10">
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            THEMING ENGINE
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display leading-none tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              One system.
              <br />
              Infinite palettes.
            </h2>
            <p className="font-ibm text-[13px] leading-[1.7] text-muted-foreground md:max-w-xs md:text-right">
              Switch between curated presets or craft your own. Every variable
              updates in real time — what you see is what you ship.
            </p>
          </div>
        </div>

        {/* Theme selector */}
        <div className="w-full border-b px-6 py-4 md:px-10">
          <div className="flex flex-wrap gap-2">
            {THEME_PRESETS.map((preset, i) => {
              const accentColor = THEME_ACCENT_COLORS[preset.name] ?? "oklch(0.5 0 0)";
              const isActive = i === activeIndex;
              return (
                <button
                  key={preset.name}
                  onClick={() => setActiveIndex(i)}
                  className="flex items-center gap-2 px-4 py-2 font-ibm text-[11px] uppercase tracking-[0.15em] transition-all"
                  style={{
                    border: `1px solid ${isActive ? "var(--foreground)" : "var(--border)"}`,
                    backgroundColor: isActive ? "var(--foreground)" : "transparent",
                    color: isActive ? "var(--background)" : "var(--muted-foreground)",
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full flex flex-col md:flex-row min-h-[480px]">
          {/* Left: Card preview */}
          <div
            className="w-full md:w-[55%] md:border-r"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="h-full min-h-[360px] relative overflow-hidden">
              {/* Corner marks */}
              <div
                className="absolute top-3 right-3 h-4 w-4 border-r border-t pointer-events-none z-10"
                style={{ borderColor: "var(--primary)" }}
              />
              <div
                className="absolute bottom-3 left-3 h-4 w-4 border-l border-b pointer-events-none z-10"
                style={{ borderColor: "var(--primary)" }}
              />
              <CardDemo vars={previewVars} />
            </div>
          </div>

          {/* Right: Code block */}
          <div className="w-full md:w-[45%] flex flex-col overflow-hidden">
            {/* Live indicator bar */}
            <div
              className="flex items-center gap-2 px-5 py-2.5 border-b border-border shrink-0"
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--primary)" }}
              />
              <span className="font-ibm text-[10px] uppercase tracking-[0.2em] text-primary">
                live preview
              </span>
            </div>
            {/* Real CodeBlock with Shiki + copy button */}
            <div className="flex-1 overflow-auto [&_.code-block-glass]:my-0 [&_.code-block-glass]:border-0 [&_.code-block-glass]:border-x-0 [&_.code-block-glass]:border-b-0 [&_.code-block-glass]:rounded-none [&_.code-block-glass]:h-full">
              <CodeBlock
                code={cssCode}
                language="css"
                filename="theme.css"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full border-t px-6 py-5 md:px-10 flex items-center justify-between">
          <span className="font-ibm text-[12px] text-muted-foreground">
            {THEME_PRESETS.length} presets included — fully customizable
          </span>
          <Link
            href={`/${locale}/playground`}
            className="font-ibm text-[12px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 transition-all"
            style={{
              border: "1px solid var(--foreground)",
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            Open Playground →
          </Link>
        </div>
      </div>
    </section>
  );
}
