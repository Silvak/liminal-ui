"use client";

import Link from "next/link";
import { useLocale } from "../locale-provider";
import type { LandingDictionary } from "../../lib/landing-dictionary";

type CtaTranslations = LandingDictionary["cta"];

export function CtaSection({ t }: { t: CtaTranslations }) {
  const locale = useLocale();
  return (
    <section
      className="relative overflow-hidden bg-l-bg-alt py-24 lg:py-32"
      style={{ borderTop: "1px solid hsl(var(--l-border))" }}
    >
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--acid-label) / 0.07) 0%, transparent 70%)" }}
      />

      {["top-8 left-8 border-t-2 border-l-2", "top-8 right-8 border-t-2 border-r-2", "bottom-8 left-8 border-b-2 border-l-2", "bottom-8 right-8 border-b-2 border-r-2"].map((cls, i) => (
        <div key={i} className={`absolute w-10 h-10 ${cls}`} style={{ borderColor: "hsl(var(--acid-label) / 0.4)" }} />
      ))}

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div
          className="border bg-l-bg p-8 text-center md:p-12"
          style={{ borderColor: "hsl(var(--l-border))", backdropFilter: "blur(6px)" }}
        >
          <p className="mb-5 font-ibm text-[11px] font-bold uppercase tracking-[0.35em] text-acid-label">
            {t.overline}
          </p>

          <h2
            className="mb-8 font-display leading-none tracking-tight text-l-primary"
            style={{ fontSize: "clamp(3.4rem,11vw,8rem)" }}
          >
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </h2>

          <p className="mx-auto mb-10 max-w-xl font-ibm text-[15px] leading-[1.72] text-l-muted">
            {t.sub}
          </p>

          <div
            className="code-block-glass mx-auto mb-10 max-w-lg border bg-l-card p-5 text-left font-ibm text-[14px]"
            style={{ borderColor: "hsl(var(--l-border))" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--l-text-faint))" }} />
              <div
                className="h-2.5 w-2.5 animate-pulse rounded-full"
                style={{ backgroundColor: "hsl(var(--acid-label) / 0.7)" }}
              />
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--l-text-faint))" }} />
            </div>
            <p>
              <span className="text-acid-label">$</span>{" "}
              <span className="text-l-muted">npx liminal-ui</span>{" "}
              <span className="font-bold text-l-primary">init</span>
            </p>
            <p className="mt-1">
              <span className="text-acid-label">$</span>{" "}
              <span className="text-l-muted">npx liminal-ui</span>{" "}
              <span className="font-bold text-l-primary">add button</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/docs/introduction`}
              className="inline-flex h-14 items-center px-10 font-ibm text-[13px] font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "hsl(var(--l-text))",
                color: "hsl(var(--l-bg))",
              }}
            >
              {t.ctaGetStarted}
            </Link>
            <Link
              href="https://github.com/silvak/liminal-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center px-10 font-ibm text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200 hover:bg-l-card"
              style={{
                border: "1px solid hsl(var(--l-border))",
                color: "hsl(var(--l-text))",
                backgroundColor: "transparent",
              }}
            >
              {t.ctaGitHub}
            </Link>
          </div>

          <p className="mt-12 font-ibm text-[11px] uppercase tracking-[0.25em] text-l-faint">
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
