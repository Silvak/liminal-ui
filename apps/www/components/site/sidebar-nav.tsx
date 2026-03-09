"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
import { useLocaleOptional } from "../../components/locale-provider";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { mainNav } from "./header";
import { docNavSections, type NavSection } from "./docs-nav";

const badgeVariantMap = {
  new: "default",
  beta: "secondary",
  updated: "outline",
} as const;

function CollapsibleSection({
  section,
  pathname,
  onNavigate,
  isOpen,
  onToggle,
  prefix,
}: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
  isOpen: boolean;
  onToggle: () => void;
  prefix: string;
}) {
  return (
    <div key={section.title} className="mb-5">
      <button
        type="button"
        onClick={onToggle}
        className="mb-1 flex w-auto items-center gap-1 px-6 pb-[2px] text-left text-sm md:text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform ",
            isOpen && "rotate-90",
          )}
          aria-hidden
        />
        {section.title}
      </button>

      <div
        className={cn(
          "grid overflow-hidden transition-[max-height] duration-200 ease-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-60",
        )}
      >
        <div className="flex flex-col text-base md:text-sm">
          {section.items.map((item) => {
            const href = prefix ? `${prefix}${item.href}` : item.href;
            const active = pathname === href || pathname.startsWith(href + "/");
            const content = (
              <>
                <span className="truncate">{item.title}</span>
                {item.badge && (
                  <Badge
                    variant={
                      badgeVariantMap[item.badge] as
                        | "default"
                        | "secondary"
                        | "outline"
                    }
                    className="ml-auto shrink-0 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            );
            if (item.disabled) {
              return (
                <span
                  key={item.href}
                  className=" flex h-8 w-full cursor-not-allowed items-center rounded-md border border-transparent px-2 text-muted-foreground/60"
                >
                  {content}
                </span>
              );
            }
            return (
              <Link
                key={item.href}
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative group filter-pixel-noise flex h-[42px] w-full items-center rounded-md px-8 text-muted-foreground transition-colors hover:bg-primary/10 dark:hover:bg-muted  hover:text-foreground",
                  active &&
                    "bg-linear-to-r from-primary/70 from-15% to-white/00  to-90% text-primary-foreground hover:text-white dark:hover:text-foreground ",
                )}
              >
                {active && (
                  <div className="w-[8px] h-[26px] absolute left-2 bg-muted rounded-[2px] " />
                )}
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/*
 *  This function is used to render the navigation content for the sidebar.
 * */
function NavContent({
  onNavigate,
  hasPadding = true,
  showSiteNav = false,
  mobileMode = false,
}: {
  onNavigate?: () => void;
  hasPadding?: boolean;
  showSiteNav?: boolean;
  mobileMode?: boolean;
}) {
  const pathname = usePathname();
  const locale = useLocaleOptional();
  const prefix = locale ? `/${locale}` : "";
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(docNavSections.map((s) => [s.title, true])),
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="relative h-full">
      <div
        className={cn(
          "h-full w-full overflow-y-auto py-16 [mask:linear-gradient(to_bottom,transparent,black_96px,black_calc(100%-96px),transparent)] [&::-webkit-scrollbar]:hidden",
          hasPadding && "",
        )}
      >
        {showSiteNav && (
          <>
            {mobileMode && (
              <div className="mb-3 px-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Menu
              </div>
            )}
            <div className="mb-6">
              {mainNav.map((item) => {
                const href = prefix ? `${prefix}${item.href}` : item.href;
                const active =
                  !mobileMode &&
                  (pathname === href || pathname.startsWith(href + "/"));
                return (
                  <Link
                    key={item.href}
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative group filter-pixel-noise flex h-[42px] mb-[2px] w-full items-center rounded-md px-8 text-base md:text-sm text-muted-foreground transition-colors hover:bg-primary/10 dark:hover:bg-muted hover:text-foreground",
                      active &&
                        "bg-linear-to-r from-primary/70 from-15% to-white/00 to-90% text-primary-foreground hover:text-white dark:hover:text-foreground",
                    )}
                  >
                    {active && (
                      <div className="w-[8px] h-[26px] absolute left-2 bg-muted rounded-[2px]" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <Separator className="mb-6" />
          </>
        )}

        {docNavSections.map((section) => (
          <CollapsibleSection
            key={section.title}
            section={section}
            pathname={pathname}
            onNavigate={onNavigate}
            isOpen={openSections[section.title] ?? true}
            onToggle={() => toggleSection(section.title)}
            prefix={prefix}
          />
        ))}
      </div>
    </div>
  );
}

export function SidebarNav({ mobileOnly = false }: { mobileOnly?: boolean }) {
  const { open, closeMenu } = useDocsSidebar();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop */}
      {!mobileOnly && (
        <aside
          className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-[288px] shrink-0 overflow-hidden border-r border-border bg-background md:block"
          aria-label="Documentation"
        >
          <NavContent />
        </aside>
      )}

      {/* Mobile: overlay when open */}
      {/*
      <div
        role="presentation"
        aria-hidden={!open}
        onClick={closeMenu}
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className={cn(
          "fixed top-14 inset-x-0 bottom-0 z-55 bg-black/50 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      */}

      {/* Mobile */}
      <aside
        aria-label="Navigation menu"
        aria-modal="true"
        role="dialog"
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className={cn(
          "docs-drawer-panel fixed top-[56px] bottom-0 left-0 z-60 flex w-full border-t border-border flex-col bg-background/80 backdrop-blur transition-all duration-200 ease-out md:hidden",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none",
        )}
      >
        <div className="flex-1 overflow-hidden">
          <NavContent
            onNavigate={closeMenu}
            hasPadding={true}
            showSiteNav={true}
            mobileMode={true}
          />
        </div>
      </aside>
    </>
  );
}
