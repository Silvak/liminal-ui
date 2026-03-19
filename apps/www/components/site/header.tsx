"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
import { useLocaleOptional } from "../../components/locale-provider";
import { useSiteCopy } from "../../components/site-copy-provider";
import { mainNavRoutes } from "../../lib/site-nav";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { SearchCommand } from "./search-command";
import Image from "next/image";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocaleOptional();
  const site = useSiteCopy();
  const [searchOpen, setSearchOpen] = useState(false);
  const docsSidebarOpen = useDocsSidebar((s) => s.open);
  const toggleDocsSidebar = useDocsSidebar((s) => s.toggle);

  const prefix = locale ? `/${locale}` : "";
  const mobileOpen = docsSidebarOpen;
  const toggleMobile = toggleDocsSidebar;

  return (
    <header className="sticky top-0 z-100 border-b border-border bg-background/70 backdrop-blur-md  px-6 md:px-8">
      <div className="flex h-14 w-full items-center justify-between pl-0 pr-2 max-w-[1440px] mx-auto border-x">
        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden w-[56px] h-[56px] rounded-none border-r border-border"
            aria-label={mobileOpen ? site.header.menuClose : site.header.menuOpen}
            onClick={toggleMobile}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>

          <Link href={prefix || "/"} className="flex items-center gap-2 pl-4">
            <span className="text-sm font-semibold tracking-tight">
              <Image
                src="/logo.png"
                alt={site.footer.logoAlt}
                width={34}
                height={34}
              />
            </span>
          </Link>

          <nav className="hidden items-center text-sm md:flex">
            {mainNavRoutes.map((item, index) => {
              const href = prefix ? `${prefix}${item.href}` : item.href;
              const active =
                pathname === href || pathname.startsWith(href + "/");
              const isFirst = index === 0;
              const isLast = index === mainNavRoutes.length - 1;
              const label = site.header.nav[item.key];
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "h-10 px-4 flex items-center justify-center rounded-none border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative",
                    isFirst && "rounded-l-md rounded-r-none",
                    !isFirst && "-ml-px",
                    isLast && "rounded-r-md rounded-l-none",
                    active && "text-foreground",
                  )}
                >
                  {label}
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
            aria-label={site.header.searchAria}
            title={site.header.searchTitle}
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
            aria-label={site.header.githubAria}
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
    </header>
  );
}
