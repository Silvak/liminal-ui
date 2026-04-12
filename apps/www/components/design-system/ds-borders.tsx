"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["borders"];
};

const RADIUS_PRESETS = [
  { label: "0rem", value: 0, key: "squared" },
  { label: "0.375rem", value: 6, key: "soft" },
  { label: "0.75rem", value: 12, key: "rounded" },
  { label: "9999px", value: 9999, key: "pill" },
] as const;

export function DsBorders({ copy }: Props) {
  const [radius, setRadius] = useState(0);

  const borderRadius = radius >= 9999 ? "9999px" : `${radius}px`;

  return (
    <section id="borders" className="w-full border-b">
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
        {/* Radius picker */}
        <div
          className="w-full lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r px-6 py-8 flex flex-col gap-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              {copy.radiusLabel}
            </p>
            <div className="flex flex-col gap-1.5">
              {RADIUS_PRESETS.map((preset) => {
                const isActive = radius === preset.value;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setRadius(preset.value)}
                    className={cn(
                      "flex items-center justify-between border px-4 py-3 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all",
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                  >
                    <span>
                      {copy[
                        preset.key === "squared"
                          ? "squaredLabel"
                          : preset.key === "soft"
                          ? "softLabel"
                          : preset.key === "pill"
                          ? "pillLabel"
                          : "softLabel"
                      ] ?? preset.key}
                    </span>
                    <code className="text-[9px] opacity-60">{preset.label}</code>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current value */}
          <div>
            <p className="font-ibm text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2">
              CSS
            </p>
            <pre className="font-ibm text-[10px] leading-relaxed text-muted-foreground bg-muted px-3 py-3">
              {`border-radius: ${borderRadius};`}
            </pre>
          </div>
        </div>

        {/* Preview grid */}
        <div className="flex-1 px-6 py-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {/* Basic shape */}
            <div className="flex flex-col gap-2">
              <span className="font-ibm text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Element
              </span>
              <div
                className="h-16 w-full border transition-all duration-300"
                style={{
                  borderColor: "var(--border)",
                  borderRadius,
                }}
              />
            </div>

            {/* Button pair */}
            <div className="flex flex-col gap-2">
              <span className="font-ibm text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Button pair
              </span>
              <div className="flex h-10">
                <div
                  className="flex-1 border-y border-l flex items-center justify-center font-ibm text-[10px] text-muted-foreground transition-all duration-300"
                  style={{
                    borderColor: "var(--border)",
                    borderRadius: `${borderRadius} 0 0 ${borderRadius}`,
                  }}
                >
                  Action
                </div>
                <div
                  className="flex-1 border flex items-center justify-center font-ibm text-[10px] text-muted-foreground transition-all duration-300 -ml-px"
                  style={{
                    borderColor: "var(--border)",
                    borderRadius: `0 ${borderRadius} ${borderRadius} 0`,
                  }}
                >
                  More
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="flex flex-col gap-2">
              <span className="font-ibm text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Badge
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="px-3 py-1 font-ibm text-[10px] uppercase tracking-[0.15em] border transition-all duration-300"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted-foreground)",
                    borderRadius,
                  }}
                >
                  New
                </span>
                <span
                  className="px-3 py-1 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all duration-300"
                  style={{
                    backgroundColor: "var(--foreground)",
                    color: "var(--background)",
                    borderRadius,
                  }}
                >
                  Beta
                </span>
              </div>
            </div>

            {/* Portal frame */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
              <span className="font-ibm text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {copy.portalLabel}
              </span>
              <div
                className="relative h-20 border transition-all duration-300"
                style={{ borderColor: "var(--primary)", opacity: 0.6, borderRadius }}
              >
                {/* Corner marks */}
                <div className="absolute top-1 left-1 h-3 w-3 border-t border-l" style={{ borderColor: "var(--primary)" }} />
                <div className="absolute top-1 right-1 h-3 w-3 border-t border-r" style={{ borderColor: "var(--primary)" }} />
                <div className="absolute bottom-1 left-1 h-3 w-3 border-b border-l" style={{ borderColor: "var(--primary)" }} />
                <div className="absolute bottom-1 right-1 h-3 w-3 border-b border-r" style={{ borderColor: "var(--primary)" }} />
                <div className="flex h-full items-center justify-center">
                  <span className="font-ibm text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
                    {copy.portalLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Window panel */}
            <div className="col-span-2 flex flex-col gap-2">
              <span className="font-ibm text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {copy.windowLabel}
              </span>
              <div
                className="relative h-20 border overflow-hidden transition-all duration-300"
                style={{ borderColor: "var(--border)", borderRadius }}
              >
                <div
                  className="h-8 border-b flex items-center px-4"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span className="font-ibm text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    Header
                  </span>
                </div>
                <div className="flex h-full">
                  <div
                    className="w-20 border-r"
                    style={{ borderColor: "var(--border)" }}
                  />
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared borders demo */}
      <div className="px-6 py-8 md:px-10">
        <p className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          {copy.sharedBorderLabel}
        </p>
        <div className="flex flex-col sm:flex-row gap-0 max-w-lg">
          {["One", "Two", "Three"].map((label, i) => (
            <div
              key={label}
              className={cn(
                "flex h-10 items-center justify-center border font-ibm text-[10px] uppercase tracking-[0.15em] text-muted-foreground flex-1 transition-all",
                i > 0 && "-mt-px sm:mt-0 sm:-ml-px"
              )}
              style={{ borderColor: "var(--border)" }}
            >
              {label}
            </div>
          ))}
        </div>
        <p className="mt-3 font-ibm text-[11px] text-muted-foreground/70">
          <code>-ml-px</code> / <code>-mt-px</code> — shared border technique avoids double borders
        </p>
      </div>
    </section>
  );
}
