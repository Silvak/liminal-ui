'use client';

import * as React from "react";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { cn } from "../lib/utils";

interface CodeTabsProps {
  /** Código en TypeScript (o TSX). */
  ts: string;
  /** Código en JavaScript (o JSX). */
  js: string;
  /** Lenguaje para la pestaña TS: "ts" | "tsx". Por defecto "tsx". */
  tsLang?: "ts" | "tsx";
  /** Lenguaje para la pestaña JS: "js" | "jsx". Por defecto "jsx". */
  jsLang?: "js" | "jsx";
  className?: string;
}

export function CodeTabs({
  ts,
  js,
  tsLang = "tsx",
  jsLang = "jsx",
  className,
}: CodeTabsProps) {
  // Si el código TS y JS es idéntico, renderizar CodeBlock simple sin tabs
  if (ts.trim() === js.trim()) {
    return <CodeBlock code={ts} language={tsLang} className={className} />;
  }

  const [activeValue, setActiveValue] = React.useState<string>("ts");
  const codeToCopy = activeValue === "ts" ? ts : js;

  return (
    <div
      className={cn(
        "relative my-4 overflow-hidden rounded-lg border bg-[#282c34] text-xs",
        className,
      )}
    >
      <TabsRoot value={activeValue} onValueChange={(e) => setActiveValue(e.value)}>
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <TabsList className="h-auto gap-0 rounded-md border-0 bg-transparent p-0 text-[0.7rem] text-slate-300">
            <TabsTrigger
              value="ts"
              className="rounded-sm border-0 bg-transparent px-3 py-1 uppercase tracking-wide data-[selected]:bg-white/10 data-[selected]:text-white data-[selected]:font-semibold"
            >
              TypeScript
            </TabsTrigger>
            <TabsTrigger
              value="js"
              className="rounded-sm border-0 bg-transparent px-3 py-1 uppercase tracking-wide data-[selected]:bg-white/10 data-[selected]:text-white data-[selected]:font-semibold"
            >
              JavaScript
            </TabsTrigger>
          </TabsList>
          <CopyButton value={codeToCopy} />
        </div>
        <TabsContent value="ts" className="mt-0 border-0">
          <CodeBlock code={ts} language={tsLang} hideHeader />
        </TabsContent>
        <TabsContent value="js" className="mt-0 border-0">
          <CodeBlock code={js} language={jsLang} hideHeader />
        </TabsContent>
      </TabsRoot>
    </div>
  );
}
