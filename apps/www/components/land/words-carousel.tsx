"use client";

import {
  Box,
  Clipboard,
  Cpu,
  FileCode,
  GitBranch,
  Layers,
  Lock,
  Terminal,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Box,
  Clipboard,
  Cpu,
  FileCode,
  GitBranch,
  Layers,
  Lock,
  Terminal,
  Wind,
};

export type WordsCarouselItem = {
  iconKey: string;
  label: string;
};

type WordsCarouselProps = {
  items: WordsCarouselItem[];
  className?: string;
};

function CarouselItem({ iconKey, label }: WordsCarouselItem) {
  const Icon = ICON_MAP[iconKey];
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-ibm text-sm uppercase tracking-widest text-foreground/70">
      {Icon ? <Icon className="h-5 w-5 shrink-0" strokeWidth={1} /> : null}
      {label}
    </span>
  );
}

export function WordsCarousel({ items, className }: WordsCarouselProps) {
  if (!items.length) return null;

  return (
    <div
      className={cn(
        "flex h-full w-full items-center overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex animate-words-carousel items-center gap-16">
        {items.map((item, i) => (
          <CarouselItem key={`${item.iconKey}-${i}`} {...item} />
        ))}
        {items.map((item, i) => (
          <CarouselItem key={`${item.iconKey}-dup-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}
