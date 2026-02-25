'use client';

import * as React from "react";
import { getHighlighter, type Highlighter } from "shiki";
import { cn } from "../lib/utils";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  /** Hides the top bar (language + copy). Useful when used inside CodeTabs. */
  hideHeader?: boolean;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getClientHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: ["one-dark-pro"],
      langs: [
        "tsx",
        "ts",
        "js",
        "jsx",
        "bash",
        "json",
        "css",
        "html",
        "mdx",
        "markdown",
      ],
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

function enhanceShikiHtml(
  html: string,
  highlightLines: number[],
  showLineNumbers: boolean,
) {
  const highlighted = new Set(highlightLines);
  let lineNumber = 0;

  const withLineMetadata = html.replace(/<span class="line">/g, () => {
    lineNumber += 1;
    const classes = ["line"];
    if (highlighted.has(lineNumber)) {
      classes.push("line--highlighted");
    }

    const attrs = [
      `class="${classes.join(" ")}"`,
      `data-line="${lineNumber}"`,
      showLineNumbers ? `data-line-number="${lineNumber}"` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `<span ${attrs}>`;
  });

  if (showLineNumbers) {
    return withLineMetadata.replace(
      /<pre class="shiki/g,
      '<pre class="shiki shiki--line-numbers',
    );
  }

  return withLineMetadata;
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
  filename,
  highlightLines = [],
  showLineNumbers = false,
  hideHeader = false,
}: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const highlighter = await getClientHighlighter();
        const highlighted = highlighter.codeToHtml(code.trimEnd(), {
          lang: language,
          theme: "one-dark-pro",
        });
        if (!cancelled) {
          setHtml(enhanceShikiHtml(highlighted, highlightLines, showLineNumbers));
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
  }, [code, language, highlightLines, showLineNumbers]);

  const content = (
    <div
      className="overflow-auto p-4 text-[0.82rem]"
      dangerouslySetInnerHTML={{
        __html:
          html ??
          `<pre><code>${escapeHtml(code)}</code></pre>`,
      }}
    />
  );

  if (hideHeader) {
    return <>{content}</>;
  }

  return (
    <div
      className={cn(
        "relative my-4 overflow-hidden rounded-xl border border-white/10 bg-[#282c34] text-xs shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[0.7rem] uppercase tracking-wide text-slate-300">
        <div className="flex min-w-0 items-center gap-3">
          {filename ? (
            <span className="truncate font-medium normal-case tracking-normal text-white/90">
              {filename}
            </span>
          ) : null}
          <span>{language}</span>
        </div>
        <CopyButton value={code} />
      </div>
      {content}
    </div>
  );
}

