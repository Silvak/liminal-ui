import * as React from "react";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const RadioGroupRoot = ArkRadioGroup.Root;

// ============================================================================
// LABEL
// ============================================================================
const RadioGroupLabel = React.forwardRef<
  React.ElementRef<typeof ArkRadioGroup.Label>,
  React.ComponentPropsWithoutRef<typeof ArkRadioGroup.Label>
>(({ className, ...props }, ref) => (
  <ArkRadioGroup.Label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
RadioGroupLabel.displayName = "RadioGroupLabel";

// ============================================================================
// ITEM
// ============================================================================
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof ArkRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ArkRadioGroup.Item>
>(({ className, ...props }, ref) => (
  <ArkRadioGroup.Item
    ref={ref}
    className={cn(
      "flex items-center gap-2 cursor-pointer data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
RadioGroupItem.displayName = "RadioGroupItem";

// ============================================================================
// ITEM TEXT
// ============================================================================
const RadioGroupItemText = React.forwardRef<
  React.ElementRef<typeof ArkRadioGroup.ItemText>,
  React.ComponentPropsWithoutRef<typeof ArkRadioGroup.ItemText>
>(({ className, ...props }, ref) => (
  <ArkRadioGroup.ItemText ref={ref} className={cn("text-sm", className)} {...props} />
));
RadioGroupItemText.displayName = "RadioGroupItemText";

// ============================================================================
// ITEM CONTROL
// ============================================================================
const RadioGroupItemControl = React.forwardRef<
  React.ElementRef<typeof ArkRadioGroup.ItemControl>,
  React.ComponentPropsWithoutRef<typeof ArkRadioGroup.ItemControl>
>(({ className, ...props }, ref) => (
  <ArkRadioGroup.ItemControl
    ref={ref}
    className={cn(
      "aspect-square h-4 w-4 shrink-0 rounded-full border-2 border-primary shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
      "data-[state=unchecked]:bg-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "flex items-center justify-center",
      "data-[state=checked]:after:block data-[state=checked]:after:h-2 data-[state=checked]:after:w-2 data-[state=checked]:after:rounded-full data-[state=checked]:after:bg-primary-foreground data-[state=checked]:after:content-['']",
      "data-[state=unchecked]:after:content-none",
      className
    )}
    {...props}
  />
));
RadioGroupItemControl.displayName = "RadioGroupItemControl";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
export interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

type RadioGroupRootProps = React.ComponentPropsWithoutRef<typeof RadioGroupRoot>;

export interface RadioGroupProps extends Omit<RadioGroupRootProps, "children"> {
  options: RadioGroupOption[];
  label?: React.ReactNode;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, label, className, ...props }, ref) => (
    <RadioGroupRoot
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {label && <RadioGroupLabel>{label}</RadioGroupLabel>}
      {options.map((opt) => (
        <RadioGroupItem
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled}
        >
          <RadioGroupItemControl />
          <RadioGroupItemText>{opt.label}</RadioGroupItemText>
        </RadioGroupItem>
      ))}
    </RadioGroupRoot>
  )
);
RadioGroup.displayName = "RadioGroup";

export {
  RadioGroup,
  RadioGroupRoot,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemText,
  RadioGroupItemControl,
  type RadioGroupProps,
  type RadioGroupOption,
};
