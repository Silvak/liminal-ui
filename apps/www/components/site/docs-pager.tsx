import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "../../lib/utils";

type PagerItem = {
  title: string;
  href: string;
};

interface DocsPagerProps {
  prev?: PagerItem;
  next?: PagerItem;
}

export function DocsPager({ prev, next }: DocsPagerProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className="grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
      aria-label="Page navigation"
    >
      <PagerCard item={prev} direction="prev" />
      <PagerCard item={next} direction="next" />
    </nav>
  );
}

function PagerCard({
  item,
  direction,
}: {
  item?: PagerItem;
  direction: "prev" | "next";
}) {
  if (!item) {
    return <div className="hidden sm:block" />;
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "group rounded-none border border-border bg-card p-4 transition-all hover:border-foreground",
        direction === "next" && "text-right",
      )}
    >
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {direction === "prev" ? "Previous" : "Next"}
      </p>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-foreground",
          direction === "next" && "flex-row-reverse",
        )}
      >
        {direction === "prev" ? (
          <MoveLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        ) : (
          <MoveRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
        {item.title}
      </p>
    </Link>
  );
}
