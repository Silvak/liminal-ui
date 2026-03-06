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
            expanded
              ? "max-h-[400px] overflow-auto scrollbar-hide pt-4"
              : "max-h-[100px] overflow-hidden pt-4",
          )}
        >
          {codeNodeWithHideHeader}
        </div>

        {!expanded && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setExpanded(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded(true);
              }
            }}
            className="absolute inset-0 cursor-pointer flex items-center justify-center bg-linear-to-t from-(--code-bg) to-transparent"
            aria-expanded={false}
            aria-label="Expand code"
          >
            <span className="rounded-md h-[40px] flex items-center justify-center border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-primary">
              View Code
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
