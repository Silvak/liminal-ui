"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Component Previews ────────────────────────────────────────────────────

function ButtonPreview() {
  const [size, setSize] = useState<"sm" | "default" | "lg">("default");

  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px]",
    default: "px-5 py-2.5 text-[12px]",
    lg: "px-7 py-3.5 text-[13px]",
  };

  return (
    <div className="space-y-6">
      {/* Show all 3 variants side by side */}
      <div className="flex flex-wrap items-center gap-3 min-h-[60px]">
        <button
          className={`${sizeClasses[size]} font-ibm font-bold tracking-[0.12em] uppercase transition-opacity hover:opacity-80`}
          style={{
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          Execute
        </button>
        <button
          className={`${sizeClasses[size]} font-ibm font-semibold tracking-[0.12em] uppercase transition-colors`}
          style={{
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            backgroundColor: "transparent",
          }}
        >
          Inspect
        </button>
        <button
          className={`${sizeClasses[size]} font-ibm tracking-[0.12em] uppercase transition-colors`}
          style={{ color: "var(--muted-foreground)" }}
        >
          Clone
        </button>
      </div>

      <div>
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-muted-foreground">
          Size
        </p>
        <div className="flex gap-1.5">
          {(["sm", "default", "lg"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
              style={{
                backgroundColor:
                  size === s ? "var(--foreground)" : "transparent",
                color:
                  size === s ? "var(--background)" : "var(--muted-foreground)",
                border: `1px solid ${
                  size === s ? "var(--foreground)" : "var(--border)"
                }`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertPreview() {
  const [type, setType] = useState<"info" | "success" | "warning" | "error">(
    "info",
  );

  const config = {
    info: {
      color: "var(--primary)",
      label: "SYSTEM.INFO",
      msg: "Component ready. Source in ./components/ui/alert.tsx",
    },
    success: {
      color: "oklch(0.55 0.18 145)",
      label: "SYSTEM.OK",
      msg: "All checks passed. Build successful.",
    },
    warning: {
      color: "oklch(0.7 0.18 85)",
      label: "SYSTEM.WARN",
      msg: "Deprecated prop detected. See migration guide.",
    },
    error: {
      color: "oklch(0.6 0.22 27)",
      label: "SYSTEM.ERR",
      msg: "Failed to resolve dependency. Check config.",
    },
  };

  const c = config[type];

  return (
    <div className="space-y-6">
      <div
        className="p-5 flex gap-4"
        style={{
          border: `1px solid color-mix(in oklch, ${c.color} 35%, transparent)`,
          backgroundColor: `color-mix(in oklch, ${c.color} 8%, transparent)`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full mt-[6px] shrink-0"
          style={{ backgroundColor: c.color }}
        />
        <div>
          <p
            className="font-display text-xl tracking-wider mb-1.5"
            style={{ color: c.color }}
          >
            {c.label}
          </p>
          <p className="font-ibm text-[13px] leading-relaxed text-muted-foreground">
            {c.msg}
          </p>
        </div>
      </div>

      <div>
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-muted-foreground">
          Type
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {(["info", "success", "warning", "error"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
              style={{
                backgroundColor:
                  type === t ? "var(--foreground)" : "transparent",
                color:
                  type === t ? "var(--background)" : "var(--muted-foreground)",
                border: `1px solid ${
                  type === t ? "var(--foreground)" : "var(--border)"
                }`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardPreview() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return (
    <div className="space-y-6">
      <div
        style={{
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
        }}
        className="overflow-hidden"
      >
        {showHeader && (
          <div
            className="px-5 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <p className="font-display text-xl tracking-wider text-foreground">
              Card Title
            </p>
            <p className="font-ibm text-[11px] text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
              Composable
            </p>
          </div>
        )}
        <div className="px-5 py-5">
          <p className="font-ibm text-[13px] leading-relaxed text-muted-foreground">
            Card body content goes here. Fully composable — add or remove
            sections as needed.
          </p>
        </div>
        {showFooter && (
          <div
            className="px-5 py-3 flex justify-end gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button className="px-3 py-1.5 font-ibm text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Cancel
            </button>
            <button
              className="px-3 py-1.5 font-ibm text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showHeader}
            onChange={() => setShowHeader(!showHeader)}
            className="accent-current"
          />
          <span className="font-ibm text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Header
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFooter}
            onChange={() => setShowFooter(!showFooter)}
            className="accent-current"
          />
          <span className="font-ibm text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Footer
          </span>
        </label>
      </div>
    </div>
  );
}

function BadgePreview() {
  const [variant, setVariant] = useState<"solid" | "outline" | "accent">(
    "solid",
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center min-h-[60px]">
        <div className="flex flex-wrap gap-2.5">
          {variant === "solid" && (
            <>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                Ark UI
              </span>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                React
              </span>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                Tailwind
              </span>
            </>
          )}
          {variant === "outline" && (
            <>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
                style={{ border: "1px solid var(--border)" }}
              >
                Tailwind v4
              </span>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
                style={{ border: "1px solid var(--border)" }}
              >
                Next.js
              </span>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
                style={{ border: "1px solid var(--border)" }}
              >
                TypeScript
              </span>
            </>
          )}
          {variant === "accent" && (
            <>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  color: "var(--accent-foreground)",
                  backgroundColor: "var(--accent)",
                  border: "1px solid var(--border)",
                }}
              >
                Open Source
              </span>
              <span
                className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  color: "var(--accent-foreground)",
                  backgroundColor: "var(--accent)",
                  border: "1px solid var(--border)",
                }}
              >
                MIT License
              </span>
            </>
          )}
        </div>
      </div>

      <div>
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-muted-foreground">
          Variant
        </p>
        <div className="flex gap-1.5">
          {(["solid", "outline", "accent"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
              style={{
                backgroundColor:
                  variant === v ? "var(--foreground)" : "transparent",
                color:
                  variant === v
                    ? "var(--background)"
                    : "var(--muted-foreground)",
                border: `1px solid ${
                  variant === v ? "var(--foreground)" : "var(--border)"
                }`,
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabsPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "API", "Examples"];
  const content = [
    "A fully accessible tab component built on Ark UI primitives. Keyboard navigable with arrow keys.",
    "Tabs.Root, Tabs.List, Tabs.Trigger, Tabs.Content — composable API with zero hidden logic.",
    "Use with icons, badges, or custom indicators. Animated underline included.",
  ];

  return (
    <div className="space-y-0">
      <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="relative px-4 py-3 font-ibm text-[12px] uppercase tracking-[0.15em] transition-colors"
            style={{
              color:
                activeTab === i
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
            }}
          >
            {tab}
            {activeTab === i && (
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: "var(--primary)" }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="p-5">
        <p className="font-ibm text-[13px] leading-relaxed text-muted-foreground">
          {content[activeTab]}
        </p>
      </div>
    </div>
  );
}

function SeparatorPreview() {
  return (
    <div className="space-y-6 py-2">
      <div className="space-y-4">
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Horizontal
        </p>
        <div
          className="h-px w-full"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div
          className="h-px w-full"
          style={{ backgroundColor: "var(--primary)", opacity: 0.4 }}
        />
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, var(--primary), transparent)`,
            opacity: 0.6,
          }}
        />
      </div>
      <div className="flex gap-8 items-stretch h-16">
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] text-muted-foreground self-center">
          Vertical
        </p>
        <div className="w-px" style={{ backgroundColor: "var(--border)" }} />
        <div
          className="w-px"
          style={{ backgroundColor: "var(--primary)", opacity: 0.4 }}
        />
        <div
          className="w-[2px]"
          style={{
            background: `linear-gradient(180deg, var(--primary), transparent)`,
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}

// ─── Component Index ───────────────────────────────────────────────────────

const COMPONENTS = [
  {
    name: "Button",
    category: "Actions",
    count: "6 variants",
    Preview: ButtonPreview,
  },
  {
    name: "Alert",
    category: "Feedback",
    count: "4 types",
    Preview: AlertPreview,
  },
  {
    name: "Card",
    category: "Layout",
    count: "Composable",
    Preview: CardPreview,
  },
  {
    name: "Badge",
    category: "Display",
    count: "3 variants",
    Preview: BadgePreview,
  },
  {
    name: "Tabs",
    category: "Navigation",
    count: "Accessible",
    Preview: TabsPreview,
  },
  {
    name: "Separator",
    category: "Layout",
    count: "H + V",
    Preview: SeparatorPreview,
  },
] as const;

// ─── Main Section ──────────────────────────────────────────────────────────

export function ComponentsSection({ locale }: { locale: string }) {
  const [active, setActive] = useState(0);
  const ActivePreview = COMPONENTS[active].Preview;

  return (
    <section className="w-full px-6 md:px-8">
      <div className="relative flex mx-auto h-min-content max-w-[1440px] border-x flex-col">
        {/* Header */}
        <div className="w-full border-b px-6 py-8 md:px-10">
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
            COMPONENT SYSTEM
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display leading-none tracking-tight text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Built to compose.
              <br />
              Ready to ship.
            </h2>
            <p className="font-ibm text-[13px] leading-[1.7] text-muted-foreground md:max-w-xs md:text-right">
              Pick a component. Adjust its props. See the result live. Every
              piece is accessible, themeable, and yours to own.
            </p>
          </div>
        </div>

        {/* Main grid */}
        <div className="w-full flex flex-col md:flex-row min-h-[520px]">
          {/* Left: Component index */}
          <div
            className="w-full md:w-[30%] md:border-r md:overflow-x-visible"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Mobile: horizontal scroll row */}
            <div className="md:hidden h-[80px] w-full border-b">
              <div className="h-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex h-full min-w-max">
                  {COMPONENTS.map((comp, i) => {
                    const isActive = active === i;
                    return (
                      <button
                        key={comp.name}
                        onClick={() => setActive(i)}
                        className="flex h-full min-w-[132px] shrink-0 items-center justify-center border-r last:border-r-0 px-4 font-ibm text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all cursor-pointer"
                        style={{
                          borderColor: "var(--border)",
                          color: isActive
                            ? "var(--background)"
                            : "var(--muted-foreground)",
                          backgroundColor: isActive
                            ? "var(--foreground)"
                            : "transparent",
                        }}
                      >
                        {comp.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden md:block">
              <div
                className="border-b px-5 h-[80px] flex items-center font-ibm text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                Component Index
              </div>
              {COMPONENTS.map((comp, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={comp.name}
                    onClick={() => setActive(i)}
                    className="group flex w-full h-[80px] cursor-pointer items-center justify-between px-5 text-left transition-all duration-200 hover:bg-muted/60"
                    style={{
                      borderBottom:
                        i < COMPONENTS.length - 1
                          ? "1px solid var(--border)"
                          : undefined,
                      borderLeft: `3px solid ${
                        isActive ? "var(--primary)" : "transparent"
                      }`,
                      backgroundColor: isActive
                        ? "var(--foreground)"
                        : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="w-6 font-ibm text-[11px] font-bold transition-colors duration-200"
                        style={{
                          color: isActive
                            ? "var(--background)"
                            : "var(--muted-foreground)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div
                          className="font-display text-2xl tracking-wider transition-colors duration-200"
                          style={{
                            color: isActive
                              ? "var(--background)"
                              : "var(--foreground)",
                          }}
                        >
                          {comp.name}
                        </div>
                        <div
                          className="font-ibm text-[11px] uppercase tracking-[0.2em] transition-colors duration-200"
                          style={{
                            color: isActive
                              ? "color-mix(in oklch, var(--background) 72%, transparent)"
                              : "var(--muted-foreground)",
                          }}
                        >
                          {comp.category}
                        </div>
                      </div>
                    </div>
                    <span
                      className="font-ibm text-[11px] font-bold transition-all duration-200"
                      style={{
                        color: isActive
                          ? "var(--background)"
                          : "var(--primary)",
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateX(0)"
                          : "translateX(4px)",
                      }}
                    >
                      {comp.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Preview panel */}
          <div className="w-full md:w-[70%] flex flex-col flex-1 min-h-0">
            <div
              className="flex items-center justify-between px-6 h-[52px] md:h-[80px] border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Live Preview
              </p>
              <span
                className="flex items-center gap-1.5 font-ibm text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--primary)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                Interactive
              </span>
            </div>

            <div
              className="flex-1 min-h-[280px] relative p-6 md:p-8 flex items-center justify-center"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--background) 96%, var(--card))",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--muted-foreground) 18%, transparent) 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            >
              <div
                className="relative p-6 md:p-8 w-full max-w-[760px]"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                }}
              >
                <ActivePreview />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full border-t px-6 py-5 md:px-10 flex items-center justify-between">
          <span className="font-ibm text-[12px] text-muted-foreground">
            {COMPONENTS.length} components shown — 24+ available in docs
          </span>
          <Link
            href={`/${locale}/docs/components/button`}
            className="font-ibm text-[12px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 transition-all"
            style={{
              border: "1px solid var(--foreground)",
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            Explore Docs →
          </Link>
        </div>
      </div>
    </section>
  );
}
