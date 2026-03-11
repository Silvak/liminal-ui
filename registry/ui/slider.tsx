import * as React from "react";
import { Slider as ArkSlider } from "@ark-ui/react/slider";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const SliderRoot = ArkSlider.Root;

// ============================================================================
// LABEL
// ============================================================================
const SliderLabel = React.forwardRef<
  React.ElementRef<typeof ArkSlider.Label>,
  React.ComponentPropsWithoutRef<typeof ArkSlider.Label>
>(({ className, ...props }, ref) => (
  <ArkSlider.Label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
SliderLabel.displayName = "SliderLabel";

// ============================================================================
// CONTROL
// ============================================================================
const SliderControl = React.forwardRef<
  React.ElementRef<typeof ArkSlider.Control>,
  React.ComponentPropsWithoutRef<typeof ArkSlider.Control>
>(({ className, ...props }, ref) => (
  <ArkSlider.Control
    ref={ref}
    className={cn("relative flex w-full touch-none items-center", className)}
    {...props}
  />
));
SliderControl.displayName = "SliderControl";

// ============================================================================
// TRACK
// ============================================================================
const SliderTrack = React.forwardRef<
  React.ElementRef<typeof ArkSlider.Track>,
  React.ComponentPropsWithoutRef<typeof ArkSlider.Track>
>(({ className, ...props }, ref) => (
  <ArkSlider.Track
    ref={ref}
    className={cn(
      "relative h-2 w-full grow overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
SliderTrack.displayName = "SliderTrack";

// ============================================================================
// RANGE
// ============================================================================
const SliderRange = React.forwardRef<
  React.ElementRef<typeof ArkSlider.Range>,
  React.ComponentPropsWithoutRef<typeof ArkSlider.Range>
>(({ className, ...props }, ref) => (
  <ArkSlider.Range
    ref={ref}
    className={cn("absolute h-full rounded-full bg-primary", className)}
    {...props}
  />
));
SliderRange.displayName = "SliderRange";

// ============================================================================
// THUMB
// ============================================================================
const SliderThumb = React.forwardRef<
  React.ElementRef<typeof ArkSlider.Thumb>,
  React.ComponentPropsWithoutRef<typeof ArkSlider.Thumb>
>(({ className, ...props }, ref) => (
  <ArkSlider.Thumb
    ref={ref}
    className={cn(
      "block h-4 w-4 shrink-0 rounded-full border-2 border-primary bg-background shadow transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
SliderThumb.displayName = "SliderThumb";

// ============================================================================
// CONVENIENCE COMPONENT (single value)
// ============================================================================
type SliderRootProps = React.ComponentPropsWithoutRef<typeof SliderRoot>;

export interface SliderProps extends Omit<SliderRootProps, "children"> {
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ label, className, children, ...props }, ref) => (
    <SliderRoot ref={ref} className={cn("w-full", className)} {...props}>
      {label && <SliderLabel>{label}</SliderLabel>}
      {children}
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} />
      </SliderControl>
    </SliderRoot>
  )
);
Slider.displayName = "Slider";

export {
  Slider,
  SliderRoot,
  SliderLabel,
  SliderControl,
  SliderTrack,
  SliderRange,
  SliderThumb,
  type SliderProps,
};
