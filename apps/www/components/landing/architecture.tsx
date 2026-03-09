"use client";

import { useEffect, useRef } from "react";
import type { LandingDictionary } from "../../lib/landing-dictionary";

const STACK_ACCENTS = [
  "hsl(var(--acid-label))",
  "hsl(200 75% 45%)",
  "hsl(266 60% 55%)",
  "hsl(200 80% 50%)",
] as const;

type ArchitectureTranslations = LandingDictionary["architecture"];

export function ArchitectureSection({ t }: { t: ArchitectureTranslations }) {
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
                el.style.transform = "translateY(0)";
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
      className="relative overflow-hidden bg-l-bg py-24 lg:py-28"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, hsl(var(--acid-label) / 0.08), transparent 42%), radial-gradient(circle at 75% 70%, hsl(var(--acid-label) / 0.06), transparent 38%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-4 font-ibm text-xs font-bold uppercase tracking-[0.3em] text-acid-label">
              {t.overline}
            </p>
            <h2
              className="mb-6 font-display leading-none tracking-tight text-l-primary"
              style={{ fontSize: "clamp(2.5rem,5.5vw,4.8rem)" }}
            >
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </h2>
            <p className="mb-10 max-w-md font-ibm text-[14px] leading-[1.72] text-l-muted">
              {t.intro}
            </p>
            <div
              className="space-y-3 border-l-2 pl-4"
              style={{ borderColor: "hsl(var(--acid-label) / 0.3)" }}
            >
              {t.notes.map((note) => (
                <p key={note} className="font-ibm text-[13px] text-l-muted">
                  <span className="text-acid-label">→</span> {note}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:col-span-7">
            {t.stack.map((layer, i) => (
              <div
                key={layer.layer}
                data-bar
                className="relative overflow-hidden border bg-l-card transition-all duration-300"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  width: layer.width,
                  borderColor: "hsl(var(--l-border))",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: STACK_ACCENTS[i] }} />
                <div className="relative z-10 px-5 py-4 pl-6">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-display text-2xl tracking-wider" style={{ color: STACK_ACCENTS[i] }}>
                      {layer.name}
                    </span>
                    <span className="font-ibm text-[11px] font-bold tracking-[0.25em] text-l-faint">{layer.layer}</span>
                  </div>
                  <p className="font-ibm text-[13px] text-l-muted">{layer.description}</p>
                </div>
                {i < t.stack.length - 1 && (
                  <div className="absolute -bottom-2 left-6 w-px h-2" style={{ backgroundColor: "hsl(var(--l-border))" }} />
                )}
              </div>
            ))}

            <div
              className="mt-4 border border-dashed p-4"
              style={{ borderColor: "hsl(var(--l-border))", backgroundColor: "hsl(var(--l-bg-card-alt) / 0.45)" }}
            >
              <p className="font-ibm text-[12px] text-l-muted">
                <span className="text-acid-label font-bold">{t.noteLabel}</span>{" "}
                {t.noteText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
