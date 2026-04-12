"use client";

import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["gradients"];
};

const GRADIENT_CATALOG = [
  {
    key: "bg-fade",
    label: "Background fade",
    css: "bg-gradient-to-t\nfrom-background\nto-transparent",
    style: {
      background:
        "linear-gradient(to top, var(--background), transparent)",
    },
  },
  {
    key: "primary-sweep",
    label: "Primary sweep",
    css: "linear-gradient(\n  90deg,\n  var(--primary),\n  transparent\n)",
    style: {
      background: "linear-gradient(90deg, var(--primary), transparent)",
    },
  },
  {
    key: "radial-glow",
    label: "Radial glow",
    css: "radial-gradient(\n  circle,\n  primary 0%,\n  transparent 70%\n)",
    style: {
      background:
        "radial-gradient(circle, color-mix(in oklch, var(--primary) 55%, transparent) 0%, color-mix(in oklch, var(--primary) 8%, transparent) 45%, transparent 70%)",
    },
  },
  {
    key: "portal-depth",
    label: "Portal depth",
    css: "radial-gradient(\n  ellipse 50% 40%\n  at 50% 100%,\n  background 0%,\n  transparent\n)",
    style: {
      background:
        "radial-gradient(ellipse 80% 60% at 50% 110%, var(--background) 0%, color-mix(in oklch, var(--background) 20%, transparent) 50%, transparent 70%), color-mix(in oklch, var(--primary) 15%, transparent)",
    },
  },
  {
    key: "edge-fade-h",
    label: "Edge fade (horizontal)",
    css: "mask: linear-gradient(\n  to right,\n  transparent,\n  black 10%,\n  black 90%,\n  transparent\n)",
    style: {
      background: "var(--primary)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      maskImage:
        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      opacity: 0.4,
    },
  },
  {
    key: "edge-fade-v",
    label: "Edge fade (vertical)",
    css: "mask: linear-gradient(\n  to bottom,\n  transparent,\n  black 10%,\n  black 90%,\n  transparent\n)",
    style: {
      background: "var(--primary)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      maskImage:
        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
      opacity: 0.4,
    },
  },
  {
    key: "lamp-cone",
    label: "Lamp cone",
    css: "radial-gradient(\n  ellipse 80% 50%\n  at 50% 0%,\n  amber 0%,\n  transparent 72%\n)",
    style: {
      background:
        "radial-gradient(ellipse 85% 55% at 50% 0%, rgba(251,191,36,0.55) 0%, rgba(251,191,36,0.2) 42%, transparent 72%)",
      clipPath: "polygon(50% 0%, 5% 100%, 95% 100%)",
    },
  },
  {
    key: "mist",
    label: "Atmospheric mist",
    css: "linear-gradient(\n  135deg,\n  primary 8%,\n  transparent,\n  accent 8%\n)",
    style: {
      background:
        "linear-gradient(135deg, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 50%, color-mix(in oklch, var(--accent) 10%, transparent) 100%)",
    },
  },
];

export function DsGradients({ copy }: Props) {
  return (
    <section id="gradients" className="w-full border-b">
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

      {/* Gradient catalog grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {GRADIENT_CATALOG.map((grad, i) => (
          <div
            key={grad.key}
            className="border-b border-r last:border-r-0 [&:nth-child(4n)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Preview */}
            <div
              className="relative h-[140px] border-b overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="absolute inset-4"
                style={grad.style as React.CSSProperties}
              />
            </div>

            {/* Info */}
            <div className="px-5 py-5">
              <p className="font-display text-sm text-foreground mb-1">
                {grad.label}
              </p>
              <pre className="font-ibm text-[9px] leading-relaxed text-muted-foreground/70 overflow-x-auto">
                {grad.css}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Principle note */}
      <div
        className="flex items-start gap-4 border-t px-6 py-6 md:px-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mt-1 h-px w-8 shrink-0"
          style={{
            background: "linear-gradient(90deg, var(--primary), transparent)",
          }}
        />
        <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>
    </section>
  );
}
