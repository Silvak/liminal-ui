"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
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
}: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div key={section.title} className="mb-5">
      <button
        type="button"
        onClick={onToggle}
        className="mb-1 flex w-auto items-center gap-1 px-1 pb-[2px] text-left text-sm md:text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
            const active = pathname === item.href;
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
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex h-[36px] mb-[2px] w-full items-center rounded-md px-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  active && "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NavContent({
  onNavigate,
  hasPadding = true,
  showSiteNav = false,
}: {
  onNavigate?: () => void;
  hasPadding?: boolean;
  showSiteNav?: boolean;
}) {
  const pathname = usePathname();
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
          "h-full w-full overflow-y-auto py-12 [mask:linear-gradient(to_bottom,transparent,black_48px,black_calc(100%-48px),transparent)] [&::-webkit-scrollbar]:hidden",
          hasPadding && "px-6",
        )}
      >
        {showSiteNav && (
          <>
            <div className="mb-6">
              {mainNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex h-[36px] mb-[2px] w-full items-center rounded-md px-2 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      active && "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
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
          />
        ))}
      </div>
    </div>
  );
}

export function SidebarNav({ mobileOnly = false }: { mobileOnly?: boolean }) {
  const { open, closeMenu } = useDocsSidebar();

  return (
    <>
      {/* Desktop: fixed sidebar, hidden on mobile */}
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

      {/* Mobile: drawer panel */}
      <aside
        aria-label="Navigation menu"
        aria-modal="true"
        role="dialog"
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className={cn(
          "docs-drawer-panel fixed top-[56px] bottom-0 left-0 z-60 flex w-full border-t flex-col bg-background/80 backdrop-blur transition-all duration-200 ease-out md:hidden",
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none",
        )}
      >
        {/* Drawer body */}
        <div className="flex-1 overflow-hidden">
          <NavContent
            onNavigate={closeMenu}
            hasPadding={true}
            showSiteNav={true}
          />
        </div>
      </aside>
    </>
  );
}
