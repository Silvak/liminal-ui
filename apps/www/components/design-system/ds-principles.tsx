"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["principles"];
};

const PRINCIPLE_VISUALS = [
  // 01 Threshold — nested frames
  () => (
    <div className="flex items-center justify-center h-full">
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 112 }}>
        {[80, 56, 36].map((w, i) => (
          <div
            key={w}
            className="absolute border"
            style={{
              width: w,
              height: w * 1.4,
              borderColor: "var(--primary)",
              opacity: 0.3 + i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  ),
  // 02 Translucency — glass layers
  () => (
    <div className="flex items-center justify-center h-full gap-2">
      {[0.15, 0.3, 0.5, 0.7].map((op, i) => (
        <div
          key={i}
          className="h-16 w-10"
          style={{
            backgroundColor: `color-mix(in oklch, var(--primary) ${Math.round(op * 100)}%, transparent)`,
            backdropFilter: `blur(${i * 2}px)`,
            border: "1px solid var(--border)",
          }}
        />
      ))}
    </div>
  ),
  // 03 Gradient — color sweep
  () => (
    <div className="flex items-center justify-center h-full">
      <div
        className="w-full h-12 max-w-[160px]"
        style={{
          background:
            "linear-gradient(90deg, var(--background), var(--primary), var(--background))",
          opacity: 0.8,
        }}
      />
    </div>
  ),
  // 04 Stillness — gentle dot
  () => (
    <div className="flex items-center justify-center h-full">
      <div
        className="h-4 w-4 rounded-full animate-pulse"
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: "0 0 16px color-mix(in oklch, var(--primary) 40%, transparent)",
        }}
      />
    </div>
  ),
  // 05 Space — spacing scale
  () => (
    <div className="flex items-end justify-center gap-1 h-full pb-2">
      {[4, 8, 12, 20, 32, 48].map((size) => (
        <div
          key={size}
          className="w-3"
          style={{
            height: `${size}px`,
            backgroundColor: "var(--border)",
          }}
        />
      ))}
    </div>
  ),
  // 06 Legibility — text pair
  () => (
    <div className="flex flex-col items-start justify-center h-full gap-1 px-2">
      <span
        className="font-display font-semibold"
        style={{ fontSize: 24, color: "var(--foreground)", lineHeight: 1 }}
      >
        Aa
      </span>
      <span
        className="font-ibm text-[10px] uppercase tracking-[0.3em]"
        style={{ color: "var(--muted-foreground)" }}
      >
        Label
      </span>
    </div>
  ),
];

export function DsPrinciples({ copy }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="principles" className="w-full border-b">
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((principle, i) => {
          const Visual = PRINCIPLE_VISUALS[i];
          const isHovered = hovered === i;
          return (
            <div
              key={principle.index}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "relative flex flex-col border-b border-r transition-colors duration-200 cursor-default",
                "last:border-b-0 [&:nth-child(3n)]:lg:border-r-0",
                "[&:nth-child(2n)]:sm:border-r-0 lg:[&:nth-child(2n)]:border-r",
                isHovered && "bg-muted/40"
              )}
              style={{ minHeight: 240 }}
            >
              {/* Visual area */}
              <div className="h-[100px] border-b flex items-center px-6" style={{ borderColor: "var(--border)" }}>
                {Visual && <Visual />}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-ibm text-[11px] font-bold text-muted-foreground/50">
                      {principle.index}
                    </span>
                    <span
                      className="font-ibm text-[9px] uppercase tracking-[0.2em] px-2 py-0.5"
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {principle.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl tracking-wide text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground">
                    {principle.body}
                  </p>
                </div>
              </div>

              {/* Active indicator */}
              <div
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                style={{
                  width: isHovered ? "100%" : "0%",
                  background:
                    "linear-gradient(90deg, var(--primary), transparent)",
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
