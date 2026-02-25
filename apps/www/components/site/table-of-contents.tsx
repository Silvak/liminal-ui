"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import type { DocHeading } from "../../lib/docs";

interface TableOfContentsProps {
  headings: DocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");

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

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <aside
      className="sticky top-20 hidden h-[calc(100vh-6rem)] overflow-y-auto xl:block"
      aria-label="Table of contents"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        En esta pagina
      </p>
      <nav className="space-y-0.5">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block rounded-md border border-transparent px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                heading.level === 3 && "ml-3 text-[13px]",
                isActive && "border-border bg-muted text-foreground",
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
