"use client";

import { useEffect, useRef } from "react";
import type { LandingDictionary } from "../../lib/landing-dictionary";

type PhilosophyTranslations = LandingDictionary["philosophy"];

export function PhilosophySection({ t }: { t: PhilosophyTranslations }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-reveal]").forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.12}s`;
              el.classList.add("animate-reveal-up");
              (el as HTMLElement).style.opacity = "1";
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-l-bg py-24 lg:py-28"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, hsl(var(--acid-label) / 0.08), transparent 45%), radial-gradient(circle at 80% 75%, hsl(var(--acid-label) / 0.05), transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="mb-14 max-w-3xl border-l-2 pl-6"
          data-reveal
          style={{ opacity: 0, borderColor: "hsl(var(--acid-label) / 0.45)" }}
        >
          <p className="mb-4 font-ibm text-xs font-bold uppercase tracking-[0.3em] text-acid-label">
            {t.overline}
          </p>
          <h2 className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-tight text-l-primary">
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {t.pillars.map((pillar, i) => {
            const layoutClass =
              i === 0
                ? "lg:col-span-7"
                : i === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-12";
            return (
            <div
              key={pillar.index}
              data-reveal
              style={{
                opacity: 0,
              }}
              className={`group relative min-h-[230px] overflow-hidden border bg-l-card p-8 transition-colors duration-300 hover:bg-l-card-alt md:p-10 ${layoutClass}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at center, hsl(var(--acid-label) / 0.15) 0%, transparent 60%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-grid opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                style={{ backgroundSize: "32px 32px" }}
              />

              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: "hsl(var(--acid-label) / 0.75)" }} />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: "hsl(var(--acid-label) / 0.75)" }} />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-display text-6xl leading-none text-l-faint select-none">
                    {pillar.index}
                  </span>
                  <span className="mt-1 font-ibm text-[10px] font-bold uppercase tracking-[0.25em] text-acid-label">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="mb-4 font-display text-3xl tracking-wider text-l-primary md:text-[2rem]">
                  {pillar.title}
                </h3>
                <p className="flex-1 font-ibm text-[14px] leading-[1.72] text-l-muted">
                  {pillar.body}
                </p>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full"
                  style={{ backgroundColor: "hsl(var(--acid-label))" }}
                />
              </div>
            </div>
          )})}
        </div>

        <div
          data-reveal
          style={{ opacity: 0, borderTop: "1px solid hsl(var(--l-border))" }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8"
        >
          <p className="max-w-lg font-ibm text-[13px] text-l-muted">
            {t.footerQuote}
          </p>
          <div className="flex items-center gap-2 font-ibm text-[12px] text-acid-label">
            <span
              className="h-2 w-2 animate-pulse"
              style={{ backgroundColor: "hsl(var(--acid-label))" }}
            />
            <span>{t.footerBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
