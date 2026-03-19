"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteDictionary } from "@/lib/site-dictionary";
import { siteEn } from "@/dictionaries/en/site";

const SiteCopyContext = createContext<SiteDictionary | null>(null);

export function SiteCopyProvider({
  value,
  children,
}: {
  value: SiteDictionary;
  children: ReactNode;
}) {
  return (
    <SiteCopyContext.Provider value={value}>{children}</SiteCopyContext.Provider>
  );
}

export function useSiteCopy(): SiteDictionary {
  const ctx = useContext(SiteCopyContext);
  return ctx ?? siteEn;
}
