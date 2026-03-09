"use client";

import { useEffect, useRef, useState } from "react";
import type { LandingDictionary } from "../../lib/landing-dictionary";

type MetricsTranslations = LandingDictionary["metrics"];

export function MetricsSection({ t }: { t: MetricsTranslations }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        backgroundColor: "hsl(var(--m-bg))",
        borderTop: "1px solid hsl(var(--m-border))",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 10%, hsl(var(--m-accent) / 0.05) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display leading-none select-none pointer-events-none overflow-hidden"
        style={{ fontSize: "clamp(8rem,20vw,18rem)", color: "hsl(var(--m-accent) / 0.07)" }}
      >
        {t.watermark}
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <p
          className="mb-12 font-ibm text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: "hsl(var(--m-text-muted))" }}
        >
          {t.overline}
        </p>

        <div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {t.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden border bg-l-card p-8 md:p-10 ${visible ? "animate-counter-in" : "opacity-0"}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
                borderColor: "hsl(var(--m-border))",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "hsl(var(--m-accent))" }}
              />
              <div
                className="relative z-10 mb-2 font-display leading-none"
                style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", color: "hsl(var(--m-text))" }}
              >
                {stat.value}
              </div>
              <div
                className="relative z-10 mb-1 font-ibm text-[13px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "hsl(var(--m-text-muted))" }}
              >
                {stat.label}
              </div>
              <div
                className="relative z-10 font-ibm text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--m-text-faint))" }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 border p-5 font-ibm text-[13px] code-block-glass"
          style={{
            borderColor: "hsl(var(--m-border))",
            backgroundColor: "hsl(var(--m-terminal-bg))",
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--m-text-faint))" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--m-accent))" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--m-text-faint))" }} />
            <span
              className="ml-2 font-ibm text-[10px] tracking-[0.25em] uppercase font-bold"
              style={{ color: "hsl(var(--m-text-faint))" }}
            >
              {t.terminalTitle}
            </span>
          </div>
          <p style={{ color: "hsl(var(--m-text))" }}>
            $ <span style={{ color: "hsl(var(--m-text-muted))" }}>npx liminal-ui</span>{" "}
            <span style={{ fontWeight: 700 }}>{t.terminalLine1}</span>
          </p>
          <div className="mt-1" style={{ color: "hsl(var(--m-text-muted))" }}>
            <p>✓ {t.terminalOutput1}</p>
            <p>✓ {t.terminalOutput2}</p>
            <p>✓ {t.terminalOutput3}</p>
          </div>
          <p className="mt-2" style={{ color: "hsl(var(--m-text))" }}>
            $ <span className="animate-terminal-blink" style={{ color: "hsl(var(--m-accent))" }}>_</span>
          </p>
        </div>
      </div>
    </section>
  );
}
