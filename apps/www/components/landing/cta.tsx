"use client";

import Link from "next/link";

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-36 bg-l-bg-alt"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      {/* Radial glow using acid-label color, subtle in both modes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--acid-label) / 0.07) 0%, transparent 70%)" }}
      />

      {/* Corner markers */}
      {["top-8 left-8 border-t-2 border-l-2", "top-8 right-8 border-t-2 border-r-2", "bottom-8 left-8 border-b-2 border-l-2", "bottom-8 right-8 border-b-2 border-r-2"].map((cls, i) => (
        <div key={i} className={`absolute w-10 h-10 ${cls}`} style={{ borderColor: "hsl(var(--acid-label) / 0.4)" }} />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Overline */}
        <p className="font-ibm text-[11px] font-bold tracking-[0.35em] uppercase mb-6 text-acid-label">
          § INITIALIZATION PROTOCOL
        </p>

        {/* Headline */}
        <h2
          className="font-display leading-none tracking-tight mb-8 text-l-primary"
          style={{ fontSize: "clamp(4.5rem,13vw,10rem)" }}
        >
          START<br />BUILDING.
        </h2>

        {/* Sub */}
        <p className="font-ibm text-[16px] max-w-xl mx-auto mb-12 leading-relaxed text-l-muted">
          Two commands. Full ownership. Components that respect your architecture.
        </p>

        {/* Terminal */}
        <div
          className="mx-auto max-w-md mb-12 p-5 text-left font-ibm text-[14px] bg-l-card"
          style={{ border: "1px solid hsl(var(--l-border))" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--l-text-faint))" }} />
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(var(--acid-label) / 0.7)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--l-text-faint))" }} />
          </div>
          <p>
            <span className="text-acid-label">$</span>{" "}
            <span className="text-l-muted">npx liminal-ui</span>{" "}
            <span className="text-l-primary font-bold">init</span>
          </p>
          <p className="mt-1">
            <span className="text-acid-label">$</span>{" "}
            <span className="text-l-muted">npx liminal-ui</span>{" "}
            <span className="text-l-primary font-bold">add button</span>
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs/introduction"
            className="inline-flex items-center px-10 h-14 font-ibm text-[13px] font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "hsl(var(--l-text))",
              color: "hsl(var(--l-bg))",
            }}
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/silvak/liminal-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-10 h-14 font-ibm text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-l-card transition-colors duration-200"
            style={{
              border: "1px solid hsl(var(--l-border))",
              color: "hsl(var(--l-text))",
              backgroundColor: "transparent",
            }}
          >
            GitHub ↗
          </Link>
        </div>

        <p className="mt-14 font-ibm text-[11px] tracking-[0.25em] uppercase text-l-faint">
          Open source · MIT License · No account required
        </p>
      </div>
    </section>
  );
}
