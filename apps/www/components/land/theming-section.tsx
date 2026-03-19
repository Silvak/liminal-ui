"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { THEME_PRESETS, type ThemePreset } from "../playground/theme-presets";
import { CodeBlock } from "../code-block";
import Image from "next/image";

const THEME_ACCENT_COLORS: Record<string, string> = {
  default: "oklch(0.463 0.2818 264.2203)",
  ocean: "oklch(0.48 0.18 220)",
  forest: "oklch(0.42 0.16 145)",
  sunset: "oklch(0.58 0.22 30)",
  midnight: "oklch(0.45 0.22 290)",
};

const CARD_SHADOWS: Record<string, string> = {
  default: "none",
  ocean: "0 4px 24px -4px oklch(0.48 0.18 220 / 0.18)",
  forest: "0 4px 20px -4px oklch(0.42 0.16 145 / 0.16)",
  sunset: "0 6px 28px -4px oklch(0.58 0.22 30 / 0.2)",
  midnight: "0 6px 32px -6px oklch(0.45 0.22 290 / 0.25)",
};

const CARD_RADIUS_OVERRIDE: Record<string, number> = {
  midnight: 1.25,
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

function buildPreviewVars(
  preset: ThemePreset,
  mode: "light" | "dark",
): React.CSSProperties {
  const vars: Record<string, string> = {};
  const source = mode === "dark" ? preset.dark : preset.light;
  for (const [key, val] of Object.entries(source)) {
    vars[`--${key}`] = val as string;
  }
  return vars as React.CSSProperties;
}

const lightConeStyle: React.CSSProperties = {
  clipPath: "polygon(50% 0%, 5% 100%, 95% 100%)",
};

const lampFlickerStyle: React.CSSProperties = {
  ...lightConeStyle,
  animation: "lampFlicker 4s ease-in-out infinite",
};

const lampGlowFlickerStyle: React.CSSProperties = {
  animation: "lampFlicker 4s ease-in-out infinite",
  animationDelay: "1.5s",
};

function CardDemo({
  vars,
  heroBackground,
  radius,
  shadow,
}: {
  vars: React.CSSProperties;
  /** `preset.dark.background`: ocean, forest, sunset, midnight, default */
  heroBackground: string;
  radius: number;
  shadow: string;
}) {
  const [liked, setLiked] = useState(false);

  const isPill = radius >= 1;
  const cardRadius = `${radius}rem`;
  const cardTopRadius = `${radius}rem ${radius}rem 0 0`;
  const badgeRadius = isPill ? "9999px" : `${radius * 0.5}rem`;
  const buttonRadius = isPill ? "9999px" : `${radius * 0.75}rem`;

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-visible bg-background p-6 pb-10 pt-24 font-[inherit] text-foreground"
      style={vars}
    >
      <style>{`
        @keyframes lampFlicker {
          0%, 100% { opacity: 1; }
          30% { opacity: 0.92; }
          50% { opacity: 0.97; }
          70% { opacity: 0.88; }
          85% { opacity: 0.95; }
        }
      `}</style>
      <div className="relative w-full max-w-[340px] overflow-visible">
        <div
          className="relative overflow-visible border border-border bg-card text-card-foreground transition-all duration-500"
          style={{ borderRadius: cardRadius, boxShadow: shadow }}
        >
          {/* Lámpara */}
          <div
            className="relative h-[200px] overflow-hidden transition-all duration-500"
            style={{ borderRadius: cardTopRadius }}
          >
            <div
              className="absolute top-0 left-0 z-10 h-[175px] w-full transition-all duration-500 ease-out"
              style={{ backgroundColor: heroBackground, borderRadius: cardTopRadius }}
            />
            {/* Glow radial difuso (sin clip-path) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -top-[70px] z-11 h-[200px] w-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.35)_0%,rgba(251,191,36,0.08)_50%,transparent_70%)] blur-sm dark:bg-[radial-gradient(circle,rgba(245,158,11,0.2)_0%,rgba(245,158,11,0.04)_50%,transparent_70%)]"
              style={lampGlowFlickerStyle}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -top-[80px] z-21 h-[200px] w-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.35)_0%,rgba(251,191,36,0.08)_50%,transparent_70%)] blur-sm dark:bg-[radial-gradient(circle,rgba(245,158,11,0.2)_0%,rgba(245,158,11,0.04)_50%,transparent_70%)]"
              style={lampGlowFlickerStyle}
            />
            {/* Cono de luz (más ancho, menos alto) */}
            <div
              aria-hidden
              className="pointer-events-none absolute scale-200 left-1/2 top-[40px] z-12 h-[280px] w-[min(100%,500px)] -translate-x-1/2 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(251,191,36,0.55)_0%,rgba(251,191,36,0.2)_42%,transparent_72%)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(245,158,11,0.28)_0%,rgba(245,158,11,0.08)_45%,transparent_72%)]"
              style={lampFlickerStyle}
            />
          </div>

          {/* Lámpara */}
          <Image
            src="/lamp.png"
            alt="Lámpara decorativa sobre la tarjeta de ejemplo"
            width={200}
            height={200}
            className="absolute left-1/2 -top-[108px] z-30 h-[320px] w-[320px] -translate-x-1/2 object-contain drop-shadow-lg"
          />

          {/* Contenido compacto */}
          <div className="space-y-3 px-5 pb-4 pt-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                COMPONENT
              </p>
              <span
                className="shrink-0 bg-primary px-2 py-0.5 font-ibm text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500"
                style={{ borderRadius: badgeRadius }}
              >
                v2.4
              </span>
            </div>

            <p className="font-display text-xl tracking-wide text-foreground -mt-2">
              Profile Card
            </p>

            <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
              A composable card built on Ark UI primitives — accessible,
              themeable, zero lock-in.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {["Accessible", "Themeable", "Composable"].map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2 py-0.5 font-ibm text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500"
                  style={{ borderRadius: badgeRadius }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3">
              <button
                type="button"
                onClick={() => setLiked((p) => !p)}
                className={cn(
                  "font-ibm text-[11px] uppercase tracking-[0.15em] transition-colors",
                  liked
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {liked ? "★ Saved" : "☆ Save"}
              </button>
              <button
                type="button"
                className="bg-primary px-3 py-1.5 font-ibm text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground transition-all duration-500 hover:opacity-80"
                style={{ borderRadius: buttonRadius }}
              >
                View Docs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ThemingSection({ locale }: { locale: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const activePreset = THEME_PRESETS[activeIndex];
  const previewMode: "light" | "dark" =
    resolvedTheme === "dark" ? "dark" : "light";
  const previewVars = buildPreviewVars(activePreset, previewMode);
  /** Misma tonalidad que el preset en modo oscuro (ocean azul, forest verde, …) */
  const heroBackground = activePreset.dark.background;
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

        {/* Main content */}
        <div className="w-full flex flex-col md:flex-row min-h-[480px]">
          {/* Left: Card preview */}
          <div
            className="w-full md:w-[55%] md:border-r"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="relative h-full min-h-[360px] overflow-hidden">
              {/* Theme selector */}
              <div className="w-full border-b h-[80px]">
                <div className="grid grid-cols-5 h-full">
                  {THEME_PRESETS.map((preset, i) => {
                    const accentColor =
                      THEME_ACCENT_COLORS[preset.name] ?? "oklch(0.5 0 0)";
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                          "flex h-full items-center justify-center cursor-pointer gap-2 border-r last:border-r-0 px-4 py-2 font-ibm text-[11px] uppercase tracking-[0.15em] transition-all",
                          isActive
                            ? "bg-foreground text-background border-black dark:border-white"
                            : "bg-transparent text-muted-foreground",
                        )}
                      >
                        <span
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <CardDemo
                vars={previewVars}
                heroBackground={heroBackground}
                radius={CARD_RADIUS_OVERRIDE[activePreset.name] ?? activePreset.radius}
                shadow={CARD_SHADOWS[activePreset.name] ?? "none"}
              />
            </div>
          </div>

          {/* Right: Code block */}
          <div className="w-full md:w-[45%] flex flex-col overflow-hidden">
            <div
              className={cn(
                "flex-1 min-h-0 overflow-hidden",
                "[&_.code-block-glass]:my-0 [&_.code-block-glass]:flex [&_.code-block-glass]:h-full [&_.code-block-glass]:min-h-0 [&_.code-block-glass]:flex-col [&_.code-block-glass]:rounded-none [&_.code-block-glass]:border-0",
                "[&_.code-block-glass>div:first-child]:flex [&_.code-block-glass>div:first-child]:h-[80px] [&_.code-block-glass>div:first-child]:shrink-0 [&_.code-block-glass>div:first-child]:items-center",
                "[&_.code-block-glass>div:last-child]:min-h-0 [&_.code-block-glass>div:last-child]:flex-1 [&_.code-block-glass>div:last-child]:overflow-auto",
              )}
            >
              <CodeBlock code={cssCode} language="css" filename="theme.css" />
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
