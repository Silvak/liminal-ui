"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import type { DocHeading } from "../../lib/docs";
import { useLocaleOptional } from "../../components/locale-provider";

const TOC_LABELS = {
  en: { heading: "On this page", aria: "Table of contents" },
  es: { heading: "En esta página", aria: "Tabla de contenidos" },
} as const;

interface TableOfContentsProps {
  headings: DocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const locale = useLocaleOptional() ?? "en";
  const [activeId, setActiveId] = React.useState<string>(
    headings[0]?.id ?? "",
  );
  const [transitionsEnabled, setTransitionsEnabled] = React.useState(false);
  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    if (!headings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
          if (!hasMounted.current) {
            hasMounted.current = true;
            requestAnimationFrame(() => setTransitionsEnabled(true));
          }
        }
      },
      {
        rootMargin: "-96px 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    }

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (atBottom && headings.length > 0) {
        setActiveId(headings[headings.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <aside
      className="hidden xl:block xl:fixed xl:top-14 xl:right-0 xl:z-30 xl:h-[calc(100vh-3.5rem)] xl:w-[220px] xl:pt-8 xl:pr-8"
      aria-label={TOC_LABELS[locale].aria}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {TOC_LABELS[locale].heading}
      </p>
      <nav className="space-y-0.5">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "relative block py-1.5 pl-3 text-sm font-normal text-muted-foreground hover:text-foreground before:absolute before:left-0 before:top-1/2 before:h-[26px] before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-transparent before:content-['']",
                transitionsEnabled &&
                  "transition-colors duration-200 before:transition-[background-color] before:duration-200",
                heading.level === 3 && "pl-6 text-[13px]",
                isActive && "text-foreground before:bg-foreground",
              )}
            >
              {heading.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
