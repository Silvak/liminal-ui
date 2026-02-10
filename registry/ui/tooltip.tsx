import * as React from "react";
import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const Tooltip = ArkTooltip.Root;

// ============================================================================
// TRIGGER
// ============================================================================
const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof ArkTooltip.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkTooltip.Trigger>
>(({ className, ...props }, ref) => (
  <ArkTooltip.Trigger ref={ref} className={cn(className)} {...props} />
));
TooltipTrigger.displayName = "TooltipTrigger";

// ============================================================================
// POSITIONER
// ============================================================================
const TooltipPositioner = React.forwardRef<
  React.ElementRef<typeof ArkTooltip.Positioner>,
  React.ComponentPropsWithoutRef<typeof ArkTooltip.Positioner>
>(({ className, ...props }, ref) => (
  <ArkTooltip.Positioner ref={ref} className={cn(className)} {...props} />
));
TooltipPositioner.displayName = "TooltipPositioner";

// ============================================================================
// CONTENT
// ============================================================================
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof ArkTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof ArkTooltip.Content>
>(({ className, ...props }, ref) => (
  <ArkTooltip.Content
    ref={ref}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-primary px-3 py-1.5 text-primary-foreground text-sm shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipPositioner, TooltipContent };
