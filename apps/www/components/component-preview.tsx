import * as React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

interface ComponentPreviewProps {
  className?: string;
  children?: React.ReactNode;
}

export function ComponentPreview({
  className,
  children,
}: ComponentPreviewProps) {
  return (
    <Card className={cn("border border-border bg-background", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">{children}</div>
      </CardContent>
    </Card>
  );
}

