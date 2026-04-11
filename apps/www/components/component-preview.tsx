"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { CopyButton } from "./copy-button";

interface ComponentPreviewProps {
  className?: string;
  children?: React.ReactNode;
}

function getCodeFromChild(node: React.ReactNode): string {
  if (React.isValidElement(node)) {
    const props = node.props as Record<string, unknown>;
    if ("code" in props) {
      return String((props.code as string | undefined) ?? "");
    }
  }
  return "";
}

export function ComponentPreview({
  className,
  children,
}: ComponentPreviewProps) {
  const items = React.Children.toArray(children);
  const hasPreviewAndCode = items.length >= 2;
  const previewNode = items[0];
  const codeNode = items[1];
  const [expanded, setExpanded] = React.useState(false);

  const codeString = React.useMemo(
    () => getCodeFromChild(codeNode),
    [codeNode],
  );

  const codeNodeWithHideHeader = React.isValidElement(codeNode)
    ? React.cloneElement(
        codeNode as React.ReactElement<{ hideHeader?: boolean }>,
        {
          hideHeader: true,
        },
      )
    : codeNode;

  if (!hasPreviewAndCode) {
    return <div className={cn("my-6", className)}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "my-6 overflow-hidden border border-border bg-card relative",
        className,
      )}
    >
      {/* Preview area */}
      <div className="flex min-h-[220px] items-center justify-center p-8 ">
        {previewNode}
      </div>

      {/* Code section: always shows code; collapsed = 100px + gradient, expanded = scroll */}
      <div className="relative w-full h-full code-block-glass border-t border-(--code-border)">
        <div className="fixed right-1 top-1 z-20">
          <CopyButton value={codeString} className="" />
        </div>

        <div
          className={cn(
            "pt-4 transition-[max-height] duration-300 ease-out",
            expanded
              ? "max-h-[400px] overflow-auto scrollbar-hide"
              : "max-h-[100px] overflow-hidden",
          )}
        >
          {codeNodeWithHideHeader}
        </div>

        <div
          role="button"
          tabIndex={expanded ? -1 : 0}
          onClick={() => {
            if (!expanded) setExpanded(true);
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !expanded) {
              e.preventDefault();
              setExpanded(true);
            }
          }}
          className={cn(
            "absolute inset-0 cursor-pointer flex items-center justify-center bg-linear-to-t from-(--code-bg) to-transparent transition-opacity duration-300",
            expanded && "opacity-0 pointer-events-none",
          )}
          aria-expanded={expanded}
          aria-label="Expand code"
        >
          <span className="rounded-md h-[40px] flex items-center justify-center border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-primary">
            View Code
          </span>
        </div>

        {expanded && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="flex w-full items-center justify-center border-t border-border/70 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Collapse
          </button>
        )}
      </div>
    </div>
  );
}
