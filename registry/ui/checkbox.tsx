import * as React from "react";
import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const CheckboxRoot = ArkCheckbox.Root;
const CheckboxHiddenInput = ArkCheckbox.HiddenInput;

// ============================================================================
// CONTROL
// ============================================================================
const CheckboxControl = React.forwardRef<
  React.ElementRef<typeof ArkCheckbox.Control>,
  React.ComponentPropsWithoutRef<typeof ArkCheckbox.Control>
>(({ className, ...props }, ref) => (
  <ArkCheckbox.Control
    ref={ref}
    className={cn(
      "h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <ArkCheckbox.Indicator>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </ArkCheckbox.Indicator>
  </ArkCheckbox.Control>
));
CheckboxControl.displayName = "CheckboxControl";

// ============================================================================
// LABEL
// ============================================================================
const CheckboxLabel = React.forwardRef<
  React.ElementRef<typeof ArkCheckbox.Label>,
  React.ComponentPropsWithoutRef<typeof ArkCheckbox.Label>
>(({ className, ...props }, ref) => (
  <ArkCheckbox.Label
    ref={ref}
    className={cn("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
CheckboxLabel.displayName = "CheckboxLabel";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
type CheckboxRootProps = React.ComponentPropsWithoutRef<typeof CheckboxRoot>;

interface CheckboxProps extends Omit<CheckboxRootProps, "children"> {
  label?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <CheckboxRoot ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props}>
        <CheckboxHiddenInput />
        <CheckboxControl />
        {label ? <CheckboxLabel>{label}</CheckboxLabel> : children}
      </CheckboxRoot>
    );
  },
);

Checkbox.displayName = "Checkbox";

export {
  // Conveniencia
  Checkbox,
  // Partes atomicas
  CheckboxRoot,
  CheckboxControl,
  CheckboxLabel,
  CheckboxHiddenInput,
  // Tipos
  type CheckboxProps,
}
