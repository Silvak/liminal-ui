"use client";

import { useState, useCallback, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["animations"];
};

function AnimCard({
  name,
  className,
  description,
  playLabel,
  replayLabel,
  columns,
}: {
  name: string;
  className: string;
  description: string;
  playLabel: string;
  replayLabel: string;
  columns: 2 | 3;
}) {
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const lowerName = name.toLowerCase();
  const isTerminal = className === "animate-terminal-blink";
  const isPulse = className.includes("pulse") || className.includes("glow");
  const isFloat = className.includes("float");
  const isScan = lowerName.includes("scan");
  const isFlicker = lowerName.includes("flicker");

  const play = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setKey((k) => k + 1);
    setPlaying(true);
    timeoutRef.current = setTimeout(() => setPlaying(false), 1800);
  }, []);

  const hasAnimation = !!className;

  return (
    <div
      className={cn(
        "flex flex-col border-b transition-colors hover:bg-muted/20",
        columns === 3
          ? "border-r last:border-r-0 [&:nth-child(3n)]:border-r-0"
          : "sm:border-r sm:even:border-r-0"
      )}
    >
      {/* Preview area */}
      <div
        className="h-[100px] flex items-center justify-center border-b overflow-hidden relative"
        style={{ borderColor: "var(--border)" }}
      >
        {isTerminal ? (
          <div
            key={key}
            className="flex items-center gap-1 font-ibm text-base text-foreground"
          >
            <span className="text-muted-foreground">$</span>
            <span>run</span>
            <span className={cn("text-primary", playing && className)}>▊</span>
          </div>
        ) : hasAnimation && playing ? (
          <div
            key={key}
            className={cn(
              "h-8 w-8 border",
              isFloat && "rotate-12",
              isPulse && "rounded-full",
              className
            )}
            style={{
              borderColor: "var(--primary)",
              backgroundColor: isPulse ? "var(--primary)" : "transparent",
              animationFillMode: "forwards",
            }}
          />
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn("h-8 w-8 border", isFloat && "rotate-12", isPulse && "rounded-full")}
              style={{
                borderColor: "var(--border)",
                backgroundColor: isPulse ? "color-mix(in oklch, var(--primary) 25%, transparent)" : "transparent",
                opacity: 0.6,
              }}
            />
            {isPulse && (
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--primary)", opacity: 0.7 }}
              />
            )}
          </div>
        )}

        {/* Lamp flicker special case */}
        {!hasAnimation && isFlicker && (
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 h-16 w-32 -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(251,191,36,0.5) 0%, rgba(251,191,36,0.1) 45%, transparent 70%)",
              clipPath: "polygon(50% 0%, 10% 100%, 90% 100%)",
              animation: playing
                ? "lampFlicker 4s ease-in-out infinite"
                : "none",
            }}
            key={key}
          />
        )}

        {/* Scan line special case */}
        {isScan && (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, color-mix(in oklch, var(--border) 30%, transparent) 6px, color-mix(in oklch, var(--border) 30%, transparent) 7px)",
                opacity: 0.4,
              }}
            />
            {playing && (
              <div
                key={key}
                className="absolute left-0 right-0 h-px"
                style={{
                  backgroundColor: "var(--primary)",
                  opacity: 0.65,
                  boxShadow: "0 0 10px color-mix(in oklch, var(--primary) 55%, transparent)",
                  animation: "scan-line 2s ease-in-out forwards",
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="font-display text-sm text-foreground mb-1">{name}</p>
          {className && (
            <code className="font-ibm text-[9px] text-primary mb-2 block">
              .{className}
            </code>
          )}
          <p className="font-ibm text-[11px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={play}
          className={cn(
            "mt-4 flex items-center gap-2 self-start border px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all",
            playing
              ? "border-primary text-primary"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          )}
        >
          {playing ? (
            <RotateCcw className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
          {playing ? replayLabel : playLabel}
        </button>
      </div>
    </div>
  );
}

export function DsAnimations({ copy }: Props) {
  return (
    <section id="animations" className="w-full border-b">
      <style>{`
        @keyframes lampFlicker {
          0%, 100% { opacity: 1; }
          30% { opacity: 0.92; }
          50% { opacity: 0.97; }
          70% { opacity: 0.88; }
          85% { opacity: 0.95; }
        }
        @keyframes scan-line {
          from { top: -4px; opacity: 0; }
          5% { opacity: 0.5; }
          95% { opacity: 0.5; }
          to { top: 100%; opacity: 0; }
        }
      `}</style>

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

      {/* Principle note */}
      <div
        className="flex items-start gap-3 border-b px-6 py-4 md:px-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <p className="font-ibm text-[11px] italic text-muted-foreground">
          {copy.principleNote}
        </p>
      </div>

      {/* Categories */}
      {copy.categories.map((category) => (
        <div key={category.name} className="border-b" style={{ borderColor: "var(--border)" }}>
          <div
            className="border-b px-6 py-3 md:px-10"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="font-ibm text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {category.name}
            </span>
          </div>
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2",
              category.items.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            )}
          >
            {category.items.map((item) => (
              <AnimCard
                key={item.name}
                name={item.name}
                className={item.className}
                description={item.description}
                playLabel={copy.playLabel}
                replayLabel={copy.replayLabel}
                columns={category.items.length >= 3 ? 3 : 2}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
