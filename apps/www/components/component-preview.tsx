"use client";

import * as React from "react";
import { Eye, Code2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import { TabsList, TabsRoot, TabsTrigger, TabsContent } from "./ui/tabs";

interface ComponentPreviewProps {
  className?: string;
  children?: React.ReactNode;
}

export function ComponentPreview({
  className,
  children,
}: ComponentPreviewProps) {
  const items = React.Children.toArray(children);
  const hasPreviewAndCode = items.length >= 2;
  const previewNode = items[0];
  const codeNode = items[1];

  if (!hasPreviewAndCode) {
    return <div className={cn("my-6", className)}>{children}</div>;
  }

  return (
    <Card className={cn("my-6 overflow-hidden border border-border bg-card", className)}>
      <TabsRoot defaultValue="preview">
        <div className="border-b border-border px-4 pt-3">
          <TabsList className="h-auto gap-1 bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="gap-1 border-0 bg-transparent px-3 py-1.5 data-selected:bg-muted"
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="gap-1 border-0 bg-transparent px-3 py-1.5 data-selected:bg-muted"
            >
              <Code2 className="h-3.5 w-3.5" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="m-0 border-0">
          <CardContent className="p-6">{previewNode}</CardContent>
        </TabsContent>
        <TabsContent value="code" className="m-0 border-0">
          {codeNode}
        </TabsContent>
      </TabsRoot>
    </Card>
  );
}

