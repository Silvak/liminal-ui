'use client';

import * as React from "react";
import { Terminal } from "lucide-react";
import { getHighlighter, type Highlighter } from "shiki";
import { cn } from "../lib/utils";
import { CopyButton } from "./copy-button";

/** Colores del tema del sitio (modo claro) para bloques de código */
const LIMINAL_LIGHT_THEME = {
  name: "liminal-light",
  type: "light" as const,
  colors: {
    "editor.background": "#ffffff",
    "editor.foreground": "#24292e",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment", "string.comment"], settings: { foreground: "#6b7280" } },
    { scope: ["constant", "entity.name.constant", "variable.other.constant", "variable.other.enummember", "variable.language"], settings: { foreground: "#6366f1" } },
    { scope: ["entity", "entity.name"], settings: { foreground: "#7c3aed" } },
    { scope: ["variable.parameter.function"], settings: { foreground: "#24292e" } },
    { scope: ["entity.name.tag"], settings: { foreground: "#16a34a" } },
    { scope: ["keyword"], settings: { foreground: "#6366f1" } },
    { scope: ["storage", "storage.type"], settings: { foreground: "#6366f1" } },
    { scope: ["storage.modifier.package", "storage.modifier.import", "storage.type.java"], settings: { foreground: "#24292e" } },
    { scope: ["string", "punctuation.definition.string", "string punctuation.section.embedded source"], settings: { foreground: "#16a34a" } },
    { scope: ["support"], settings: { foreground: "#6366f1" } },
    { scope: ["meta.property-name"], settings: { foreground: "#6366f1" } },
    { scope: ["variable"], settings: { foreground: "#ea580c" } },
    { scope: ["variable.other"], settings: { foreground: "#24292e" } },
    { scope: ["invalid.broken", "invalid.deprecated", "invalid.illegal", "invalid.unimplemented", "message.error"], settings: { foreground: "#dc2626" } },
    { scope: ["string variable"], settings: { foreground: "#6366f1" } },
    { scope: ["support.constant", "support.variable", "meta.module-reference"], settings: { foreground: "#6366f1" } },
    { scope: ["markup.heading", "markup.heading entity.name"], settings: { foreground: "#6366f1" } },
    { scope: ["markup.inline.raw"], settings: { foreground: "#6366f1" } },
    { scope: ["constant.other.reference.link", "string.other.link"], settings: { foreground: "#16a34a" } },
  ],
};

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
      themes: ["one-dark-pro", LIMINAL_LIGHT_THEME],
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

  const lineCount = code.split("\n").length;
  const effectiveShowLineNumbers = showLineNumbers || lineCount > 2;

  const estimatedHeight = React.useMemo(() => {
    return lineCount * 26 + 20;
  }, [lineCount]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const highlighter = await getClientHighlighter();
        const highlighted = highlighter.codeToHtml(code.trimEnd(), {
          lang: language,
          themes: { light: "liminal-light", dark: "one-dark-pro" },
          defaultColor: false,
        });
        if (!cancelled) {
          setHtml(enhanceShikiHtml(highlighted, highlightLines, effectiveShowLineNumbers));
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
  }, [code, language, highlightLines, effectiveShowLineNumbers]);

  const content = (
    <div
      className="overflow-auto px-4 py-2.5 text-[0.82rem]"
      style={{ minHeight: estimatedHeight }}
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
        "code-block-glass relative my-4 overflow-hidden border border-(--code-border) text-xs",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-[0.7rem] uppercase tracking-wide text-(--code-header-text)">
        <div className="flex min-w-0 items-center gap-2">
          {language === "bash" && (
            <Terminal className="h-3.5 w-3.5 shrink-0 text-(--code-header-text)" />
          )}
          {filename ? (
            <span className="truncate font-medium normal-case tracking-normal text-foreground/90">
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

