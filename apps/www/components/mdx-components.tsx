import * as React from "react";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";
import { PkgManTabs } from "./pkg-man-tabs";
import { Separator } from "./ui/separator";
import { cn } from "../lib/utils";
import { ComponentPreview } from "./component-preview";

type MDXComponent = React.ComponentType<any>;

type MDXComponents = {
  [key: string]: MDXComponent;
};

function extractCodeInfo(children: React.ReactNode) {
  const child = children as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >;

  const code = child?.props?.children ?? "";
  const rawClassName = child?.props?.className ?? "";

  const match = /language-([a-z0-9]+)/i.exec(rawClassName);
  const language = match?.[1] ?? "tsx";

  return {
    code: String(code),
    language,
  };
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
    <h2
      className={cn(
        "scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
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
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={cn(
          "w-full border-collapse text-sm",
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-border bg-muted px-4 py-2 text-left font-medium",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-border px-4 py-2 align-top", className)}
      {...props}
    />
  ),
  pre: ({ children }: { children?: React.ReactNode }) => {
    const { code, language } = extractCodeInfo(children);
    return <CodeBlock code={code} language={language} />;
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
  CodeTabs,
  PkgManTabs,
};

