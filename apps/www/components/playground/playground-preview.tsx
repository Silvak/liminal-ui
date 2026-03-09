"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { usePlaygroundStore } from "../../store/playground";
import { DashboardDemo } from "./dashboard-demo";
import { CardsDemo } from "./cards-demo";

export function PlaygroundPreview() {
  const { activeLayout, themeVars, radius, spacing, letterSpacing, shadow, mode } =
    usePlaygroundStore();

  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {};

    // Theme color vars
    for (const [key, value] of Object.entries(themeVars) as [string, string][]) {
      vars[`--${key}`] = value;
    }

    // Radius
    vars["--radius"] = `${radius}rem`;

    // Spacing
    vars["--spacing"] = `${spacing}rem`;

    // Letter spacing
    vars["--tracking-normal"] = `${letterSpacing}em`;

    // Shadow
    const { color, x, y, blur, spread, opacity } = shadow;
    vars["--shadow-color"] = color;
    vars["--shadow-x"] = String(x);
    vars["--shadow-y"] = `${y}px`;
    vars["--shadow-blur"] = `${blur}px`;
    vars["--shadow-spread"] = `${spread}px`;
    vars["--shadow-opacity"] = String(opacity);

    // Compute shadow values from config
    const shadowValue = `${x}px ${y}px ${blur}px ${spread}px ${color.replace("oklch(", "oklch(").replace(")", ` / ${opacity})`)}`;
    vars["--shadow-sm"] = shadowValue;
    vars["--shadow"] = shadowValue;
    vars["--shadow-md"] = shadowValue;
    vars["--shadow-lg"] = shadowValue;

    return vars;
  }, [themeVars, radius, spacing, letterSpacing, shadow]);

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
