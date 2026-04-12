"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLocaleOptional } from "@/components/locale-provider";

export type TocSection = {
  id: string;
  label: string;
};

type Props = {
  sections: TocSection[];
};

const TOC_LABELS = {
  en: { heading: "On this page", aria: "Table of contents" },
  es: { heading: "En esta página", aria: "Tabla de contenidos" },
} as const;

export function DsToc({ sections }: Props) {
  const locale = (useLocaleOptional() ?? "en") as "en" | "es";
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const [transitionsEnabled, setTransitionsEnabled] = useState(false);
  const hasMounted = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );

        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
          if (!hasMounted.current) {
            hasMounted.current = true;
            requestAnimationFrame(() => setTransitionsEnabled(true));
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observerRef.current.observe(el);
    }

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (atBottom && sections.length > 0) {
        setActive(sections[sections.length - 1].id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  if (!sections.length) return null;

  return (
    <aside
      className="hidden xl:block xl:fixed xl:top-14 xl:right-0 xl:z-30 xl:h-[calc(100vh-3.5rem)] xl:w-[220px] xl:pt-8 xl:pr-8"
      aria-label={TOC_LABELS[locale].aria}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {TOC_LABELS[locale].heading}
      </p>
      <nav className="space-y-0.5">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "relative block py-1.5 pl-3 text-sm font-normal text-muted-foreground hover:text-foreground",
                "before:absolute before:left-0 before:top-1/2 before:h-[26px] before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-transparent before:content-['']",
                transitionsEnabled &&
                  "transition-colors duration-200 before:transition-[background-color] before:duration-200",
                isActive && "text-foreground before:bg-foreground"
              )}
            >
              {s.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
