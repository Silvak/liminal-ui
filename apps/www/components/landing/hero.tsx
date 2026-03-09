"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLocale } from "../locale-provider";
import type { LandingDictionary } from "../../lib/landing-dictionary";

type HeroTranslations = LandingDictionary["hero"];

export function LandingHero({ t }: { t: HeroTranslations }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const locale = useLocale();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];
    // Menos partículas para un look más cinemático y limpio
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * 1200,
        y: Math.random() * 900,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const particleColor = isDark ? "128, 255, 0" : "40, 90, 0";
    const connectionBase = isDark ? 0.03 : 0.02;
    const particleAlpha = isDark ? 0.3 : 0.2;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity * particleAlpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${connectionBase * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isDark]);

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      {/* Glow radial central verde ácido suave */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--acid-label) / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Partículas sutiles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {/* Top Status Bar simplificada sin bordes de caja */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8 font-ibm text-[10px] uppercase tracking-[0.24em] md:px-12">
        <span style={{ color: "hsl(var(--acid-label))" }}>{t.sysVersion}</span>
        <div className="hidden items-center gap-6 md:flex" style={{ color: "hsl(var(--muted-foreground))" }}>
          <span>{t.arkTw}</span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: "hsl(var(--acid-label))" }}
            />
            {t.online}
          </span>
        </div>
        <span style={{ color: "hsl(var(--muted-foreground))" }}>{t.liminalUi}</span>
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-6 pb-20 pt-12 text-center md:px-12">
        {/* Label Pill flotante */}
        <div
          className="mb-8 inline-flex max-w-full items-center gap-3 rounded-full border px-5 py-2 font-ibm text-[11px] uppercase tracking-[0.25em] transition-all hover:bg-white/5"
          style={{
            borderColor: "hsl(var(--acid-label) / 0.3)",
            backgroundColor: "hsl(var(--acid-label) / 0.05)",
            color: "hsl(var(--acid-label))",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full" style={{ backgroundColor: "hsl(var(--acid-label))" }} />
          <span className="min-w-0 wrap-break-word">{t.pillLabel}</span>
        </div>

        {/* Tipografía Extra Grande Flotante */}
        <div className="mx-auto mb-2 max-w-fit">
          <h1
            className="font-display leading-[0.85] tracking-tight"
            style={{
              fontSize: "clamp(4.5rem, 16vw, 14rem)",
              color: "hsl(var(--foreground))",
              textShadow: "0 0 60px hsl(var(--acid-label) / 0.15)",
            }}
          >
            {t.title1}
          </h1>
        </div>

        <div className="mx-auto mb-10 max-w-fit">
          <h1
            className="font-display leading-[0.85] tracking-tight"
            style={{
              fontSize: "clamp(2.8rem, 10vw, 8rem)",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            {t.title2}
          </h1>
        </div>

        {/* Descripción centralizada */}
        <p className="mb-12 max-w-2xl text-center font-ibm text-[14px] leading-relaxed text-muted-foreground md:text-[16px]" style={{ color: "hsl(var(--muted-foreground))" }}>
          {t.descriptor1Line1} {t.descriptor1Line2} <br className="hidden md:block" />
          {t.descriptor2Line1} {t.descriptor2Line2}
        </p>

        {/* CTAs minimalistas */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href={`/${locale}/docs/introduction`}
            className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-10 font-ibm text-[13px] font-bold uppercase tracking-[0.15em] transition-transform hover:scale-105"
            style={{ backgroundColor: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
          >
            <span className="relative z-10">{t.ctaInit}</span>
            <span className="relative z-10 opacity-60 transition-transform group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-20" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--acid-label)), transparent)" }} />
          </Link>
          <Link
            href={`/${locale}/docs/components/button`}
            className="inline-flex h-14 items-center rounded-full border px-10 font-ibm text-[13px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-white/5"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
          >
            {t.ctaBrowse}
          </Link>
        </div>
      </div>

      {/* Bottom Bar Cinematic */}
      <div className="absolute bottom-8 left-6 right-6 z-10 md:left-12 md:right-12">
        <div className="flex items-end justify-between font-ibm text-[10px] tracking-[0.25em]" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
          <div className="space-y-1">
            <div>{t.coord}</div>
            <div style={{ color: "hsl(var(--acid-label) / 0.7)" }}>{t.thresholdState}</div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span>{t.scroll}</span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-px opacity-50" style={{ background: "linear-gradient(to bottom, hsl(var(--acid-label)), transparent)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
