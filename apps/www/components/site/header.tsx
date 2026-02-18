"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
import { ThemeToggle } from "./theme-toggle";

export const mainNav = [
  { label: "Docs", href: "/docs/introduction" },
  { label: "Components", href: "/docs/components/button" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const open = useDocsSidebar((s) => s.open);
  const toggleDocsSidebar = useDocsSidebar((s) => s.toggle);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background md:bg-background/80 backdrop-blur">
      <div className="flex h-14 w-full items-center justify-between pl-0 pr-4 md:px-4 ">
        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden w-[56px] h-[56px] rounded-none border-r"
            aria-label={
              open ? "Cerrar menú de navegación" : "Abrir menú de navegación"
            }
            onClick={toggleDocsSidebar}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>

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
