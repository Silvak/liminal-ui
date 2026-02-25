"use client";

import { useEffect, useRef } from "react";

const STACK = [
  {
    layer: "L1", name: "YOUR CODEBASE",
    description: "Components live in your repo. Fully visible, editable, deletable.",
    accent: "hsl(var(--acid-label))", width: "100%",
  },
  {
    layer: "L2", name: "TAILWIND CSS v4",
    description: "CSS-first configuration. Design tokens as CSS variables.",
    accent: "hsl(200 75% 45%)", width: "82%",
  },
  {
    layer: "L3", name: "ARK UI PRIMITIVES",
    description: "Headless logic. ARIA-compliant. Framework-agnostic.",
    accent: "hsl(266 60% 55%)", width: "65%",
  },
  {
    layer: "L4", name: "REACT / NEXT.JS",
    description: "First-class support. Server & client components.",
    accent: "hsl(200 80% 50%)", width: "50%",
  },
];

export function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-bar]").forEach((bar, i) => {
              setTimeout(() => {
                const el = bar as HTMLElement;
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-28 bg-l-bg"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      {/* Vertical center decoration */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, hsl(var(--acid-label) / 0.12) 30%, hsl(var(--acid-label) / 0.12) 70%, transparent)" }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left text */}
          <div>
            <p className="font-ibm text-xs font-bold tracking-[0.3em] uppercase mb-4 text-acid-label">
              § SYSTEM ARCHITECTURE
            </p>
            <h2 className="font-display leading-none tracking-tight mb-6 text-l-primary" style={{ fontSize: "clamp(2.5rem,5.5vw,4.8rem)" }}>
              THE STACK<br />BLUEPRINT
            </h2>
            <p className="font-ibm text-[14px] leading-relaxed mb-10 max-w-md text-l-muted">
              Liminal UI is not a runtime dependency — it&apos;s a layered architecture that respects your ownership at every level. From the rendering layer down to the raw CSS substrate.
            </p>
            <div className="space-y-3" style={{ borderLeft: "2px solid hsl(var(--acid-label) / 0.3)", paddingLeft: "1rem" }}>
              {[
                "No proprietary runtime required",
                "Tree-shaking friendly",
                "Zero config to get started",
                "Works with any Tailwind project",
              ].map((note) => (
                <p key={note} className="font-ibm text-[13px] text-l-muted">
                  <span className="text-acid-label">→</span> {note}
                </p>
              ))}
            </div>
          </div>

          {/* Right: layer diagram */}
          <div className="space-y-3">
            {STACK.map((layer, i) => (
              <div
                key={layer.layer}
                data-bar
                className="relative bg-l-card transition-all duration-300"
                style={{
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  width: layer.width,
                  border: "1px solid hsl(var(--l-border))",
                }}
              >
                {/* Colored left accent */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: layer.accent }} />
                <div className="px-5 py-4 pl-6">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display text-2xl tracking-wider" style={{ color: layer.accent }}>
                      {layer.name}
                    </span>
                    <span className="font-ibm text-[11px] font-bold tracking-[0.25em] text-l-faint">{layer.layer}</span>
                  </div>
                  <p className="font-ibm text-[13px] text-l-muted">{layer.description}</p>
                </div>
                {i < STACK.length - 1 && (
                  <div className="absolute -bottom-2 left-6 w-px h-2" style={{ backgroundColor: "hsl(var(--l-border))" }} />
                )}
              </div>
            ))}
            {/* Note */}
            <div className="mt-4 p-4" style={{ border: "1px dashed hsl(var(--l-border))" }}>
              <p className="font-ibm text-[12px] text-l-muted">
                <span className="text-acid-label font-bold">NOTE:</span>{" "}
                Only L1 exists in your project. Layers 2–4 are peer deps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
