"use client";

import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["spacing"];
};

const SCALE_STEPS = [
  { label: "1", value: 4, rem: "0.25rem" },
  { label: "2", value: 8, rem: "0.5rem" },
  { label: "3", value: 12, rem: "0.75rem" },
  { label: "4", value: 16, rem: "1rem" },
  { label: "5", value: 20, rem: "1.25rem" },
  { label: "6", value: 24, rem: "1.5rem" },
  { label: "8", value: 32, rem: "2rem" },
  { label: "10", value: 40, rem: "2.5rem" },
  { label: "12", value: 48, rem: "3rem" },
  { label: "16", value: 64, rem: "4rem" },
  { label: "20", value: 80, rem: "5rem" },
  { label: "24", value: 96, rem: "6rem" },
];

export function DsSpacing({ copy }: Props) {
  return (
    <section id="spacing" className="w-full border-b">
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

      {/* Base unit */}
      <div
        className="flex items-center gap-4 border-b px-6 py-4 md:px-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="h-4 w-4 shrink-0"
          style={{ backgroundColor: "var(--primary)", opacity: 0.6 }}
        />
        <code className="font-ibm text-[12px] text-muted-foreground">
          {copy.baseUnit}
        </code>
      </div>

      {/* Scale */}
      <div
        className="border-b px-6 py-4 md:px-10"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          {copy.scaleLabel}
        </p>

        <div className="space-y-2">
          {SCALE_STEPS.map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <span className="w-6 font-ibm text-[10px] text-muted-foreground/60 text-right shrink-0">
                {step.label}
              </span>
              <div
                className="h-4 shrink-0"
                style={{
                  width: `${step.value}px`,
                  backgroundColor: "var(--primary)",
                  opacity: 0.25 + (step.value / 96) * 0.65,
                }}
              />
              <span className="font-ibm text-[10px] text-muted-foreground/60">
                {step.rem} ({step.value}px)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Container system demo */}
      <div className="px-6 py-8 md:px-10 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          {copy.containerLabel}
        </p>
        <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground mb-6 max-w-lg">
          {copy.containerDesc}
        </p>

        {/* Visual demo */}
        <div className="relative overflow-hidden" style={{ height: 160 }}>
          {/* Centered grid */}
          <div
            className="absolute top-4 bottom-4 left-1/2 w-[calc(100%-48px)] max-w-full -translate-x-1/2"
            style={{
              background:
                "repeating-linear-gradient(90deg, color-mix(in oklch, var(--border) 60%, transparent) 0px, color-mix(in oklch, var(--border) 60%, transparent) 1px, transparent 1px, transparent 24px)",
              opacity: 0.85,
            }}
          />

          {/* Container frame */}
          <div
            className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 border-x"
            style={{
              width: "calc(100% - 48px)",
              maxWidth: "100%",
              borderColor: "var(--primary)",
              opacity: 0.6,
            }}
          />

          {/* Threshold labels */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 font-ibm text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 text-center"
            style={{ top: "50%", transform: "translate(-50%, -50%)" }}
          >
            {copy.thresholdLabel}
            <br />
            <span className="text-primary/60">max-w-[1440px]</span>
          </div>
        </div>
      </div>

      {/* Spacing principle note */}
      <div className="px-6 py-6 md:px-10 flex items-start gap-4">
        <div
          className="mt-1 h-3 w-3 shrink-0 border"
          style={{ borderColor: "var(--primary)" }}
        />
        <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground">
          {copy.subtitle}
        </p>
      </div>
    </section>
  );
}
