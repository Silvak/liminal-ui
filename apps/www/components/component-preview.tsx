"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { CopyButton } from "./copy-button";

interface ComponentPreviewProps {
  className?: string;
  children?: React.ReactNode;
}

function getCodeFromChild(node: React.ReactNode): string {
  if (React.isValidElement(node) && node.props && "code" in node.props) {
    return String((node.props as { code?: string }).code ?? "");
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
    ? React.cloneElement(codeNode as React.ReactElement<{ hideHeader?: boolean }>, {
        hideHeader: true,
      })
    : codeNode;

  if (!hasPreviewAndCode) {
    return <div className={cn("my-6", className)}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      {/* Preview area */}
      <div className="flex min-h-[200px] items-center justify-center p-8 bg-background">
        {previewNode}
      </div>

      {/* Code section: always visible, collapsed or expanded */}
      <div className="relative bg-[#282c34]">
        {expanded && (
          <div className="absolute right-3 top-2 z-10">
            <CopyButton value={codeString} />
          </div>
        )}
        <div
          className={cn(
            "overflow-hidden",
            expanded ? "max-h-[400px] overflow-auto" : "max-h-[150px]",
          )}
        >
          {codeNodeWithHideHeader}
        </div>
        {!expanded && (
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4"
            style={{
              background:
                "linear-gradient(to top, #282c34, color-mix(in oklab, #282c34 60%, transparent), transparent)",
            }}
          >
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="pointer-events-auto rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={false}
            >
              View Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
