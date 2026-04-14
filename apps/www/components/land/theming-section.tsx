"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { THEME_PRESETS, type ThemePreset } from "../playground/theme-presets";
import { CodeBlock } from "../code-block";
import Image from "next/image";
import type { CardDemoCopy, LandingThemingCopy } from "@/lib/landing-dictionary";

const LOCAL_FONTS = new Set(["Geist Sans", "Geist Mono", "Georgia"]);

function buildGoogleFontsUrl(fonts: string[]): string {
  const families = fonts
    .filter((fontName) => !LOCAL_FONTS.has(fontName))
    .map(
      (fontName) =>
        `family=${encodeURIComponent(fontName)}:wght@300;400;500;600;700`,
    )
    .join("&");
  return families
    ? `https://fonts.googleapis.com/css2?${families}&display=swap`
    : "";
}

function useGoogleFonts(fonts: string[]) {
  useEffect(() => {
    const toLoad = fonts.filter((fontName) => !LOCAL_FONTS.has(fontName));
    if (toLoad.length === 0) return;

    const url = buildGoogleFontsUrl(toLoad);
    const id = "theming-section-google-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = url;
  }, [fonts.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
}

function getFontSansValue(fontSans: string): string {
  if (fontSans === "Geist Sans") {
    return "var(--font-geist-sans), ui-sans-serif, sans-serif";
  }
  return `"${fontSans}", ui-sans-serif, sans-serif`;
}

function toShadowValue(preset: ThemePreset): string {
  const { color, x, y, blur, spread, opacity } = preset.shadow;
  if (opacity === 0) return "none";
  return `${x}px ${y}px ${blur}px ${spread}px ${color.replace(
    ")",
    ` / ${opacity})`,
  )}`;
}

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
  const lines: string[] = [
    ":root {",
    `  --radius: ${preset.radius}rem;`,
    `  --tracking-normal: ${preset.letterSpacing}em;`,
    `  --font-sans: ${getFontSansValue(preset.fontSans)};`,
    `  --border-width: ${preset.borderWidth}px;`,
    `  --backdrop-blur: ${preset.backdropBlur}px;`,
    `  --card-opacity: ${preset.cardBgOpacity};`,
    `  --shadow: ${toShadowValue(preset)};`,
  ];
  for (const key of CSS_KEYS) {
    const val = preset.light[key as keyof typeof preset.light];
    if (val) lines.push(`  --${key}: ${val};`);
  }
  lines.push("}");
  lines.push("");
  lines.push(".dark {");
  lines.push("  /* ... dark mode overrides ... */");
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

// ---------------------------------------------------------------------------
// Clases base reutilizables
// ---------------------------------------------------------------------------

const CTA_BASE =
  "border border-border bg-card h-10 px-3 font-ibm text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center";

const CTA_FULL =
  "w-full border border-border bg-card h-10 font-ibm text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center";

// Altura minima fija: garantiza que todas las composiciones ocupen el mismo espacio
// y la tarjeta no salte entre temas. 240px = la composicion mas alta medida.
const CONTENT_MIN_H = "min-h-[240px]";

// ---------------------------------------------------------------------------
// Composiciones estructurales por preset
// ---------------------------------------------------------------------------

function CardContentCore({
  card,
  badgeRadius,
  buttonRadius,
}: {
  card: CardDemoCopy;
  badgeRadius: string;
  buttonRadius: string;
}) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3 px-5 pb-4 pt-3", CONTENT_MIN_H)}>
      {/* Label + badge filled primary */}
      <div className="flex items-center justify-between gap-3">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {card.componentLabel}
        </p>
        <span
          className="shrink-0 bg-primary px-2 py-0.5 font-ibm text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500"
          style={{ borderRadius: badgeRadius }}
        >
          {card.badge}
        </span>
      </div>

      <p className="font-display text-xl tracking-wide text-foreground -mt-1">
        {card.profileCard}
      </p>

      <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
        {card.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-0.5 font-ibm text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500"
            style={{ borderRadius: badgeRadius }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <button
          type="button"
          aria-label={card.save}
          onClick={() => setIsSaved((prev) => !prev)}
          className={cn(
            "flex h-8 w-8 items-center justify-center transition-all duration-300",
            isSaved ? "text-foreground scale-110" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </button>
        <button
          type="button"
          className={CTA_BASE}
          style={{ borderRadius: buttonRadius }}
        >
          {card.viewDocs}
        </button>
      </div>
    </div>
  );
}

function CardContentEdge({
  card,
  badgeRadius,
  buttonRadius,
}: {
  card: CardDemoCopy;
  badgeRadius: string;
  buttonRadius: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 px-5 pb-4 pt-3", CONTENT_MIN_H)}>
      {/* Label + badge outline (sin fondo, solo borde) */}
      <div className="flex items-center justify-between gap-3">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {card.componentLabel}
        </p>
        <span
          className="shrink-0 border border-primary px-2 py-0.5 font-ibm text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-all duration-500"
          style={{ borderRadius: badgeRadius }}
        >
          {card.badge}
        </span>
      </div>

      <p className="font-display text-xl tracking-wide text-foreground -mt-1">
        {card.profileCard}
      </p>

      <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
        {card.description}
      </p>

      {/* CTA full-width + tags alineados a la derecha al fondo */}
      <div className="mt-auto flex flex-col gap-3">
        <button
          type="button"
          className={CTA_FULL}
          style={{ borderRadius: buttonRadius }}
        >
          {card.viewDocs}
        </button>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border px-2 py-0.5 font-ibm text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500"
              style={{ borderRadius: badgeRadius }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardContentBloom({
  card,
  badgeRadius,
  buttonRadius,
}: {
  card: CardDemoCopy;
  badgeRadius: string;
  buttonRadius: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 px-5 pb-4 pt-3", CONTENT_MIN_H)}>
      {/* Badge accent a la izquierda, label a la derecha */}
      <div className="flex items-center gap-3">
        <span
          className="shrink-0 bg-accent px-2 py-0.5 font-ibm text-[10px] font-bold uppercase tracking-[0.2em] text-accent-foreground transition-all duration-500"
          style={{ borderRadius: badgeRadius }}
        >
          {card.badge}
        </span>
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {card.componentLabel}
        </p>
      </div>

      <p className="font-display text-xl tracking-wide text-foreground -mt-1">
        {card.profileCard}
      </p>

      <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
        {card.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-0.5 font-ibm text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500"
            style={{ borderRadius: badgeRadius }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA full-width empujado al fondo */}
      <button
        type="button"
        className={cn(CTA_FULL, "mt-auto")}
        style={{ borderRadius: buttonRadius }}
      >
        {card.viewDocs}
      </button>
    </div>
  );
}

function CardContentEther({
  card,
  badgeRadius,
  buttonRadius,
}: {
  card: CardDemoCopy;
  badgeRadius: string;
  buttonRadius: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 px-5 pb-4 pt-3", CONTENT_MIN_H)}>
      {/* Label + badge solo texto, sin fondo ni borde */}
      <div className="flex items-center justify-between gap-3">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {card.componentLabel}
        </p>
        <span className="font-ibm text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 transition-all duration-500">
          {card.badge}
        </span>
      </div>

      <p className="font-display text-xl tracking-wide text-foreground -mt-1">
        {card.profileCard}
      </p>

      <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground line-clamp-2">
        {card.description}
      </p>

      {/* Tags como texto inline separado por puntos, sin borde */}
      <p className="font-ibm text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70">
        {card.tags.join(" · ")}
      </p>

      {/* CTA outline con borde primary empujado al fondo */}
      <button
        type="button"
        className="mt-auto border border-primary bg-transparent h-10 px-3 font-ibm text-[11px] font-bold uppercase tracking-[0.15em] text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground flex items-center justify-center"
        style={{ borderRadius: buttonRadius }}
      >
        {card.viewDocs}
      </button>
    </div>
  );
}

function CardContentDrift({
  card,
  badgeRadius,
  buttonRadius,
}: {
  card: CardDemoCopy;
  badgeRadius: string;
  buttonRadius: string;
}) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className={cn("flex flex-col gap-3 px-5 pb-4 pt-3", CONTENT_MIN_H)}>
      {/* Label + badge fondo muted */}
      <div className="flex items-center justify-between gap-3">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {card.componentLabel}
        </p>
        <span
          className="shrink-0 bg-muted px-2 py-0.5 font-ibm text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-all duration-500"
          style={{ borderRadius: badgeRadius }}
        >
          {card.badge}
        </span>
      </div>

      {/* Titulo + boton Save a la derecha */}
      <div className="flex items-center justify-between gap-2 -mt-1">
        <p className="font-display text-xl tracking-wide text-foreground">
          {card.profileCard}
        </p>
        <button
          type="button"
          aria-label={card.save}
          onClick={() => setIsSaved((prev) => !prev)}
          className={cn(
            "shrink-0 flex h-8 w-8 items-center justify-center transition-all duration-300",
            isSaved ? "text-foreground scale-110" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </button>
      </div>

      {/* Tags entre titulo y descripcion */}
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2 py-0.5 font-ibm text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500"
            style={{ borderRadius: badgeRadius }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Descripcion con mas lineas visibles */}
      <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground line-clamp-3">
        {card.description}
      </p>

      {/* CTA mas ancho empujado al fondo */}
      <button
        type="button"
        className="mt-auto border border-border bg-card h-10 px-6 font-ibm text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground transition-all duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center"
        style={{ borderRadius: buttonRadius }}
      >
        {card.viewDocs}
      </button>
    </div>
  );
}

const CARD_CONTENT_MAP: Record<
  string,
  React.FC<{
    card: CardDemoCopy;
    badgeRadius: string;
    buttonRadius: string;
  }>
> = {
  core: CardContentCore,
  edge: CardContentEdge,
  bloom: CardContentBloom,
  ether: CardContentEther,
  drift: CardContentDrift,
};

// ---------------------------------------------------------------------------
// CardDemo component
// ---------------------------------------------------------------------------

function CardDemo({
  vars,
  heroBackground,
  radius,
  shadow,
  borderWidth,
  backdropBlur,
  cardBgOpacity,
  fontSans,
  letterSpacing,
  card,
  presetName,
}: {
  vars: React.CSSProperties;
  heroBackground: string;
  radius: number;
  shadow: string;
  borderWidth: number;
  backdropBlur: number;
  cardBgOpacity: number;
  fontSans: string;
  letterSpacing: number;
  card: CardDemoCopy;
  presetName: string;
}) {
  const isPill = radius >= 1;
  const cardRadius = `${radius}rem`;
  const cardTopRadius = `${radius}rem ${radius}rem 0 0`;
  const innerTopRadius = `calc(${radius}rem - ${borderWidth}px) calc(${radius}rem - ${borderWidth}px) 0 0`;
  const badgeRadius = isPill ? "9999px" : `${radius * 0.5}rem`;
  const buttonRadius = isPill ? "9999px" : `${radius * 0.75}rem`;
  const previewFont = getFontSansValue(fontSans);
  const cardBackgroundColor =
    cardBgOpacity >= 1
      ? "var(--card)"
      : `color-mix(in oklab, var(--card) ${Math.round(cardBgOpacity * 100)}%, transparent)`;

  const CardContent = CARD_CONTENT_MAP[presetName] ?? CardContentCore;

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-visible bg-background p-6 pb-10 pt-24 font-[inherit] text-foreground"
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
      <div
        className="relative w-full max-w-[340px] overflow-visible"
        style={{
          ...vars,
          fontFamily: previewFont,
          letterSpacing: `${letterSpacing}em`,
        }}
      >
        <div
          className="relative overflow-visible border border-border bg-card text-card-foreground transition-all duration-500"
          style={{
            borderRadius: cardRadius,
            borderWidth: `${borderWidth}px`,
            boxShadow: shadow,
            backgroundColor: cardBackgroundColor,
            backdropFilter: backdropBlur > 0 ? `blur(${backdropBlur}px)` : "none",
            WebkitBackdropFilter:
              backdropBlur > 0 ? `blur(${backdropBlur}px)` : "none",
          }}
        >
          {/* Hero */}
          <div
            className="relative h-[200px] overflow-hidden transition-all duration-500"
            style={{ borderRadius: innerTopRadius }}
          >
            <div
              className="absolute top-0 left-0 z-10 h-[175px] w-full transition-all duration-500 ease-out"
              style={{ backgroundColor: heroBackground, borderRadius: innerTopRadius }}
            />
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
            <div
              aria-hidden
              className="pointer-events-none absolute scale-200 left-1/2 top-[40px] z-12 h-[280px] w-[min(100%,500px)] -translate-x-1/2 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(251,191,36,0.55)_0%,rgba(251,191,36,0.2)_42%,transparent_72%)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(245,158,11,0.28)_0%,rgba(245,158,11,0.08)_45%,transparent_72%)]"
              style={lampFlickerStyle}
            />
          </div>

          <Image
            src="/lamp.png"
            alt={card.lampAlt}
            width={200}
            height={200}
            className="absolute left-1/2 -top-[108px] z-30 h-[320px] w-[320px] -translate-x-1/2 object-contain drop-shadow-lg"
          />

          <CardContent
            card={card}
            badgeRadius={badgeRadius}
            buttonRadius={buttonRadius}
          />
        </div>
      </div>
    </div>
  );
}

export function ThemingSection({
  locale,
  copy,
}: {
  locale: string;
  copy: LandingThemingCopy;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const activePreset = THEME_PRESETS[activeIndex];
  useGoogleFonts([
    activePreset.fontSans,
    activePreset.fontSerif,
    activePreset.fontMono,
  ]);
  const previewMode: "light" | "dark" =
    resolvedTheme === "dark" ? "dark" : "light";
  const previewVars = buildPreviewVars(activePreset, previewMode);
  const activeCardDemo =
    copy.cardDemo[activePreset.name] ?? copy.cardDemo.core ?? Object.values(copy.cardDemo)[0];
  const heroBackground = activePreset.dark.background;
  const cssCode = buildCssSnippet(activePreset);

  return (
    <section className="w-full px-4 md:px-8">
      <div className="relative flex mx-auto h-min-content max-w-[1440px] border-x flex-col">
        {/* Header */}
        <div className="w-full border-b px-6 py-8 md:px-10">
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            {copy.overline}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display leading-none tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {copy.titleLine1}
              <br />
              {copy.titleLine2}
            </h2>
            <p className="font-ibm text-[13px] leading-[1.7] text-muted-foreground md:max-w-xs md:text-right">
              {copy.blurb}
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full flex flex-col md:flex-row min-h-[600px] md:h-[800px]">
          {/* Left: Card preview */}
          <div
            className="w-full md:w-[55%] md:border-r"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="relative h-full min-h-[360px] overflow-hidden">
              {/* Theme selector */}
              <div className="h-[80px] w-full border-b">
                <div className="h-full overflow-x-auto md:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex h-full min-w-max md:grid md:min-w-0 md:grid-cols-5">
                    {THEME_PRESETS.map((preset, i) => {
                      const accentColor =
                        previewMode === "dark"
                          ? preset.dark.primary
                          : preset.light.primary;
                      const isActive = i === activeIndex;
                      return (
                        <button
                          key={preset.name}
                          onClick={() => setActiveIndex(i)}
                          className={cn(
                            "flex h-full min-w-[132px] shrink-0 items-center justify-center gap-2 border-r first:border-l px-3 py-2 font-ibm text-[10px] uppercase tracking-[0.12em] whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 md:min-w-0 md:px-4 md:text-[11px] md:tracking-[0.15em] md:first:border-l-0 md:last:border-r-0",
                            isActive
                              ? "bg-foreground text-background border-black dark:border-white"
                              : "bg-transparent text-muted-foreground",
                          )}
                        >
                          <span
                            className="w-4 h-4 rounded-full shrink-0"
                            style={{ backgroundColor: accentColor }}
                          />
                          {copy.presetLabels[preset.name] ?? preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <CardDemo
                vars={previewVars}
                heroBackground={heroBackground}
                radius={activePreset.radius}
                shadow={toShadowValue(activePreset)}
                borderWidth={activePreset.borderWidth}
                backdropBlur={activePreset.backdropBlur}
                cardBgOpacity={activePreset.cardBgOpacity}
                fontSans={activePreset.fontSans}
                letterSpacing={activePreset.letterSpacing}
                card={activeCardDemo}
                presetName={activePreset.name}
              />
            </div>
          </div>

          {/* Right: Code block */}
          <div className="w-full md:w-[45%] flex min-h-0 flex-col overflow-hidden md:h-full">
            <div
              className={cn(
                "h-full flex-1 min-h-0 overflow-hidden",
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
        <div className="flex w-full flex-col items-start gap-3 border-t px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <span className="font-ibm text-[12px] text-muted-foreground">
            {copy.footerPresets.replace(
              "{count}",
              String(THEME_PRESETS.length),
            )}
          </span>
          <Link
            href={`/${locale}/playground`}
            className="font-ibm text-[12px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 transition-opacity hover:opacity-85"
            style={{
              border: "1px solid var(--foreground)",
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            {copy.openPlayground}
          </Link>
        </div>
      </div>
    </section>
  );
}
