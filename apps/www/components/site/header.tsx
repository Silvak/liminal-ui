"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
import { ThemeToggle } from "./theme-toggle";

const mainNav = [
  { label: "Docs", href: "/docs/introduction" },
  { label: "Components", href: "/docs/components/button" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");
  const toggleDocsSidebar = useDocsSidebar((s) => s.toggle);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur px-4">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              Liminal UI
            </span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors text-muted-foreground hover:text-foreground",
                    active && "text-foreground font-medium",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isDocs && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menú de documentación"
              onClick={toggleDocsSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Open GitHub repository"
          >
            <Link
              href="https://github.com/silvak/liminal-ui"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
