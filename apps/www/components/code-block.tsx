'use client';

import * as React from "react";
import { getHighlighter, type Highlighter } from "shiki";
import { cn } from "../lib/utils";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getClientHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: ["github-dark"],
      langs: ["tsx", "ts", "js", "jsx", "bash", "json", "css", "html"],
    });
  }
  return highlighterPromise;
}

function escapeHtml(code: string) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function CodeBlock({ code, language = "tsx", className }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const highlighter = await getClientHighlighter();
        const highlighted = highlighter.codeToHtml(code.trimEnd(), {
          lang: language,
          theme: "github-dark",
        });
        if (!cancelled) {
          setHtml(highlighted);
        }
      } catch {
        if (!cancelled) {
          setHtml(
            `<pre><code>${escapeHtml(code)}</code></pre>`,
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div
      className={cn(
        "relative my-4 overflow-hidden rounded-lg border bg-[#020617] text-xs",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[0.7rem] uppercase tracking-wide text-slate-300">
        <span>{language}</span>
        <CopyButton value={code} />
      </div>
      <div
        className="overflow-auto p-4 text-[0.8rem]"
        dangerouslySetInnerHTML={{
          __html:
            html ??
            `<pre><code>${escapeHtml(code)}</code></pre>`,
        }}
      />
    </div>
  );
}

