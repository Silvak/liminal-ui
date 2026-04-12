"use client";

import { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Check, Copy, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["colors"];
};

const LIGHT_VALUES: Record<string, string> = {
  "--background": "oklch(0.9702 0 0)",
  "--foreground": "oklch(0.145 0 0)",
  "--primary": "oklch(0.463 0.2818 264.2203)",
  "--primary-foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.97 0 0)",
  "--muted-foreground": "oklch(0.556 0 0)",
  "--card": "oklch(1 0 0)",
  "--border": "oklch(0.8754 0.0033 17.2208)",
  "--accent": "oklch(0.9207 0.1815 109.4908)",
  "--ring": "oklch(0.708 0 0)",
  "--destructive": "oklch(0.577 0.245 27.325)",
};

const DARK_VALUES: Record<string, string> = {
  "--background": "oklch(0.0383 0.0265 264.052)",
  "--foreground": "oklch(0.985 0 0)",
  "--primary": "oklch(0.9207 0.1815 109.4908)",
  "--primary-foreground": "oklch(0.205 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--card": "oklch(0.205 0 0)",
  "--border": "oklch(0.275 0 0)",
  "--accent": "oklch(0.371 0 0)",
  "--ring": "oklch(0.556 0 0)",
  "--destructive": "oklch(0.6459 0.2401 28.86)",
};

function ColorSwatch({
  token,
  name,
  description,
  mode,
  copyLabel,
  copiedLabel,
}: {
  token: string;
  name: string;
  description: string;
  mode: "light" | "dark";
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const values = mode === "light" ? LIGHT_VALUES : DARK_VALUES;
  const value = values[token] ?? "var(" + token + ")";

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  const isLight = mode === "light";
  const bgStyle = isLight
    ? { backgroundColor: `var(${token})` }
    : { backgroundColor: value };

  return (
    <div
      className="group flex items-stretch border-b last:border-b-0 transition-colors hover:bg-muted/30"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Swatch */}
      <div
        className="w-14 shrink-0 self-stretch border-r"
        style={{ ...bgStyle, borderColor: "var(--border)" }}
      />

      {/* Info */}
      <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="font-display text-sm text-foreground truncate">{name}</p>
          <p className="font-ibm text-[10px] text-muted-foreground truncate">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <code className="font-ibm text-[10px] text-muted-foreground hidden sm:block">
            {token}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? copiedLabel : copyLabel}
            className={cn(
              "flex items-center gap-1 px-2 py-1 font-ibm text-[10px] uppercase tracking-[0.15em] border transition-all",
              copied
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DsColors({ copy }: Props) {
  const { resolvedTheme } = useTheme();
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

  const isDark = resolvedTheme === "dark";

  return (
    <section id="colors" className="w-full border-b">
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

      {/* Mode toggle */}
      <div className="flex items-center border-b px-6 py-0 md:px-10" style={{ borderColor: "var(--border)" }}>
        <span className="font-ibm text-[11px] uppercase tracking-[0.25em] text-muted-foreground mr-4">
          {copy.semanticLabel}
        </span>
        <div className="ml-auto flex">
          <button
            type="button"
            onClick={() => setPreviewMode("light")}
            className={cn(
              "flex h-10 items-center gap-2 border-l border-t border-b px-4 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all first:border-l",
              previewMode === "light"
                ? "bg-foreground text-background border-foreground"
                : "text-muted-foreground border-border hover:text-foreground"
            )}
          >
            <Sun className="h-3 w-3" />
            {copy.lightMode}
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode("dark")}
            className={cn(
              "flex h-10 items-center gap-2 border px-4 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all",
              previewMode === "dark"
                ? "bg-foreground text-background border-foreground"
                : "text-muted-foreground border-border hover:text-foreground"
            )}
          >
            <Moon className="h-3 w-3" />
            {copy.darkMode}
          </button>
        </div>
      </div>

      {/* Swatch list */}
      <div
        className={cn(
          "transition-colors duration-300",
          previewMode === "dark" ? "bg-[oklch(0.0383_0.0265_264.052)]" : "bg-[oklch(0.9702_0_0)]"
        )}
      >
        <div
          className={cn(
            "mx-auto",
            previewMode === "dark" ? "text-[oklch(0.985_0_0)]" : "text-[oklch(0.145_0_0)]"
          )}
        >
          {copy.items.map((item) => (
            <ColorSwatch
              key={item.token}
              token={item.token}
              name={item.name}
              description={item.description}
              mode={previewMode}
              copyLabel={copy.copyToken}
              copiedLabel={copy.copied}
            />
          ))}
        </div>
      </div>

      {/* Live theme note */}
      <div
        className="flex items-center gap-2 border-t px-6 py-4 md:px-10"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <span className="font-ibm text-[11px] text-muted-foreground">
          {isDark ? copy.darkMode : copy.lightMode} —{" "}
          <span className="text-foreground">
            {isDark ? "oklch dark values" : "oklch light values"}
          </span>
        </span>
      </div>
    </section>
  );
}
