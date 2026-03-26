import * as React from "react";
import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../lib/utils";

const NumberInputRoot = ArkNumberInput.Root;

const NumberInputLabel = React.forwardRef<
  React.ElementRef<typeof ArkNumberInput.Label>,
  React.ComponentPropsWithoutRef<typeof ArkNumberInput.Label>
>(({ className, ...props }, ref) => (
  <ArkNumberInput.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
NumberInputLabel.displayName = "NumberInputLabel";

const NumberInputInput = React.forwardRef<
  React.ElementRef<typeof ArkNumberInput.Input>,
  React.ComponentPropsWithoutRef<typeof ArkNumberInput.Input>
>(({ className, ...props }, ref) => (
  <ArkNumberInput.Input
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
NumberInputInput.displayName = "NumberInputInput";

const NumberInputControl = React.forwardRef<
  React.ElementRef<typeof ArkNumberInput.Control>,
  React.ComponentPropsWithoutRef<typeof ArkNumberInput.Control>
>(({ className, ...props }, ref) => (
  <ArkNumberInput.Control
    ref={ref}
    className={cn("absolute inset-y-0 right-0 flex w-8 flex-col", className)}
    {...props}
  />
));
NumberInputControl.displayName = "NumberInputControl";

const NumberInputIncrementTrigger = React.forwardRef<
  React.ElementRef<typeof ArkNumberInput.IncrementTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkNumberInput.IncrementTrigger>
>(({ className, ...props }, ref) => (
  <ArkNumberInput.IncrementTrigger
    ref={ref}
    className={cn(
      "inline-flex h-1/2 items-center justify-center rounded-tr-md border-l border-b border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-3 w-3" />
  </ArkNumberInput.IncrementTrigger>
));
NumberInputIncrementTrigger.displayName = "NumberInputIncrementTrigger";

const NumberInputDecrementTrigger = React.forwardRef<
  React.ElementRef<typeof ArkNumberInput.DecrementTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkNumberInput.DecrementTrigger>
>(({ className, ...props }, ref) => (
  <ArkNumberInput.DecrementTrigger
    ref={ref}
    className={cn(
      "inline-flex h-1/2 items-center justify-center rounded-br-md border-l border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-3 w-3" />
  </ArkNumberInput.DecrementTrigger>
));
NumberInputDecrementTrigger.displayName = "NumberInputDecrementTrigger";

interface NumberInputProps extends React.ComponentPropsWithoutRef<typeof ArkNumberInput.Root> {
  label?: string;
}

const NumberInput = React.forwardRef<
  React.ElementRef<typeof ArkNumberInput.Input>,
  NumberInputProps
>(({ label, className, ...props }, ref) => (
  <NumberInputRoot className={cn("grid gap-1.5", className)} {...props}>
    {label ? <NumberInputLabel>{label}</NumberInputLabel> : null}
    <div className="relative">
      <NumberInputInput ref={ref} />
      <NumberInputControl>
        <NumberInputIncrementTrigger />
        <NumberInputDecrementTrigger />
      </NumberInputControl>
    </div>
  </NumberInputRoot>
));
NumberInput.displayName = "NumberInput";

export {
  NumberInput,
  NumberInputRoot,
  NumberInputLabel,
  NumberInputInput,
  NumberInputControl,
  NumberInputIncrementTrigger,
  NumberInputDecrementTrigger,
  type NumberInputProps,
};
