"use client";

import { useEffect, useRef } from "react";

const PILLARS = [
  {
    index: "01",
    title: "THRESHOLD DESIGN",
    body: "We operate in the space between raw utility and refined aesthetics. Liminal UI inhabits the threshold — not quite framework, not quite library. Code you copy, adapt, and truly own.",
    tag: "// PHILOSOPHY",
  },
  {
    index: "02",
    title: "ZERO BLACK BOXES",
    body: "Every component lives in your repository. There is no runtime dependency to version bump. No proprietary opinions buried in node_modules. Just source code — transparent, hackable, yours.",
    tag: "// OWNERSHIP",
  },
  {
    index: "03",
    title: "STRUCTURED FREEDOM",
    body: "Ark UI handles the logic. Tailwind handles the aesthetics. You handle the vision. The primitives are invisible — only the geometry of your interface remains.",
    tag: "// ARCHITECTURE",
  },
];

export function PhilosophySection() {
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
      className="relative overflow-hidden py-28 bg-l-bg"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 max-w-3xl" data-reveal style={{ opacity: 0 }}>
          <p className="font-ibm text-xs font-bold tracking-[0.3em] uppercase mb-5 text-acid-label">
            § CORE DOCTRINE
          </p>
          <h2 className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-tight text-l-primary">
            THE LIMINAL<br />DOCTRINE
          </h2>
        </div>

        {/* Pillar cards — with background */}
        <div
          className="grid md:grid-cols-3 gap-0"
          style={{ border: "1px solid hsl(var(--l-border))" }}
        >
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.index}
              data-reveal
              style={{
                opacity: 0,
                borderRight: i < 2 ? "1px solid hsl(var(--l-border))" : undefined,
              }}
              className="relative p-8 md:p-10 group bg-l-card hover:bg-l-card-alt transition-colors duration-300"
            >
              {/* Hover corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-acid opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: "hsl(var(--acid-label))" }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: "hsl(var(--acid-label))" }} />

              {/* Index + Tag */}
              <div className="mb-6 flex items-start justify-between">
                <span className="font-display text-6xl leading-none select-none text-l-faint">{pillar.index}</span>
                <span className="font-ibm text-[10px] font-bold tracking-[0.25em] mt-1 text-acid-label">{pillar.tag}</span>
              </div>

              <h3 className="font-display text-3xl md:text-[2rem] tracking-wider mb-4 text-l-primary">
                {pillar.title}
              </h3>
              <p className="font-ibm text-[14px] leading-relaxed text-l-muted">
                {pillar.body}
              </p>

              {/* Bottom slide line on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: "hsl(var(--acid-label))" }}
              />
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div
          data-reveal
          style={{ opacity: 0, borderTop: "1px solid hsl(var(--l-border))" }}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8"
        >
          <p className="font-ibm text-[13px] max-w-lg text-l-muted">
            {">"} Designed for developers who believe that the gap between idea and interface should be as thin as possible.
          </p>
          <div className="flex items-center gap-2 font-ibm text-[12px] text-acid-label">
            <span className="w-2 h-2" style={{ backgroundColor: "hsl(var(--acid-label))" }} />
            <span>THRESHOLD STATE ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
