"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const SCROLL_FACTOR = 0.12;

type ParallaxCloudProps = {
  className?: string;
  src?: string;
  /** Si es false, desactiva el parallax de hover y scroll. Por defecto true. */
  parallaxEnabled?: boolean;
};

export function ParallaxCloud({
  className,
  src = "/cloud1.png",
  parallaxEnabled = true,
}: ParallaxCloudProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const nextOffsetRef = useRef({ x: 0, y: 0 });

  const commitOffset = useCallback(() => {
    rafRef.current = null;
    setOffset(nextOffsetRef.current);
  }, []);

  const scheduleCommit = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(commitOffset);
  }, [commitOffset]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!parallaxEnabled) return;
    let raf: number | null = null;
    const onScroll = () => {
      if (raf != null) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        setScrollOffsetY(window.scrollY * SCROLL_FACTOR);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallaxEnabled]);

  useEffect(() => {
    if (!parallaxEnabled) return;
    const hero = document.getElementById("hero");
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
      const py = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
      nextOffsetRef.current = { x: px * 2 * 18, y: py * 2 * 14 };
      scheduleCommit();
    };

    const onLeave = () => {
      nextOffsetRef.current = { x: 0, y: 0 };
      scheduleCommit();
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [parallaxEnabled, scheduleCommit]);

  const transition = useMemo(
    () => "transform 420ms cubic-bezier(0.33, 1, 0.68, 1)",
    [],
  );

  const transformX = parallaxEnabled ? offset.x : 0;
  const transformY = parallaxEnabled ? offset.y + scrollOffsetY : 0;

  return (
    <div className={className}>
      <style>{`
        @keyframes parallax-cloud-float {
          0%   { transform: translate(0, 0); }
          20%  { transform: translate(4px, -8px); }
          40%  { transform: translate(-3px, -5px); }
          60%  { transform: translate(5px, -12px); }
          80%  { transform: translate(-2px, -7px); }
          100% { transform: translate(1px, -3px); }
        }
        .parallax-cloud-float {
          animation: parallax-cloud-float 12s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
        }
      `}</style>
      <div
        style={{
          transform: `translate3d(${transformX}px, ${transformY}px, 0)`,
          transition,
          willChange: "transform",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <div
          className="parallax-cloud-float"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image
            src={src}
            alt="Hero Image"
            fill
            className="object-contain opacity-80 sm:opacity-100 dark:brightness-[0.8] dark:opacity-98"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
