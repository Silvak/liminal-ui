import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

const DEFAULT_BLOG_HERO_IMAGE = "/parallax-bg.jpg";

export type BlogHeroVariant = "list" | "article";

export interface BlogHeroProps {
  /** `list`: hero plano del índice. `article`: imagen, overlay y contraste sobre foto. */
  variant: BlogHeroVariant;
  eyebrow: string;
  title: ReactNode;
  aside: ReactNode;
  /**
   * Solo en `variant="article"`. Si se define, sustituye el fondo por defecto (`/parallax-bg.jpg`).
   * Ruta pública bajo `public/` (p. ej. `/blog/cover.jpg`).
   */
  backgroundImage?: string;
  priorityImage?: boolean;
  top?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function BlogHero({
  variant,
  eyebrow,
  title,
  aside,
  backgroundImage,
  priorityImage = false,
  top,
  footer,
  className,
}: BlogHeroProps) {
  const isArticle = variant === "article";
  const src = backgroundImage ?? DEFAULT_BLOG_HERO_IMAGE;

  /** Legibilidad sobre la foto: halo con color de fondo del tema. */
  const heroTextHalo =
    "[text-shadow:0_0_14px_hsl(var(--background)),0_1px_2px_hsl(var(--background))]";

  return (
    <div
      className={cn(
        "relative w-full border-b px-6 py-8 md:px-10",
        isArticle &&
          "min-h-[min(42vh,320px)] overflow-hidden md:min-h-[280px]",
        className,
      )}
    >
      {isArticle && (
        <>
          <Image
            src={src}
            alt=""
            fill
            priority={priorityImage}
            className="z-0 object-cover object-center brightness-[1.07] contrast-[1.03]"
            sizes="(max-width: 1440px) 100vw, 1440px"
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-1",
              "bg-white/30 dark:bg-black/30",
              "supports-backdrop-filter:bg-white/30 supports-backdrop-filter:dark:bg-black/30",
              "supports-backdrop-filter:backdrop-blur-[1px] supports-backdrop-filter:backdrop-saturate-125",
            )}
            aria-hidden
          />
        </>
      )}

      <div
        className={cn(
          "relative",
          isArticle && "z-10 flex min-h-0 flex-col justify-center",
        )}
      >
        {top &&
          (isArticle ? (
            <div
              className={cn(
                "mb-4",
                "[&_a]:inline-flex [&_a]:items-center [&_a]:rounded-md [&_a]:border [&_a]:border-border/80",
                "[&_a]:bg-background/92 [&_a]:px-2.5 [&_a]:py-1.5 [&_a]:text-sm [&_a]:font-semibold [&_a]:text-foreground",
                "[&_a]:shadow-sm [&_a]:backdrop-blur-sm [&_a]:transition-colors",
                "[&_a]:hover:border-border [&_a]:hover:bg-background",
              )}
            >
              {top}
            </div>
          ) : (
            <div className="mb-4">{top}</div>
          ))}

        <p
          className={cn(
            "font-ibm mb-3 text-[11px] font-bold uppercase tracking-[0.3em]",
            isArticle
              ? cn("text-foreground/85", heroTextHalo)
              : "text-muted-foreground",
          )}
        >
          {eyebrow}
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1
            className={cn(
              "font-display leading-none tracking-tight text-foreground",
              isArticle && heroTextHalo,
            )}
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {title}
          </h1>
          <div
            className={cn(
              "font-ibm text-[13px] leading-[1.7] md:max-w-xs md:text-right",
              isArticle
                ? cn("text-foreground/85", heroTextHalo)
                : "text-muted-foreground",
            )}
          >
            {aside}
          </div>
        </div>

        {footer && (
          <div className={cn("mt-6 space-y-4", isArticle && heroTextHalo)}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
