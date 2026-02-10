'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

type NavSection = {
  title: string;
  items: { title: string; href: string }[];
};

const sections: NavSection[] = [
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

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r bg-background md:sticky md:block">
      <div className="py-6 pr-6 lg:py-8">
        {sections.map((section) => (
          <div key={section.title} className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.title}
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex w-full items-center rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      active &&
                        "bg-accent text-foreground font-medium",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

