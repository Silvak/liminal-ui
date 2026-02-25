import * as React from "react";
import { cn } from "../../lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <ol className={cn("my-6 space-y-4", className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, {
          stepNumber: index + 1,
        } as Partial<React.ComponentProps<typeof Step>>);
      })}
    </ol>
  );
}

export function Step({
  title,
  children,
  className,
  stepNumber,
}: StepProps & { stepNumber?: number }) {
  return (
    <li className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <div className="flex items-start gap-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {stepNumber}
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </li>
  );
}
