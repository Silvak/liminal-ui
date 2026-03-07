"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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

const searchGroups = [
  {
    heading: "Getting Started",
    items: [
      {
        label: "Introduction",
        href: "/docs/introduction",
        keywords: ["intro", "welcome"],
      },
      {
        label: "Installation",
        href: "/docs/installation",
        keywords: ["install", "setup"],
      },
    ],
  },
  {
    heading: "Components",
    items: [
      {
        label: "Accordion",
        href: "/docs/components/accordion",
        keywords: ["collapse", "expand"],
      },
      {
        label: "Alert",
        href: "/docs/components/alert",
        keywords: ["banner", "message"],
      },
      {
        label: "Avatar",
        href: "/docs/components/avatar",
        keywords: ["profile", "image"],
      },
      {
        label: "Badge",
        href: "/docs/components/badge",
        keywords: ["tag", "label"],
      },
      {
        label: "Button",
        href: "/docs/components/button",
        keywords: ["click", "action"],
      },
      {
        label: "Card",
        href: "/docs/components/card",
        keywords: ["container", "panel"],
      },
      {
        label: "Checkbox",
        href: "/docs/components/checkbox",
        keywords: ["check", "toggle"],
      },
      {
        label: "Dialog",
        href: "/docs/components/dialog",
        keywords: ["modal", "popup"],
      },
      {
        label: "Input",
        href: "/docs/components/input",
        keywords: ["text", "field", "form"],
      },
      {
        label: "Label",
        href: "/docs/components/label",
        keywords: ["form", "text"],
      },
      {
        label: "Popover",
        href: "/docs/components/popover",
        keywords: ["dropdown", "floating"],
      },
      {
        label: "Select",
        href: "/docs/components/select",
        keywords: ["dropdown", "picker"],
      },
      {
        label: "Separator",
        href: "/docs/components/separator",
        keywords: ["divider", "line"],
      },
      {
        label: "Sonner",
        href: "/docs/components/sonner",
        keywords: ["toast", "notification"],
      },
      {
        label: "Switch",
        href: "/docs/components/switch",
        keywords: ["toggle", "checkbox"],
      },
      {
        label: "Tabs",
        href: "/docs/components/tabs",
        keywords: ["tab", "panel"],
      },
      {
        label: "Textarea",
        href: "/docs/components/textarea",
        keywords: ["text", "multiline"],
      },
      {
        label: "Tooltip",
        href: "/docs/components/tooltip",
        keywords: ["hint", "popup"],
      },
    ],
  },
  {
    heading: "Navigation",
    items: [{ label: "Blog", href: "/blog", keywords: ["posts", "articles"] }],
  },
] as const;

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
                    value={`${item.label} ${item.href} ${item.keywords.join(
                      " ",
                    )}`}
                    keywords={[...item.keywords]}
                    onSelect={() => runCommand(item.href)}
                  >
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
