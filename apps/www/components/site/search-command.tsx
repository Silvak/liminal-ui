"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "../../lib/utils";
import { useLocaleOptional } from "../../components/locale-provider";
import { docNavSections, type NavItem } from "./docs-nav";

type SearchItem = {
  label: string;
  href: string;
  keywords: string[];
};

const extraKeywordsByHref: Record<string, readonly string[]> = {
  "/docs/introduction": ["intro", "welcome", "start"],
  "/docs/installation": ["install", "setup", "cli"],
  "/docs/theming": ["theme", "tokens", "dark mode", "styles"],
  "/docs/understanding-ark-ui": ["ark", "headless", "primitives", "ark ui"],
  "/docs/components/sonner": ["toast", "notification", "sonner"],
  "/docs/components/dropdown-menu": ["menu", "context", "dropdown"],
  "/docs/components/date-picker": ["calendar", "date"],
  "/docs/components/file-upload": ["upload", "file", "input"],
  "/docs/components/tags-input": ["tags", "chips", "multi"],
  "/docs/components/pin-input": ["otp", "code", "pin"],
  "/docs/components/number-input": ["numeric", "spinner"],
  "/docs/components/radio-group": ["radio", "choice"],
  "/docs/components/combobox": ["autocomplete", "select", "search"],
};

function navItemToSearchItem(item: NavItem): SearchItem {
  const slug = item.href.split("/").pop() ?? "";
  const fromTitle = item.title.toLowerCase().split(/\s+/).filter(Boolean);
  const extras = extraKeywordsByHref[item.href] ?? [];
  const keywords = [
    ...fromTitle,
    slug,
    item.href.replace(/^\//, "").replaceAll("/", " "),
    ...extras,
  ];
  return {
    label: item.title,
    href: item.href,
    keywords: [...new Set(keywords.map((k) => k.trim()).filter(Boolean))],
  };
}

function buildSearchGroups(): { heading: string; items: SearchItem[] }[] {
  const fromNav = docNavSections.map((section) => ({
    heading: section.title,
    items: section.items
      .filter((item) => !item.disabled)
      .map(navItemToSearchItem),
  }));

  return [
    ...fromNav,
    {
      heading: "Site",
      items: [
        {
          label: "Blog",
          href: "/blog",
          keywords: ["posts", "articles", "blog", "news"],
        },
      ],
    },
  ];
}

export interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function SearchCommand({
  open,
  onOpenChange,
  className,
}: SearchCommandProps) {
  const router = useRouter();
  const locale = useLocaleOptional();
  const prefix = locale ? `/${locale}` : "";

  const searchGroups = useMemo(() => buildSearchGroups(), []);

  const runCommand = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(prefix ? `${prefix}${href}` : href);
    },
    [router, onOpenChange, prefix],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={(details) =>
        onOpenChange(
          typeof details === "object" && details && "open" in details
            ? details.open
            : Boolean(details),
        )
      }
    >
      <DialogContent
        className={cn("overflow-hidden p-0 gap-0 max-w-xl", className)}
        showCloseButton={true}
      >
        <Command
          label="Buscar documentación"
          className="rounded-lg border-0 shadow-none"
        >
          <CommandInput placeholder="Buscar páginas y componentes..." />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            {searchGroups.map((group) => (
              <CommandGroup key={group.heading} heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${item.label} ${item.href} ${item.keywords.join(" ")}`}
                    keywords={item.keywords}
                    onSelect={() => runCommand(item.href)}
                  >
                    <FileText
                      className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
