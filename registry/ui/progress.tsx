import * as React from "react";
import { Progress as ArkProgress } from "@ark-ui/react/progress";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const ProgressRoot = ArkProgress.Root;

// ============================================================================
// LABEL
// ============================================================================
const ProgressLabel = React.forwardRef<
  React.ElementRef<typeof ArkProgress.Label>,
  React.ComponentPropsWithoutRef<typeof ArkProgress.Label>
>(({ className, ...props }, ref) => (
  <ArkProgress.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
ProgressLabel.displayName = "ProgressLabel";

// ============================================================================
// VALUE TEXT
// ============================================================================
const ProgressValueText = React.forwardRef<
  React.ElementRef<typeof ArkProgress.ValueText>,
  React.ComponentPropsWithoutRef<typeof ArkProgress.ValueText>
>(({ className, ...props }, ref) => (
  <ArkProgress.ValueText ref={ref} className={cn(className)} {...props} />
));
ProgressValueText.displayName = "ProgressValueText";

// ============================================================================
// TRACK
// ============================================================================
const ProgressTrack = React.forwardRef<
  React.ElementRef<typeof ArkProgress.Track>,
  React.ComponentPropsWithoutRef<typeof ArkProgress.Track>
>(({ className, ...props }, ref) => (
  <ArkProgress.Track
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
ProgressTrack.displayName = "ProgressTrack";

// ============================================================================
// RANGE
// ============================================================================
const ProgressRange = React.forwardRef<
  React.ElementRef<typeof ArkProgress.Range>,
  React.ComponentPropsWithoutRef<typeof ArkProgress.Range>
>(({ className, ...props }, ref) => (
  <ArkProgress.Range
    ref={ref}
    className={cn(
      "h-full rounded-full bg-primary transition-all duration-300 ease-in-out",
      className
    )}
    {...props}
  />
));
ProgressRange.displayName = "ProgressRange";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
type ProgressRootProps = React.ComponentPropsWithoutRef<typeof ProgressRoot>;

export interface ProgressProps extends Omit<ProgressRootProps, "children"> {
  showLabel?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ showLabel = false, className, children, ...props }, ref) => (
    <ProgressRoot ref={ref} className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="mb-2 flex justify-end">
          <ProgressValueText />
        </div>
      )}
      {children}
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </ProgressRoot>
  )
);
Progress.displayName = "Progress";

export {
  Progress,
  ProgressRoot,
  ProgressLabel,
  ProgressValueText,
  ProgressTrack,
  ProgressRange,
  type ProgressProps,
};
