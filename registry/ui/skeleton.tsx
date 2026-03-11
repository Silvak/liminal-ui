import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// ============================================================================
// VARIANTS
// ============================================================================
const skeletonVariants = cva("rounded-md bg-muted animate-pulse", {
  variants: {
    size: {
      default: "h-4 w-full",
      sm: "h-3 w-20",
      lg: "h-6 w-full",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// ============================================================================
// SKELETON
// ============================================================================
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ size, className }))}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
