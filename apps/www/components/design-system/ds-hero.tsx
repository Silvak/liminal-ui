"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["hero"];
};

export function DsHero({ copy }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full border-b overflow-hidden"
      style={{ minHeight: "420px" }}
    >
      {/* Background depth gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 120%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      {/* Portal frame — outer corners */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-6 z-10 transition-opacity duration-700",
          mounted ? "opacity-100" : "opacity-0"
        )}
      >
        {/* TL */}
        <div
          className="absolute top-0 left-0 h-8 w-8 border-t border-l"
          style={{ borderColor: "var(--primary)" }}
        />
        {/* TR */}
        <div
          className="absolute top-0 right-0 h-8 w-8 border-t border-r"
          style={{ borderColor: "var(--primary)" }}
        />
        {/* BL */}
        <div
          className="absolute bottom-0 left-0 h-8 w-8 border-b border-l"
          style={{ borderColor: "var(--primary)" }}
        />
        {/* BR */}
        <div
          className="absolute bottom-0 right-0 h-8 w-8 border-b border-r"
          style={{ borderColor: "var(--primary)" }}
        />
      </div>

      {/* Portal scan line animation */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-6 right-6 z-10 h-px transition-all duration-1000",
          mounted ? "top-6 opacity-30" : "top-1/2 opacity-0"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--primary), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-between h-full px-6 py-12 md:px-10 md:py-16">
        <div>
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
            {copy.overline}
          </p>
          <h1
            className={cn(
              "font-display font-semibold leading-[0.95] tracking-tight text-foreground transition-all duration-700",
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            <span className="block">{copy.title1}</span>
            <span className="block">{copy.title2}</span>
          </h1>
        </div>

        <div
          className={cn(
            "mt-8 max-w-2xl transition-all duration-700 delay-200",
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
        >
          <p className="font-ibm text-sm leading-relaxed text-muted-foreground md:text-base">
            {copy.subtitle}
          </p>

          {/* Threshold label */}
          <div className="mt-8 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), transparent)",
                opacity: 0.5,
              }}
            />
            <span className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
              {copy.portalLabel}
            </span>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(270deg, var(--primary), transparent)",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>

      {/* Right panel — portal depth visual */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 transition-opacity duration-1000 delay-300",
          mounted ? "opacity-40" : "opacity-0"
        )}
      >
        {[120, 88, 60, 36, 16].map((size, i) => (
          <div
            key={size}
            className="absolute border"
            style={{
              width: `${size}px`,
              height: `${size * 1.4}px`,
              borderColor: "var(--primary)",
              opacity: 0.15 + i * 0.12,
              transform: "translateX(-50%) translateY(-50%)",
              left: "50%",
              top: "50%",
            }}
          />
        ))}
      </div>
    </section>
  );
}
