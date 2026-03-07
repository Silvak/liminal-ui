"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

const LOCALE_KEY = "liminal-ui-locale";
export const LOCALE_COOKIE = "liminal-ui-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const LANGUAGES = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
] as const;

type Locale = (typeof LANGUAGES)[number]["value"];

function getLocaleFromNavigator(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("en")) return "en";
  return "en";
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LOCALE_KEY);
  if (stored === "es" || stored === "en") return stored;
  return getLocaleFromNavigator();
}

function setLocaleCookie(value: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

interface LanguageToggleProps {
  className?: string;
  currentLocale?: Locale;
}

export function LanguageToggle({ className, currentLocale }: LanguageToggleProps) {
  const [locale, setLocale] = useState<Locale>(currentLocale ?? "en");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setLocale(currentLocale ?? getInitialLocale());
  }, [currentLocale]);

  const handleSelect = (value: Locale) => {
    setLocale(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_KEY, value);
      setLocaleCookie(value);
    }
    setOpen(false);

    const newPath =
      pathname === "/" || !/^\/(en|es)(\/|$)/.test(pathname)
        ? `/${value}`
        : pathname.replace(/^\/(en|es)/, `/${value}`);
    if (newPath !== pathname) {
      router.push(newPath);
    }
  };

  const buttonClassName = cn(className);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Cambiar idioma"
        disabled
        className={buttonClassName}
      >
        <span className="text-base font-semibold" aria-hidden>
          あ
        </span>
      </Button>
    );
  }

  return (
    <PopoverRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{ placement: "bottom-end" }}
    >
      <PopoverTrigger
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-none border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-background hover:text-foreground hover:z-10 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonClassName,
        )}
        aria-label="Cambiar idioma"
      >
        <span className="text-base font-semibold" aria-hidden>
          あ
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[180px] w-auto p-0 rounded-md border border-border bg-popover text-popover-foreground shadow-md"
        role="menu"
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.value}
            type="button"
            role="menuitem"
            onClick={() => handleSelect(lang.value)}
            className={cn(
              "flex w-full items-center justify-between gap-2 px-3 py-2 text-sm outline-none transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              locale === lang.value && "bg-accent/50 font-medium",
            )}
          >
            {lang.label}
            {locale === lang.value && (
              <Check className="h-4 w-4 shrink-0 text-primary" />
            )}
          </button>
        ))}
      </PopoverContent>
    </PopoverRoot>
  );
}
