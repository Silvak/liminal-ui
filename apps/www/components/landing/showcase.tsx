"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ComponentDef = {
  name: string;
  category: string;
  count: string;
  preview: React.FC;
};

function ButtonPreview() {
  const [variant, setVariant] = useState<"primary" | "outline" | "ghost">("primary");
  const [size, setSize] = useState<"default" | "sm" | "lg">("default");

  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px]",
    default: "px-5 py-2.5 text-[12px]",
    lg: "px-7 py-3.5 text-[13px]",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center min-h-[80px]">
        {variant === "primary" && (
          <button
            className={`${sizeClasses[size]} font-ibm font-bold tracking-[0.12em] uppercase transition-opacity hover:opacity-85`}
            style={{ backgroundColor: "hsl(var(--l-text))", color: "hsl(var(--l-bg))" }}
          >
            Execute
          </button>
        )}
        {variant === "outline" && (
          <button
            className={`${sizeClasses[size]} font-ibm font-semibold tracking-[0.12em] uppercase transition-all hover:bg-l-card`}
            style={{ border: "1px solid hsl(var(--l-border))", color: "hsl(var(--l-text))", backgroundColor: "transparent" }}
          >
            Inspect
          </button>
        )}
        {variant === "ghost" && (
          <button
            className={`${sizeClasses[size]} font-ibm tracking-[0.12em] uppercase text-l-muted hover:bg-l-card transition-colors`}
          >
            Clone
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-l-faint">Variant</p>
          <div className="flex gap-1.5">
            {(["primary", "outline", "ghost"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
                style={{
                  backgroundColor: variant === v ? "hsl(var(--l-text))" : "transparent",
                  color: variant === v ? "hsl(var(--l-bg))" : "hsl(var(--l-text-muted))",
                  border: `1px solid ${variant === v ? "hsl(var(--l-text))" : "hsl(var(--l-border))"}`,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-l-faint">Size</p>
          <div className="flex gap-1.5">
            {(["sm", "default", "lg"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
                style={{
                  backgroundColor: size === s ? "hsl(var(--l-text))" : "transparent",
                  color: size === s ? "hsl(var(--l-bg))" : "hsl(var(--l-text-muted))",
                  border: `1px solid ${size === s ? "hsl(var(--l-text))" : "hsl(var(--l-border))"}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertPreview() {
  const [type, setType] = useState<"info" | "success" | "warning" | "error">("info");

  const config = {
    info: { color: "hsl(var(--acid-label))", label: "SYSTEM.INFO", msg: "Component ready. Source in ./components/ui/alert.tsx" },
    success: { color: "hsl(154 80% 35%)", label: "SYSTEM.OK", msg: "All checks passed. Build successful." },
    warning: { color: "hsl(45 100% 45%)", label: "SYSTEM.WARN", msg: "Deprecated prop detected. See migration guide." },
    error: { color: "hsl(0 75% 50%)", label: "SYSTEM.ERR", msg: "Failed to resolve dependency. Check config." },
  };

  const c = config[type];

  return (
    <div className="space-y-6">
      <div
        className="p-4 flex gap-3"
        style={{ border: `1px solid color-mix(in srgb, ${c.color} 35%, transparent)`, backgroundColor: `color-mix(in srgb, ${c.color} 6%, transparent)` }}
      >
        <div className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0" style={{ backgroundColor: c.color }} />
        <div>
          <p className="font-display text-xl tracking-wider mb-1" style={{ color: c.color }}>{c.label}</p>
          <p className="font-ibm text-[13px] leading-relaxed text-l-muted">{c.msg}</p>
        </div>
      </div>

      <div>
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-l-faint">Type</p>
        <div className="flex gap-1.5 flex-wrap">
          {(["info", "success", "warning", "error"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
              style={{
                backgroundColor: type === t ? "hsl(var(--l-text))" : "transparent",
                color: type === t ? "hsl(var(--l-bg))" : "hsl(var(--l-text-muted))",
                border: `1px solid ${type === t ? "hsl(var(--l-text))" : "hsl(var(--l-border))"}`,
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
      <div style={{ border: "1px solid hsl(var(--l-border))" }} className="bg-l-card overflow-hidden">
        {showHeader && (
          <div className="px-5 py-4" style={{ borderBottom: "1px solid hsl(var(--l-border-sub))" }}>
            <p className="font-display text-xl tracking-wider text-l-primary">Card Title</p>
            <p className="font-ibm text-[11px] text-l-faint uppercase tracking-[0.2em]">Composable</p>
          </div>
        )}
        <div className="px-5 py-4">
          <p className="font-ibm text-[13px] leading-relaxed text-l-muted">
            Card body content goes here. Fully composable — add or remove sections as needed.
          </p>
        </div>
        {showFooter && (
          <div className="px-5 py-3 flex justify-end gap-2" style={{ borderTop: "1px solid hsl(var(--l-border-sub))" }}>
            <button className="px-3 py-1.5 font-ibm text-[11px] uppercase tracking-[0.12em] text-l-muted">Cancel</button>
            <button className="px-3 py-1.5 font-ibm text-[11px] font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: "hsl(var(--l-text))", color: "hsl(var(--l-bg))" }}>Save</button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showHeader}
            onChange={() => setShowHeader(!showHeader)}
            className="accent-current"
          />
          <span className="font-ibm text-[11px] uppercase tracking-[0.15em] text-l-muted">Header</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFooter}
            onChange={() => setShowFooter(!showFooter)}
            className="accent-current"
          />
          <span className="font-ibm text-[11px] uppercase tracking-[0.15em] text-l-muted">Footer</span>
        </label>
      </div>
    </div>
  );
}

function BadgePreview() {
  const [variant, setVariant] = useState<"solid" | "outline" | "accent">("solid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center min-h-[60px]">
        <div className="flex flex-wrap gap-2.5">
          {variant === "solid" && (
            <>
              <span className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase" style={{ backgroundColor: "hsl(var(--l-text))", color: "hsl(var(--l-bg))" }}>
                Ark UI
              </span>
              <span className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase" style={{ backgroundColor: "hsl(var(--l-text))", color: "hsl(var(--l-bg))" }}>
                React
              </span>
            </>
          )}
          {variant === "outline" && (
            <>
              <span className="px-3 py-1.5 font-ibm text-[11px] tracking-[0.2em] uppercase text-l-muted" style={{ border: "1px solid hsl(var(--l-border))" }}>
                Tailwind v4
              </span>
              <span className="px-3 py-1.5 font-ibm text-[11px] tracking-[0.2em] uppercase text-l-muted" style={{ border: "1px solid hsl(var(--l-border))" }}>
                Next.js
              </span>
            </>
          )}
          {variant === "accent" && (
            <>
              <span className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase text-acid-label" style={{ border: "1px solid hsl(var(--acid-label) / 0.5)" }}>
                Open Source
              </span>
              <span className="px-3 py-1.5 font-ibm text-[11px] font-bold tracking-[0.2em] uppercase text-acid-label" style={{ border: "1px solid hsl(var(--acid-label) / 0.5)" }}>
                MIT
              </span>
            </>
          )}
        </div>
      </div>

      <div>
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] mb-2 text-l-faint">Variant</p>
        <div className="flex gap-1.5">
          {(["solid", "outline", "accent"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className="px-3 py-1.5 font-ibm text-[10px] uppercase tracking-[0.15em] transition-all"
              style={{
                backgroundColor: variant === v ? "hsl(var(--l-text))" : "transparent",
                color: variant === v ? "hsl(var(--l-bg))" : "hsl(var(--l-text-muted))",
                border: `1px solid ${variant === v ? "hsl(var(--l-text))" : "hsl(var(--l-border))"}`,
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
      <div className="flex" style={{ borderBottom: "1px solid hsl(var(--l-border))" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="relative px-4 py-3 font-ibm text-[12px] uppercase tracking-[0.15em] transition-colors"
            style={{ color: activeTab === i ? "hsl(var(--l-text))" : "hsl(var(--l-text-faint))" }}
          >
            {tab}
            {activeTab === i && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all" style={{ backgroundColor: "hsl(var(--acid-label))" }} />
            )}
          </button>
        ))}
      </div>
      <div className="p-4">
        <p className="font-ibm text-[13px] leading-relaxed text-l-muted">{content[activeTab]}</p>
      </div>
    </div>
  );
}

function SeparatorPreview() {
  return (
    <div className="space-y-6 py-2">
      <div className="space-y-4">
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] text-l-faint">Horizontal</p>
        <div className="h-px w-full" style={{ backgroundColor: "hsl(var(--l-border))" }} />
        <div className="h-px w-full" style={{ backgroundColor: "hsl(var(--acid-label) / 0.4)" }} />
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, hsl(var(--acid-label) / 0.6), transparent)` }} />
      </div>
      <div className="flex gap-8 items-stretch h-16">
        <p className="font-ibm text-[10px] uppercase tracking-[0.25em] text-l-faint self-center">Vertical</p>
        <div className="w-px" style={{ backgroundColor: "hsl(var(--l-border))" }} />
        <div className="w-px" style={{ backgroundColor: "hsl(var(--acid-label) / 0.4)" }} />
        <div className="w-[2px]" style={{ background: `linear-gradient(180deg, hsl(var(--acid-label) / 0.6), transparent)` }} />
      </div>
    </div>
  );
}

const COMPONENTS: ComponentDef[] = [
  { name: "Button", category: "Action", count: "5 variants", preview: ButtonPreview },
  { name: "Alert", category: "Feedback", count: "4 variants", preview: AlertPreview },
  { name: "Card", category: "Layout", count: "composable", preview: CardPreview },
  { name: "Badge", category: "Label", count: "3 variants", preview: BadgePreview },
  { name: "Tabs", category: "Navigation", count: "animated", preview: TabsPreview },
  { name: "Separator", category: "Layout", count: "decorative", preview: SeparatorPreview },
];

export function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.08}s`;
              el.classList.add("animate-reveal-up");
              (el as HTMLElement).style.opacity = "1";
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const ActivePreview = COMPONENTS[active].preview;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-28 bg-l-bg-alt"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div data-reveal style={{ opacity: 0 }}>
            <p className="font-ibm text-xs font-bold tracking-[0.3em] uppercase mb-4 text-acid-label">
              § COMPONENT LAB
            </p>
            <h2 className="font-display leading-none tracking-tight text-l-primary" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)" }}>
              WHAT&apos;S IN<br />THE SYSTEM
            </h2>
          </div>
          <p data-reveal style={{ opacity: 0 }} className="font-ibm text-[14px] max-w-xs leading-relaxed md:text-right text-l-muted">
            Select a component. Tweak its props. See the result live.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-0" style={{ border: "1px solid hsl(var(--l-border))" }}>
          {/* Component list */}
          <div className="lg:col-span-2 bg-l-card" style={{ borderRight: "1px solid hsl(var(--l-border))" }}>
            {COMPONENTS.map((comp, i) => (
              <button
                key={comp.name}
                data-reveal
                onClick={() => setActive(i)}
                style={{
                  opacity: 0,
                  borderBottom: i < COMPONENTS.length - 1 ? "1px solid hsl(var(--l-border-sub))" : undefined,
                  backgroundColor: active === i ? "hsl(var(--l-bg-card-alt))" : undefined,
                }}
                className="flex items-center justify-between w-full text-left px-6 py-5 group hover:bg-l-card-alt transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-ibm text-[11px] font-bold w-6 text-l-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div
                      className="font-display text-2xl tracking-wider transition-colors duration-200"
                      style={{ color: active === i ? "hsl(var(--acid-label))" : "hsl(var(--l-text))" }}
                    >
                      {comp.name}
                    </div>
                    <div className="font-ibm text-[11px] uppercase tracking-[0.2em] text-l-faint">
                      {comp.category}
                    </div>
                  </div>
                </div>
                <span
                  className="font-ibm text-[11px] font-bold text-acid-label transition-opacity duration-200"
                  style={{ opacity: active === i ? 1 : 0 }}
                >
                  {comp.count}
                </span>
              </button>
            ))}
          </div>

          {/* Preview pane */}
          <div
            data-reveal
            style={{ opacity: 0, backgroundColor: "hsl(var(--l-bg-card-alt))", borderLeft: "1px solid hsl(var(--l-border))" }}
            className="lg:col-span-3 p-8 md:p-10 relative"
          >
            {/* Decorative corners */}
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r" style={{ borderColor: "hsl(var(--acid-label) / 0.4)" }} />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l" style={{ borderColor: "hsl(var(--acid-label) / 0.4)" }} />

            <div className="flex items-center justify-between mb-8">
              <p className="font-ibm text-[11px] font-bold tracking-[0.25em] uppercase text-l-faint">
                // LIVE PREVIEW
              </p>
              <span className="flex items-center gap-1.5 font-ibm text-[10px] tracking-[0.2em] uppercase text-acid-label">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(var(--acid-label))" }} />
                INTERACTIVE
              </span>
            </div>

            <ActivePreview />

            {/* Footer */}
            <div className="mt-8 pt-6 flex items-center justify-between" style={{ borderTop: "1px solid hsl(var(--l-border-sub))" }}>
              <span className="font-ibm text-[12px] text-l-muted">All components accessible by default</span>
              <Link href="/docs/components/button" className="font-ibm text-[13px] font-bold text-acid-label hover:opacity-75 transition-opacity">
                View all →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
