"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDocsSidebar } from "../../store/docs-sidebar";
import { Badge } from "../ui/badge";

export type NavItem = {
  title: string;
  href: string;
  badge?: "new" | "beta" | "updated";
  disabled?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const docNavSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Components / Forms",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Label", href: "/docs/components/label" },
    ],
  },
  {
    title: "Components / Display",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Avatar", href: "/docs/components/avatar" },
    ],
  },
  {
    title: "Components / Overlay",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Toast", href: "/docs/components/sonner" },
    ],
  },
  {
    title: "Components / Navigation",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ],
  },
];

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
        className="mb-1 flex w-auto items-center gap-1 px-1 pb-[2px] text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
        <div className="flex flex-col text-sm">
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
                  "group relative flex h-[36px] mb-[2px] w-full items-center rounded-md px-2 text-muted-foreground transition-colors hover:bg-muted",
                  active && "bg-muted",
                )}
              >
                {active && (
                  <span
                    className="absolute -left-3 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-foreground"
                    aria-hidden
                  />
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

function NavContent({
  onNavigate,
  hasPadding = true,
}: {
  onNavigate?: () => void;
  hasPadding?: boolean;
}) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(docNavSections.map((s) => [s.title, true])),
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="relative h-full bg-background">
      <div
        className={cn(
          "h-full w-full overflow-y-auto py-12 [mask:linear-gradient(to_bottom,transparent,black_48px,black_calc(100%-48px),transparent)] [&::-webkit-scrollbar]:hidden",
          hasPadding && "px-6",
        )}
      >
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

export function SidebarNav() {
  const { open, closeMenu } = useDocsSidebar();

  return (
    <>
      {/* Desktop: fixed sidebar, hidden on mobile */}
      <aside
        className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-[288px] shrink-0 overflow-hidden border-r bg-background md:block"
        aria-label="Documentación"
      >
        <NavContent />
      </aside>

      {/* Mobile: overlay when open */}
      <div
        role="presentation"
        aria-hidden={!open}
        onClick={closeMenu}
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className={cn(
          "fixed inset-0 z-55 bg-black/50 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile: drawer panel */}
      <aside
        aria-label="Menú de documentación"
        aria-modal="true"
        role="dialog"
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className={cn(
          "docs-drawer-panel fixed inset-y-0 left-0 z-60 flex w-[288px] flex-col border-r bg-background shadow-xl transition-transform duration-200 ease-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4">
          <span className="text-sm font-semibold tracking-tight">
            Documentación
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Cerrar menú"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-hidden">
          <NavContent onNavigate={closeMenu} hasPadding={true} />
        </div>
      </aside>
    </>
  );
}
