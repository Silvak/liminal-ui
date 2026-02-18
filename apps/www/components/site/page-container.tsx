import * as React from "react";
import { cn } from "../../lib/utils";

interface PageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <div className={cn("container mx-auto max-w-6xl px-4 md:px-8", className)}>
      {children}
    </div>
  );
}
