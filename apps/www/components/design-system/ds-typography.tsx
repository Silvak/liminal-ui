"use client";

import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["typography"];
};

const DISPLAY_SIZES: Record<string, string> = {
  "text-9xl": "clamp(4rem, 10vw, 7.5rem)",
  "text-7xl": "clamp(3rem, 7vw, 4.5rem)",
  "text-5xl": "clamp(2rem, 5vw, 3rem)",
  "text-3xl": "1.875rem",
  "text-xl": "1.25rem",
  "text-base": "1rem",
  "text-xs": "0.75rem",
};

export function DsTypography({ copy }: Props) {
  return (
    <section id="typography" className="w-full border-b">
      {/* Header */}
      <div className="px-6 py-8 md:px-10 border-b">
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {copy.overline}
        </p>
        <h2
          className="font-display font-semibold leading-none tracking-tight text-foreground"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          {copy.title}
        </h2>
      </div>

      {/* Font family intro */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        {/* Display font */}
        <div className="px-6 py-8 md:px-10 overflow-hidden border-b md:border-b-0 md:border-r" style={{ borderColor: "var(--border)" }}>
          <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
            {copy.displayLabel}
          </p>
          <div className="font-display text-5xl font-semibold tracking-tight text-foreground mb-3">
            Aa Bb Cc
          </div>
          <div className="w-full overflow-hidden font-display text-[clamp(1rem,2.2vw,1.5rem)] font-semibold leading-tight tracking-tight text-muted-foreground mb-4 break-all">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground">
            {copy.displayDesc}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <code className="font-ibm text-[10px] px-2 py-1 bg-muted text-muted-foreground">
              .font-display
            </code>
            <code className="font-ibm text-[10px] px-2 py-1 bg-muted text-muted-foreground">
              var(--font-geist-sans)
            </code>
          </div>
        </div>

        {/* Mono font */}
        <div className="px-6 py-8 md:px-10 overflow-hidden">
          <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
            {copy.monoLabel}
          </p>
          <div className="font-ibm text-4xl font-bold tracking-wider text-foreground mb-3">
            Aa Bb Cc
          </div>
          <div className="w-full overflow-hidden font-ibm text-[clamp(0.75rem,1.6vw,1rem)] tracking-[0.18em] text-muted-foreground mb-4 uppercase break-all">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground">
            {copy.monoDesc}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <code className="font-ibm text-[10px] px-2 py-1 bg-muted text-muted-foreground">
              .font-ibm
            </code>
            <code className="font-ibm text-[10px] px-2 py-1 bg-muted text-muted-foreground">
              var(--font-geist-mono)
            </code>
          </div>
        </div>
      </div>

      {/* Type scale */}
      <div className="border-b px-6 py-4 md:px-10" style={{ borderColor: "var(--border)" }}>
        <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {copy.scaleLabel}
        </p>
      </div>

      <div>
        {copy.samples.map((sample, i) => {
          const isDisplay = i < 5;
          const fontSize = DISPLAY_SIZES[sample.size] ?? "1rem";
          return (
            <div
              key={sample.label}
              className="flex items-baseline gap-4 border-b px-6 py-4 md:px-10 last:border-b-0 transition-colors hover:bg-muted/20"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Label */}
              <div className="w-28 shrink-0">
                <span className="font-ibm text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {sample.label}
                </span>
              </div>

              {/* Sample text */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <span
                  className={cn(
                    isDisplay ? "font-display" : "font-ibm",
                    sample.weight,
                    sample.tracking,
                    "text-foreground leading-tight block truncate"
                  )}
                  style={{ fontSize }}
                >
                  {sample.example}
                </span>
              </div>

              {/* Metadata */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <code className="font-ibm text-[10px] text-muted-foreground/60">
                  {fontSize}
                </code>
                <code className="font-ibm text-[10px] text-muted-foreground/60">
                  {sample.weight.replace("font-", "")}
                </code>
                <code className="font-ibm text-[10px] text-muted-foreground/60">
                  {sample.tracking.replace("tracking-", "")}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
