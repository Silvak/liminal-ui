'use client';

import * as React from "react";
import { Terminal } from "lucide-react";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { cn } from "../lib/utils";

interface PkgManTabsProps {
  npm: string;
  pnpm: string;
  yarn: string;
  bun: string;
  className?: string;
}

const labels = { npm: "npm", pnpm: "pnpm", yarn: "yarn", bun: "bun" } as const;

export function PkgManTabs({
  npm,
  pnpm,
  yarn,
  bun,
  className,
}: PkgManTabsProps) {
  const [activeValue, setActiveValue] = React.useState<string>("npm");
  const commands = { npm, pnpm, yarn, bun };
  const codeToCopy = commands[activeValue as keyof typeof commands];

  return (
    <div
      className={cn(
        "code-block-glass relative my-4 overflow-hidden border border-(--code-border) text-xs",
        className,
      )}
    >
      <TabsRoot value={activeValue} onValueChange={(e) => setActiveValue(e.value)}>
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2 text-(--code-header-text)">
          <Terminal className="h-3.5 w-3.5 shrink-0 text-(--code-header-text)" />
          <TabsList className="h-auto gap-0 rounded-md border-0 bg-transparent p-0 text-[0.7rem] text-(--code-header-text)">
            {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="relative rounded-sm border-0 bg-transparent px-3 py-1.5 text-sm font-medium tracking-wide text-(--code-header-text) transition-colors hover:bg-white/5 hover:text-foreground/80 data-selected:bg-transparent data-selected:font-semibold data-selected:text-foreground data-selected:after:absolute data-selected:after:bottom-0 data-selected:after:left-0 data-selected:after:right-0 data-selected:after:h-0.5 data-selected:after:bg-primary data-selected:after:rounded-full"
              >
                {labels[key]}
              </TabsTrigger>
            ))}
          </TabsList>
          <CopyButton value={codeToCopy} />
        </div>
        {(Object.keys(commands) as Array<keyof typeof commands>).map((key) => (
          <TabsContent key={key} value={key} className="mt-0 border-0">
            <CodeBlock code={commands[key]} language="bash" hideHeader />
          </TabsContent>
        ))}
      </TabsRoot>
    </div>
  );
}
