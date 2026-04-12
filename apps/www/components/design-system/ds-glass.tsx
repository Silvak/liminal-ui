"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["glass"];
};

export function DsGlass({ copy }: Props) {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(70);
  const [noise, setNoise] = useState(true);

  const glassStyle: React.CSSProperties = {
    backdropFilter: `blur(${blur}px) saturate(1.3)`,
    backgroundColor: `color-mix(in oklab, var(--background) ${opacity}%, transparent)`,
  };

  return (
    <section id="glass" className="w-full border-b">
      {/* Header */}
      <div className="px-6 py-8 md:px-10 border-b">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {copy.overline}
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="font-display font-semibold leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            {copy.title}
          </h2>
          <p className="font-ibm text-[13px] leading-relaxed text-muted-foreground md:max-w-sm md:text-right">
            {copy.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row border-b" style={{ borderColor: "var(--border)" }}>
        {/* Controls */}
        <div
          className="w-full lg:w-[320px] shrink-0 border-b lg:border-b-0 lg:border-r px-6 py-8 flex flex-col gap-8"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Blur slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {copy.blurLabel}
              </span>
              <code className="font-ibm text-[10px] text-foreground">
                {blur}px
              </code>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-current"
              style={{ accentColor: "var(--primary)" }}
            />
            <div className="flex justify-between font-ibm text-[9px] text-muted-foreground/60 mt-1">
              <span>0px</span>
              <span>40px</span>
            </div>
          </div>

          {/* Opacity slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {copy.opacityLabel}
              </span>
              <code className="font-ibm text-[10px] text-foreground">
                {opacity}%
              </code>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "var(--primary)" }}
            />
            <div className="flex justify-between font-ibm text-[9px] text-muted-foreground/60 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Noise toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                role="switch"
                aria-checked={noise}
                onClick={() => setNoise((n) => !n)}
                className={cn(
                  "relative h-5 w-9 shrink-0 border transition-colors",
                  noise ? "border-primary" : "border-border"
                )}
              >
                <div
                  className={cn(
                    "absolute left-0.5 top-0.5 h-3.5 w-3.5 transition-transform",
                    noise && "translate-x-4"
                  )}
                  style={{ backgroundColor: noise ? "var(--primary)" : "var(--border)" }}
                />
              </button>
              <span className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {copy.noiseLabel}
              </span>
            </label>
          </div>

          {/* Generated CSS */}
          <div>
            <p className="font-ibm text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2">
              CSS
            </p>
            <pre className="font-ibm text-[10px] leading-relaxed text-muted-foreground bg-muted px-3 py-3 overflow-x-auto">
              {`backdrop-filter: blur(${blur}px);\nbackground: color-mix(\n  in oklab,\n  var(--background) ${opacity}%,\n  transparent\n);${noise ? "\n/* + noise overlay */" : ""}`}
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 relative min-h-[300px] overflow-hidden">
          {/* Background with visual interest */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 110% 90% at 28% 52%, color-mix(in oklch, var(--primary) 30%, transparent), transparent 62%), radial-gradient(ellipse 70% 65% at 82% 18%, color-mix(in oklch, var(--accent) 26%, transparent), transparent 58%), linear-gradient(135deg, color-mix(in oklch, var(--foreground) 8%, transparent), transparent 40%)",
              backgroundSize: "cover",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(120deg, color-mix(in oklch, var(--border) 35%, transparent) 0px, color-mix(in oklch, var(--border) 35%, transparent) 1px, transparent 1px, transparent 28px)",
              opacity: 0.25,
            }}
          />
          {/* Geometric shapes behind glass */}
          <div
            className="absolute top-8 left-12 h-24 w-24 rotate-12"
            style={{ backgroundColor: "var(--primary)", opacity: 0.2 }}
          />
          <div
            className="absolute bottom-8 right-16 h-16 w-16 rounded-full"
            style={{ backgroundColor: "var(--accent)", opacity: 0.3 }}
          />
          <div
            className="absolute top-1/2 left-1/3 h-32 w-1 -rotate-30 -translate-y-1/2"
            style={{ backgroundColor: "var(--primary)", opacity: 0.15 }}
          />
          <div
            className="absolute right-20 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border"
            style={{
              borderColor: "color-mix(in oklch, var(--accent) 45%, transparent)",
              boxShadow: "0 0 50px color-mix(in oklch, var(--accent) 20%, transparent)",
            }}
          />

          {/* Glass panel */}
          <div className="absolute inset-8 flex items-center justify-center">
            <div
              className={cn("relative overflow-hidden border p-6 w-full max-w-sm")}
              style={{
                ...glassStyle,
                borderColor: `color-mix(in oklch, var(--border) 60%, transparent)`,
              }}
            >
              {/* Noise overlay */}
              {noise && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    zIndex: 1,
                  }}
                />
              )}

              <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3 relative z-10">
                Glass surface
              </p>
              <p className="font-display text-2xl text-foreground mb-2 relative z-10">
                Liminal UI
              </p>
              <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground relative z-10">
                Frosted glass creates depth through translucency — layers of meaning without opacity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage examples */}
      <div className="px-6 py-8 md:px-10">
        <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          {copy.examplesLabel}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border" style={{ borderColor: "var(--border)" }}>
          {[
            {
              label: copy.headerExample,
              css: "bg-background/70\nbackdrop-blur-md",
              opacity: 70,
              blur: 12,
              kind: "header",
            },
            {
              label: copy.codeExample,
              css: "code-mix(bg, 72%)\nbackdrop-blur(16px)\n+ noise overlay",
              opacity: 72,
              blur: 16,
              kind: "code",
            },
            {
              label: copy.modalExample,
              css: "bg-background/80\nbackdrop-blur-lg",
              opacity: 80,
              blur: 20,
              kind: "modal",
            },
          ].map((ex, i) => (
            <div
              key={ex.label}
              className={cn(
                "px-5 py-5 border-b sm:border-b-0",
                i < 2 && "sm:border-r"
              )}
              style={{ borderColor: "var(--border)" }}
            >
              <p className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                {ex.label}
              </p>
              <div
                className="relative overflow-hidden border p-4 mb-3"
                style={{
                  backdropFilter: `blur(${ex.blur}px)`,
                  backgroundColor: `color-mix(in oklab, var(--background) ${ex.opacity}%, transparent)`,
                  borderColor: `color-mix(in oklch, var(--border) 50%, transparent)`,
                  background: `linear-gradient(135deg, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%), color-mix(in oklab, var(--background) ${ex.opacity}%, transparent)`,
                }}
              >
                {ex.kind === "header" && (
                  <div className="flex h-10 items-center justify-between border px-3" style={{ borderColor: "var(--border)" }}>
                    <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.3 }} />
                    <div className="h-1.5 w-5 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.25 }} />
                  </div>
                )}
                {ex.kind === "code" && (
                  <div className="space-y-2">
                    <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.35 }} />
                    <div className="h-1.5 w-24 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.26 }} />
                    <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.2 }} />
                    <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.16 }} />
                  </div>
                )}
                {ex.kind === "modal" && (
                  <div className="flex h-16 items-center justify-center">
                    <div className="h-10 w-20 border px-2 py-1" style={{ borderColor: "var(--border)" }}>
                      <div className="h-1.5 w-12 rounded-full mb-1" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.24 }} />
                      <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.16 }} />
                    </div>
                  </div>
                )}
              </div>
              <pre className="font-ibm text-[9px] leading-relaxed text-muted-foreground/70">
                {ex.css}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
