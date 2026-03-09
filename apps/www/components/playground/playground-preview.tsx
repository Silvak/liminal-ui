"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { usePlaygroundStore } from "../../store/playground";
import { DashboardDemo } from "./dashboard-demo";
import { CardsDemo } from "./cards-demo";

// Fonts that are local/system and don't need Google Fonts loading
const LOCAL_FONTS = new Set(["Geist Sans", "Geist Mono", "Georgia"]);

// Google Fonts URL builder — uses the variable fonts API for best performance
function buildGoogleFontsUrl(fonts: string[]): string {
  const families = fonts
    .filter((f) => !LOCAL_FONTS.has(f))
    .map((f) => `family=${encodeURIComponent(f)}:wght@300;400;500;600;700`)
    .join("&");
  return families
    ? `https://fonts.googleapis.com/css2?${families}&display=swap`
    : "";
}

function useGoogleFonts(fonts: string[]) {
  React.useEffect(() => {
    const toLoad = fonts.filter((f) => !LOCAL_FONTS.has(f));
    if (toLoad.length === 0) return;

    const url = buildGoogleFontsUrl(toLoad);
    const id = "playground-google-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = url;
  }, [fonts.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function PlaygroundPreview() {
  const {
    activeLayout,
    themeVars,
    radius,
    spacing,
    letterSpacing,
    shadow,
    fontSans,
    fontSerif,
    fontMono,
    mode,
  } = usePlaygroundStore();

  // Load non-local fonts from Google Fonts
  useGoogleFonts([fontSans, fontSerif, fontMono]);

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

    // Font family — always inject so the wrapper can set font-family explicitly
    // and all children inherit it (body uses var(--font-geist-sans) directly, not var(--font-sans))
    vars["--font-sans"] =
      fontSans === "Geist Sans"
        ? "var(--font-geist-sans), ui-sans-serif, sans-serif"
        : `"${fontSans}", ui-sans-serif, sans-serif`;

    vars["--font-serif"] =
      fontSerif === "Georgia"
        ? "ui-serif, Georgia, Cambria, serif"
        : `"${fontSerif}", ui-serif, Georgia, serif`;

    vars["--font-mono"] =
      fontMono === "Geist Mono"
        ? "var(--font-geist-mono), ui-monospace, monospace"
        : `"${fontMono}", ui-monospace, monospace`;

    // Apply font-family directly so children inherit it regardless of body styles
    vars["fontFamily"] = vars["--font-sans"];

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
  }, [themeVars, radius, spacing, letterSpacing, fontSans, fontSerif, fontMono, shadow]);

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
