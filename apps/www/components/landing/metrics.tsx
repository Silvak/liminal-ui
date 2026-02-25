"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "15+", label: "Components", sub: "production-ready" },
  { value: "0",   label: "Black Boxes", sub: "everything visible" },
  { value: "100%",label: "Ownership",   sub: "copy into your repo" },
  { value: "∞",   label: "Adaptable",   sub: "no runtime dep" },
];

export function MetricsSection() {
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
      {/* Crosshatch */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--m-accent) / 0.06) 0px, hsl(var(--m-accent) / 0.06) 1px, transparent 1px, transparent 40px)" }}
      />
      {/* Ghost watermark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-display leading-none select-none pointer-events-none overflow-hidden"
        style={{ fontSize: "clamp(8rem,20vw,18rem)", color: "hsl(var(--m-accent) / 0.07)" }}
      >
        DATA
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <p
          className="font-ibm text-xs font-bold tracking-[0.3em] uppercase mb-12"
          style={{ color: "hsl(var(--m-text-muted))" }}
        >
          § TELEMETRY
        </p>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ border: "1px solid hsl(var(--m-border))" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative p-8 md:p-12 group ${visible ? "animate-counter-in" : "opacity-0"}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
                borderRight: "1px solid hsl(var(--m-border))",
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "hsl(var(--m-accent))" }}
              />
              <div
                className="font-display leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", color: "hsl(var(--m-text))" }}
              >
                {stat.value}
              </div>
              <div
                className="font-ibm text-[13px] font-bold uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(var(--m-text-muted))" }}
              >
                {stat.label}
              </div>
              <div
                className="font-ibm text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "hsl(var(--m-text-faint))" }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal block */}
        <div
          className="mt-10 p-5 font-ibm text-[13px]"
          style={{
            border: "1px solid hsl(var(--m-border))",
            backgroundColor: "hsl(var(--m-terminal-bg))",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--m-text-faint))" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--m-accent))" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--m-text-faint))" }} />
            <span
              className="ml-2 font-ibm text-[10px] tracking-[0.25em] uppercase font-bold"
              style={{ color: "hsl(var(--m-text-faint))" }}
            >
              TERMINAL — liminal-ui v0.15.0
            </span>
          </div>
          <p style={{ color: "hsl(var(--m-text))" }}>
            $ <span style={{ color: "hsl(var(--m-text-muted))" }}>npx liminal-ui</span>{" "}
            <span style={{ fontWeight: 700 }}>init</span>
          </p>
          <div className="mt-1" style={{ color: "hsl(var(--m-text-muted))" }}>
            <p>✓ Resolved dependencies</p>
            <p>✓ Copied to ./components/ui/button.tsx</p>
            <p>✓ Ready. No lock-in.</p>
          </div>
          <p className="mt-2" style={{ color: "hsl(var(--m-text))" }}>
            $ <span className="animate-terminal-blink" style={{ color: "hsl(var(--m-accent))" }}>_</span>
          </p>
        </div>
      </div>
    </section>
  );
}
