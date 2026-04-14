"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SCROLL_FACTOR = 1.0;

export function ParallaxDivider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        const bg = bgRef.current;
        if (!section || !bg) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = rect.top + rect.height / 2 - vh / 2;
        bg.style.transform = `translate3d(0, ${progress * SCROLL_FACTOR}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[500px] md:h-[650px] overflow-hidden"
      aria-hidden="true"
    >
      {/* wrapper del parallax: se extiende 20% arriba/abajo para tener rango de movimiento */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0"
        style={{
          top: "-150%",
          bottom: "-150%",
          willChange: "transform",
        }}
      >
        <Image
          src="/parallax-bg.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          sizes="100vw"
          priority
        />
      </div>

      {/* sombra interna para efecto ventana */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 60px 80px -20px rgba(0,0,0,0.35), inset 0 -60px 80px -20px rgba(0,0,0,0.35)",
        }}
      />
    </div>
  );
}
