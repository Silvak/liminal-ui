"use client";

import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["hero"];
};

export function DsHeader({ copy }: Props) {
  return (
    <section
      id="overview"
      className="space-y-4 border-b border-border pb-4"
    >
      <div>
        <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
          {copy.overline}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {copy.title1}{" "}
          <span className="text-muted-foreground">{copy.title2}</span>
        </h1>
      </div>
      <p className="text-base text-muted-foreground">{copy.subtitle}</p>

      {/* Threshold line */}
      <div className="flex items-center gap-3 pt-1">
        <div
          className="h-px flex-1"
          style={{
            background: "linear-gradient(90deg, var(--primary), transparent)",
            opacity: 0.35,
          }}
        />
        <span className="font-ibm text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40">
          {copy.portalLabel}
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: "linear-gradient(270deg, var(--primary), transparent)",
            opacity: 0.35,
          }}
        />
      </div>
    </section>
  );
}
