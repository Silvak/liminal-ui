'use client';

import * as React from "react";
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
        "relative my-4 overflow-hidden rounded-lg border bg-[#282c34] text-xs",
        className,
      )}
    >
      <TabsRoot value={activeValue} onValueChange={(e) => setActiveValue(e.value)}>
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <TabsList className="h-auto gap-0 rounded-md border-0 bg-transparent p-0 text-[0.7rem] text-slate-300">
            {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="relative rounded-sm border-0 bg-transparent px-3 py-1.5 text-sm font-medium tracking-wide text-slate-400 transition-colors data-[selected]:bg-transparent data-[selected]:font-semibold data-[selected]:text-white data-[selected]:after:absolute data-[selected]:after:bottom-0 data-[selected]:after:left-0 data-[selected]:after:right-0 data-[selected]:after:h-0.5 data-[selected]:after:bg-orange-500"
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
