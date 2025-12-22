import * as React from "react";
import { Select as ArkSelect, Portal } from "@ark-ui/react/select";
import { cn } from "../lib/utils";
import { Check, ChevronDown } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================
interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

// ============================================================================
// ROOT
// ============================================================================
const SelectRoot = ArkSelect.Root;

// ============================================================================
// CONTROL (Container for Trigger)
// ============================================================================
const SelectControl = React.forwardRef<
  React.ElementRef<typeof ArkSelect.Control>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Control>
>(({ className, ...props }, ref) => (
  <ArkSelect.Control ref={ref} className={cn(className)} {...props} />
));
SelectControl.displayName = "SelectControl";

// ============================================================================
// TRIGGER
// ============================================================================
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof ArkSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <ArkSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
      "placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <ArkSelect.Indicator>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </ArkSelect.Indicator>
  </ArkSelect.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

// ============================================================================
// VALUE TEXT
// ============================================================================
const SelectValue = React.forwardRef<
  React.ElementRef<typeof ArkSelect.ValueText>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.ValueText>
>(({ className, ...props }, ref) => (
  <ArkSelect.ValueText ref={ref} className={cn(className)} {...props} />
));
SelectValue.displayName = "SelectValue";

// ============================================================================
// PORTAL (Re-export)
// ============================================================================
const SelectPortal = Portal;

// ============================================================================
// POSITIONER
// ============================================================================
const SelectPositioner = ArkSelect.Positioner;

// ============================================================================
// CONTENT
// ============================================================================
const SelectContent = React.forwardRef<
  React.ElementRef<typeof ArkSelect.Content>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPortal>
    <SelectPositioner>
      <ArkSelect.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      >
        {children}
      </ArkSelect.Content>
    </SelectPositioner>
  </SelectPortal>
));
SelectContent.displayName = "SelectContent";

// ============================================================================
// ITEM GROUP
// ============================================================================
const SelectGroup = React.forwardRef<
  React.ElementRef<typeof ArkSelect.ItemGroup>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.ItemGroup>
>(({ className, ...props }, ref) => (
  <ArkSelect.ItemGroup ref={ref} className={cn("p-1", className)} {...props} />
));
SelectGroup.displayName = "SelectGroup";

// ============================================================================
// LABEL
// ============================================================================
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof ArkSelect.ItemGroupLabel>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.ItemGroupLabel>
>(({ className, ...props }, ref) => (
  <ArkSelect.ItemGroupLabel
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

// ============================================================================
// ITEM
// ============================================================================
const SelectItem = React.forwardRef<
  React.ElementRef<typeof ArkSelect.Item>,
  React.ComponentPropsWithoutRef<typeof ArkSelect.Item>
>(({ className, children, ...props }, ref) => (
  <ArkSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      className
    )}
    {...props}
  >
    <ArkSelect.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </ArkSelect.ItemIndicator>
    <ArkSelect.ItemText>{children}</ArkSelect.ItemText>
  </ArkSelect.Item>
));
SelectItem.displayName = "SelectItem";

// ============================================================================
// SEPARATOR
// ============================================================================
const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

// ============================================================================
// CONVENIENCE COMPONENT (All-in-one for simple use cases)
// ============================================================================
interface SelectProps extends Omit<ArkSelect.RootProps<SelectItem>, "collection"> {
  items: SelectItem[];
  placeholder?: string;
  className?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ items, placeholder = "Select an option", className, ...props }, ref) => {
    const collection = ArkSelect.createCollection({
      items,
      itemToString: (item) => item.label,
      itemToValue: (item) => item.value,
    });

    return (
      <SelectRoot collection={collection} {...props}>
        <SelectControl ref={ref} className={className}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </SelectControl>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} item={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    );
  }
);
Select.displayName = "Select";

export {
  // Convenience component
  Select,
  // Atomic parts
  SelectRoot,
  SelectControl,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectPositioner,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  // Types
  type SelectItem as SelectItemType,
  type SelectProps,
};
