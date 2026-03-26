import * as React from "react";
import { PinInput as ArkPinInput } from "@ark-ui/react/pin-input";
import { cn } from "../lib/utils";

const PinInputRoot = ArkPinInput.Root;

const PinInputLabel = React.forwardRef<
  React.ElementRef<typeof ArkPinInput.Label>,
  React.ComponentPropsWithoutRef<typeof ArkPinInput.Label>
>(({ className, ...props }, ref) => (
  <ArkPinInput.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
PinInputLabel.displayName = "PinInputLabel";

const PinInputControl = React.forwardRef<
  React.ElementRef<typeof ArkPinInput.Control>,
  React.ComponentPropsWithoutRef<typeof ArkPinInput.Control>
>(({ className, ...props }, ref) => (
  <ArkPinInput.Control ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
));
PinInputControl.displayName = "PinInputControl";

const PinInputField = React.forwardRef<
  React.ElementRef<typeof ArkPinInput.Input>,
  React.ComponentPropsWithoutRef<typeof ArkPinInput.Input>
>(({ className, ...props }, ref) => (
  <ArkPinInput.Input
    ref={ref}
    className={cn(
      "h-10 w-10 rounded-md border border-input bg-transparent text-center text-sm shadow-sm transition-colors",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
PinInputField.displayName = "PinInputField";

const PinInputHiddenInput = ArkPinInput.HiddenInput;

interface PinInputProps extends React.ComponentPropsWithoutRef<typeof ArkPinInput.Root> {
  label?: string;
  length?: number;
}

const PinInput = React.forwardRef<
  React.ElementRef<typeof ArkPinInput.Root>,
  PinInputProps
>(({ label, length = 4, className, ...props }, ref) => (
  <PinInputRoot
    ref={ref}
    count={length}
    className={cn("grid gap-1.5", className)}
    {...props}
  >
    {label ? <PinInputLabel>{label}</PinInputLabel> : null}
    <PinInputControl>
      {Array.from({ length }).map((_, index) => (
        <PinInputField key={index} index={index} />
      ))}
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInputRoot>
));
PinInput.displayName = "PinInput";

export {
  PinInput,
  PinInputRoot,
  PinInputLabel,
  PinInputControl,
  PinInputField,
  PinInputHiddenInput,
  type PinInputProps,
};
