"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return locale;
}

export function useLocaleOptional(): Locale | null {
  return useContext(LocaleContext);
}
