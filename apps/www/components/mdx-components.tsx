import * as React from "react";
import { Link2 } from "lucide-react";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";
import { PkgManTabs } from "./pkg-man-tabs";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";
import { ComponentPreview } from "./component-preview";
import { slugifyHeading } from "../lib/docs";
import { Callout } from "./docs/callout";
import { Step, Steps } from "./docs/steps";
import { ApiTable } from "./docs/api-table";
import { MdxImage } from "./docs/mdx-image";

type MDXComponent = React.ComponentType<any>;

type MDXComponents = {
  [key: string]: MDXComponent;
};

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => getTextContent(child)).join(" ");
  }

  if (React.isValidElement(children)) {
    return getTextContent((children.props as { children?: React.ReactNode }).children);
  }

  return "";
}

function parseHighlightLines(raw: string | undefined): number[] {
  if (!raw) {
    return [];
  }

  const match = raw.match(/\{([^}]+)\}/);
  if (!match) {
    return [];
  }

  const values = new Set<number>();
  for (const part of match[1].split(",")) {
    const trimmed = part.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.includes("-")) {
      const [startRaw, endRaw] = trimmed.split("-");
      const start = Number(startRaw);
      const end = Number(endRaw);
      if (Number.isFinite(start) && Number.isFinite(end) && start <= end) {
        for (let line = start; line <= end; line += 1) {
          values.add(line);
        }
      }
      continue;
    }

    const line = Number(trimmed);
    if (Number.isFinite(line)) {
      values.add(line);
    }
  }

  return Array.from(values).sort((a, b) => a - b);
}

function parseCodeMeta(meta: string | undefined) {
  const filenameMatch = meta?.match(/(?:title|filename)="([^"]+)"/);
  const showLineNumbers =
    meta?.includes("showLineNumbers") || meta?.includes("lineNumbers");

  return {
    filename: filenameMatch?.[1],
    highlightLines: parseHighlightLines(meta),
    showLineNumbers,
  };
}

function extractCodeInfo(children: React.ReactNode) {
  const child = children as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >;

  const code = child?.props?.children ?? "";
  const rawClassName = child?.props?.className ?? "";
  const metastring =
    (child?.props as { metastring?: string })?.metastring ??
    (child?.props as { "data-meta"?: string })?.["data-meta"] ??
    "";

  const match = /language-([a-z0-9]+)/i.exec(rawClassName);
  const language = match?.[1] ?? "tsx";
  const meta = parseCodeMeta(metastring);

  return {
    code: String(code),
    language,
    filename: meta.filename,
    highlightLines: meta.highlightLines,
    showLineNumbers: meta.showLineNumbers,
  };
}

function getAlignClass(align?: string) {
  if (align === "center") {
    return "text-center";
  }
  if (align === "right") {
    return "text-right";
  }
  return "text-left";
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    (() => {
      const text = getTextContent(props.children);
      const id = props.id ?? slugifyHeading(text);
      return (
        <h2
          id={id}
          className={cn(
            "group scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0",
            className,
          )}
          {...props}
        >
          <a href={`#${id}`} className="inline-flex items-center gap-2">
            <span>{props.children}</span>
            <Link2 className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" />
          </a>
        </h2>
      );
    })()
  ),
  h3: ({ className, ...props }) => (
    (() => {
      const text = getTextContent(props.children);
      const id = props.id ?? slugifyHeading(text);
      return (
        <h3
          id={id}
          className={cn(
            "group scroll-m-20 text-xl font-semibold tracking-tight",
            className,
          )}
          {...props}
        >
          <a href={`#${id}`} className="inline-flex items-center gap-2">
            <span>{props.children}</span>
            <Link2 className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" />
          </a>
        </h3>
      );
    })()
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 text-muted-foreground", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-4 ml-6 list-disc space-y-1 text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 ml-6 list-decimal space-y-1 text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "font-medium text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    />
  ),
  hr: (props) => (
    <Separator
      decorative
      className="my-8"
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border bg-white shadow-none dark:bg-background">
      <table
        className={cn(
          "w-full min-w-[620px] border-collapse text-sm [&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr:nth-child(odd)]:dark:bg-background [&_tbody_tr:nth-child(even)]:bg-muted/10",
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, align, ...props }) => (
    <th
      className={cn(
        "sticky top-0 z-[1] border-b border-border bg-muted px-4 py-2 font-medium text-foreground",
        getAlignClass(align),
        className,
      )}
      align={align}
      {...props}
    />
  ),
  td: ({ className, align, ...props }) => (
    <td
      className={cn(
        "border-b border-border px-4 py-2 align-top text-muted-foreground",
        getAlignClass(align),
        className,
      )}
      align={align}
      {...props}
    />
  ),
  pre: ({ children }: { children?: React.ReactNode }) => {
    const { code, language, filename, highlightLines, showLineNumbers } =
      extractCodeInfo(children);
    return (
      <CodeBlock
        code={code}
        language={language}
        filename={filename}
        highlightLines={highlightLines}
        showLineNumbers={showLineNumbers}
      />
    );
  },
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 text-xs font-mono",
        className,
      )}
      {...props}
    />
  ),
  Preview: ({ className, ...props }) => (
    <ComponentPreview className={className} {...props} />
  ),
  img: ({ src, alt, title, ...props }) => (
    <MdxImage
      src={String(src ?? "")}
      alt={String(alt ?? "")}
      title={title ? String(title) : undefined}
      {...props}
    />
  ),
  Callout,
  Steps,
  Step,
  ApiTable,
  CodeTabs,
  PkgManTabs,
};

