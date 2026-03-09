"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, SlidersHorizontal } from "lucide-react";
import { PlaygroundTools } from "./playground-tools";
import { PlaygroundPreview } from "./playground-preview";

export function PlaygroundClient() {
  const [mobileToolsOpen, setMobileToolsOpen] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Desktop: sidebar tools (left) */}
      <aside className="hidden md:flex md:flex-col md:w-80 md:shrink-0 border-r border-border overflow-y-auto scrollbar-hide">
        <PlaygroundTools />
      </aside>

      {/* Preview area */}
      <main className="flex-1 overflow-auto scrollbar-hide">
        <PlaygroundPreview />
      </main>

      {/* Mobile: bottom panel */}
      <div className="md:hidden flex flex-col border-t border-border bg-background">
        {/* Toggle button */}
        <button
          onClick={() => setMobileToolsOpen((prev) => !prev)}
          className="flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          aria-expanded={mobileToolsOpen}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span>Theme Tools</span>
          </div>
          {mobileToolsOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Collapsible tools panel */}
        {mobileToolsOpen && (
          <div className="max-h-[60vh] overflow-y-auto border-t border-border">
            <PlaygroundTools />
          </div>
        )}
      </div>
    </div>
  );
}
