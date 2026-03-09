"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { usePlaygroundStore } from "../../store/playground";
import { DashboardDemo } from "./dashboard-demo";
import { CardsDemo } from "./cards-demo";

export function PlaygroundPreview() {
  const { activeLayout, themeVars, radius, mode } = usePlaygroundStore();

  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {};
    for (const [key, value] of Object.entries(themeVars) as [string, string][]) {
      vars[`--${key}`] = value;
    }
    vars["--radius"] = `${radius}rem`;
    return vars;
  }, [themeVars, radius]);

  return (
    <div
      className={cn(mode === "dark" ? "dark" : "", "h-full")}
      style={cssVars as React.CSSProperties}
    >
      <div className="bg-background text-foreground h-full">
        {activeLayout === "dashboard" ? <DashboardDemo /> : <CardsDemo />}
      </div>
    </div>
  );
}
