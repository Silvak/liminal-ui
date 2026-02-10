import * as React from "react";
import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const SwitchRoot = ArkSwitch.Root;
const SwitchHiddenInput = ArkSwitch.HiddenInput;

// ============================================================================
// CONTROL
// ============================================================================
const SwitchControl = React.forwardRef<
  React.ElementRef<typeof ArkSwitch.Control>,
  React.ComponentPropsWithoutRef<typeof ArkSwitch.Control>
>(({ className, ...props }, ref) => (
  <ArkSwitch.Control
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-input bg-input transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      "data-[state=unchecked]:bg-input",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
SwitchControl.displayName = "SwitchControl";

// ============================================================================
// THUMB
// ============================================================================
const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof ArkSwitch.Thumb>,
  React.ComponentPropsWithoutRef<typeof ArkSwitch.Thumb>
>(({ className, ...props }, ref) => (
  <ArkSwitch.Thumb
    ref={ref}
    className={cn(
      "pointer-events-none block h-4 w-4 rounded-full bg-background shadow transition-transform",
      "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      className,
    )}
    {...props}
  />
));
SwitchThumb.displayName = "SwitchThumb";

// ============================================================================
// LABEL
// ============================================================================
const SwitchLabel = React.forwardRef<
  React.ElementRef<typeof ArkSwitch.Label>,
  React.ComponentPropsWithoutRef<typeof ArkSwitch.Label>
>(({ className, ...props }, ref) => (
  <ArkSwitch.Label
    ref={ref}
    className={cn("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
SwitchLabel.displayName = "SwitchLabel";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
type SwitchRootProps = React.ComponentPropsWithoutRef<typeof SwitchRoot>;

interface SwitchProps extends Omit<SwitchRootProps, "children"> {
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <SwitchRoot
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <SwitchHiddenInput />
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        {label ? <SwitchLabel>{label}</SwitchLabel> : children}
      </SwitchRoot>
    );
  },
);

Switch.displayName = "Switch";

export {
  // Conveniencia
  Switch,
  // Partes atomicas
  SwitchRoot,
  SwitchControl,
  SwitchThumb,
  SwitchLabel,
  SwitchHiddenInput,
  // Tipos
  type SwitchProps,
};

