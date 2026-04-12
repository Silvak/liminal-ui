"use client";

import { DocActions } from "@/components/site/doc-actions";
import type { DesignSystemDictionary } from "@/lib/design-system-dictionary";

type Props = {
  copy: DesignSystemDictionary["hero"];
  rawContent: string;
};

export function DsHeader({ copy, rawContent }: Props) {
  const title = copy.overline;
  const introTitle = `${copy.title1} ${copy.title2}`.trim();

  return (
    <header
      id="overview"
      className="space-y-4 border-b border-border pb-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="font-ibm text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/80">
            {copy.portalLabel}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
        </div>
        <DocActions title={title} slug="docs/design-system" rawContent={rawContent} />
      </div>
      <p className="text-base text-muted-foreground">
        <span className="text-foreground">{introTitle}.</span>{" "}
        {copy.subtitle}
      </p>
    </header>
  );
}
