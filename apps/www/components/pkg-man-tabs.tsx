"use client";

import * as React from "react";
import { Terminal } from "lucide-react";
import { Tabs as ArkTabs } from "@ark-ui/react/tabs";
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
      <ArkTabs.Root
        value={activeValue}
        onValueChange={(e) => setActiveValue(e.value)}
      >
        <div className="flex items-end text-(--code-header-text) h-[44px]">
          <div className="flex items-center py-1.5 pb-3 pl-4 pr-2 shadow-[inset_0_-1px_0_var(--code-border)]">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-(--code-header-text)" />
          </div>
          <ArkTabs.List className="flex items-end gap-0 p-0">
            {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
              <ArkTabs.Trigger
                key={key}
                value={key}
                className="h-[38px] px-3 py-1.5 text-sm font-normal tracking-wide text-(--code-header-text) transition-colors shadow-[inset_0_-1px_0_var(--code-border)] hover:text-foreground/80 data-selected:rounded-t-md data-selected:text-foreground data-selected:shadow-[inset_1px_0_0_var(--code-border),inset_-1px_0_0_var(--code-border),inset_0_1px_0_var(--code-border)]"
              >
                {labels[key]}
              </ArkTabs.Trigger>
            ))}
          </ArkTabs.List>
          <div className="flex flex-1 items-center justify-end py-1.5 pl-2 pr-4 shadow-[inset_0_-1px_0_var(--code-border)]">
            <CopyButton value={codeToCopy} />
          </div>
        </div>
        {(Object.keys(commands) as Array<keyof typeof commands>).map((key) => (
          <ArkTabs.Content key={key} value={key} className="mt-0">
            <CodeBlock code={commands[key]} language="bash" hideHeader />
          </ArkTabs.Content>
        ))}
      </ArkTabs.Root>
    </div>
  );
}
