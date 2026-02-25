"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export function LandingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * 1200,
        y: Math.random() * 900,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const particleColor = isDark ? "128, 255, 0" : "40, 90, 0";
    const scanColor = isDark ? "rgba(128, 255, 0, 0.035)" : "rgba(40, 90, 0, 0.025)";
    const connectionBase = isDark ? 0.055 : 0.04;
    const particleAlpha = isDark ? 0.45 : 0.35;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      const scanY = (time * 55) % (h + 40) - 20;
      ctx.fillStyle = scanColor;
      ctx.fillRect(0, scanY, w, 2);

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
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
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${connectionBase * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [isDark]);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "hsl(var(--hero-bg))" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Scan-line film */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)"
            : "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.012) 3px, rgba(0,0,0,0.012) 4px)",
        }}
      />

      {/* Neo-geo corner markers */}
      {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((cls, i) => (
        <div key={i} className={`absolute m-6 w-7 h-7 ${cls}`} style={{ borderColor: "hsl(var(--hero-corner) / 0.55)" }} />
      ))}

      {/* Status bar */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-8 font-ibm text-[10px] tracking-[0.25em] uppercase"
        style={{ color: "hsl(var(--hero-text-faint))" }}
      >
        <span style={{ color: "hsl(var(--hero-accent))" }}>SYS.v0.15.0</span>
        <div className="flex items-center gap-6">
          <span>ARK UI / TW CSS</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: "hsl(var(--hero-accent))" }} />
            ONLINE
          </span>
        </div>
        <span>LIMINAL.UI</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 pt-8 pb-24">
        {/* Label pill */}
        <div
          className="mb-8 inline-flex items-center gap-3 px-4 py-2 font-ibm text-[11px] tracking-[0.25em] uppercase"
          style={{
            border: "1px solid hsl(var(--hero-accent) / 0.35)",
            backgroundColor: "hsl(var(--hero-accent) / 0.07)",
            color: "hsl(var(--hero-accent))",
          }}
        >
          <span className="w-2 h-2 rounded-none animate-pulse" style={{ backgroundColor: "hsl(var(--hero-accent))" }} />
          Component Library — Own Your UI
        </div>

        {/* Giant heading with glitch */}
        <div className="relative mb-1 overflow-hidden">
          <h1
            className="font-display leading-[0.9] tracking-tight select-none"
            style={{ fontSize: "clamp(5.5rem,17vw,14rem)", color: "hsl(var(--hero-text))", textShadow: `0 0 80px hsl(var(--hero-accent-glow) / 0.12)` }}
          >
            LIMINAL
          </h1>
          <span
            aria-hidden
            className="font-display absolute inset-0 leading-[0.9] tracking-tight animate-glitch-1 pointer-events-none"
            style={{ fontSize: "clamp(5.5rem,17vw,14rem)", color: "hsl(var(--hero-accent) / 0.28)", textShadow: "none" }}
          >
            LIMINAL
          </span>
          <span
            aria-hidden
            className="font-display absolute inset-0 leading-[0.9] tracking-tight animate-glitch-2 pointer-events-none"
            style={{ fontSize: "clamp(5.5rem,17vw,14rem)", color: "rgba(255,80,0,0.15)" }}
          >
            LIMINAL
          </span>
        </div>
        <div className="relative mb-10 overflow-hidden">
          <h1
            className="font-display leading-[0.9] tracking-tight select-none"
            style={{ fontSize: "clamp(2.8rem,8.5vw,7rem)", color: "hsl(var(--hero-text-sub))" }}
          >
            UI SYSTEM
          </h1>
          <div className="absolute left-0 top-1/2 w-full h-px pointer-events-none" style={{ backgroundColor: "hsl(var(--hero-accent) / 0.22)" }} />
        </div>

        {/* Descriptors */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 mb-12 font-ibm text-[13px]" style={{ color: "hsl(var(--hero-text-faint))" }}>
          <span style={{ borderLeft: "2px solid hsl(var(--hero-accent) / 0.55)", paddingLeft: "0.75rem" }}>
            Copy-paste React components.<br />No black boxes.
          </span>
          <div className="hidden sm:block w-px h-10" style={{ backgroundColor: "hsl(var(--hero-text-faint) / 0.2)" }} />
          <span style={{ borderLeft: "2px solid hsl(var(--hero-accent) / 0.3)", paddingLeft: "0.75rem" }}>
            Built on Ark UI primitives.<br />Styled with Tailwind v4.
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/docs/introduction"
            className="inline-flex items-center gap-2 px-8 h-12 font-ibm text-[13px] font-bold tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-85"
            style={{ backgroundColor: "hsl(var(--hero-cta-bg))", color: "hsl(var(--hero-cta-text))" }}
          >
            Initialize <span className="opacity-60">→</span>
          </Link>
          <Link
            href="/docs/components/button"
            className="inline-flex items-center px-8 h-12 font-ibm text-[13px] font-semibold tracking-[0.15em] uppercase transition-all duration-200"
            style={{ border: "1px solid hsl(var(--hero-outline-border) / 0.22)", color: "hsl(var(--hero-text))", backgroundColor: "transparent" }}
          >
            Browse Components
          </Link>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 flex items-end justify-between">
          <div className="font-ibm text-[10px] tracking-[0.25em] space-y-1" style={{ color: "hsl(var(--hero-text-faint) / 0.5)" }}>
            <div>COORD: 40.7128°N / 74.0060°W</div>
            <div style={{ color: "hsl(var(--hero-accent) / 0.5)" }}>// THRESHOLD STATE</div>
          </div>
          <div className="hidden md:flex items-center gap-2 font-ibm text-[10px] tracking-[0.25em]" style={{ color: "hsl(var(--hero-text-faint) / 0.4)" }}>
            <span>SCROLL</span>
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-px h-6" style={{ backgroundColor: "hsl(var(--hero-accent) / 0.35)" }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "hsl(var(--hero-accent) / 0.5)" }} />
            </div>
          </div>
          {/* Geo float */}
          <div
            className="w-28 h-28 opacity-[0.08] animate-float-geo pointer-events-none"
            style={{
              background: `conic-gradient(from 45deg, hsl(var(--hero-accent-glow) / 0.9) 0%, transparent 25%, hsl(var(--hero-accent-glow) / 0.5) 50%, transparent 75%)`,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            }}
          />
        </div>
      </div>

      {/* Large decorative number */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none overflow-hidden"
        style={{ fontSize: "clamp(8rem,20vw,20rem)", color: "hsl(var(--hero-text) / 0.025)" }}
      >
        001
      </div>
    </section>
  );
}
