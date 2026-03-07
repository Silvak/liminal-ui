"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
import { useLocaleOptional } from "../../components/locale-provider";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { SearchCommand } from "./search-command";

export const mainNav = [
  { label: "Docs", href: "/docs/introduction" },
  { label: "Components", href: "/docs/components/button" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocaleOptional();
  const isLanding =
    pathname === "/" || (locale && new RegExp(`^/${locale}/?$`).test(pathname));
  const [landingMenuOpen, setLandingMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const docsSidebarOpen = useDocsSidebar((s) => s.open);
  const toggleDocsSidebar = useDocsSidebar((s) => s.toggle);

  const prefix = locale ? `/${locale}` : "";
  const mobileOpen = isLanding ? landingMenuOpen : docsSidebarOpen;
  const toggleMobile = isLanding
    ? () => setLandingMenuOpen((v) => !v)
    : toggleDocsSidebar;

  return (
    <header className="sticky top-0 z-100 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between pl-0 pr-4 md:px-4">
        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden w-[56px] h-[56px] rounded-none border-r border-border"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={toggleMobile}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>

          <Link href={prefix || "/"} className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">
              Liminal UI
            </span>
          </Link>

          <nav className="hidden items-center gap-4 text-sm md:flex">
            {mainNav.map((item) => {
              const href = prefix ? `${prefix}${item.href}` : item.href;
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={item.href}
                  href={href}
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

        <div className="flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Buscar"
            title="Buscar (Ctrl+K)"
            className={cn(
              "h-10 w-10 rounded-none rounded-l-md border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative",
            )}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
          <LanguageToggle
            currentLocale={locale ?? undefined}
            className={cn(
              "-ml-px h-10 w-10 rounded-none border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative",
            )}
          />
          <ThemeToggle
            className={cn(
              "-ml-px h-10 w-10 rounded-none border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative",
            )}
          />
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="Open GitHub repository"
            className={cn(
              "-ml-px h-10 w-10 rounded-none rounded-r-md border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative",
            )}
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

      {isLanding && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 z-50 border-b border-border bg-background transition-all duration-200 md:hidden overflow-hidden",
            landingMenuOpen
              ? "max-h-[300px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none border-b-0",
          )}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {mainNav.map((item) => {
              const href = prefix ? `${prefix}${item.href}` : item.href;
              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={() => setLandingMenuOpen(false)}
                  className="flex h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="https://github.com/silvak/liminal-ui"
              target="_blank"
              rel="noreferrer"
              onClick={() => setLandingMenuOpen(false)}
              className="flex h-10 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
