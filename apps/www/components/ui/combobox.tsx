"use client";

import * as React from "react";
import { Combobox as ArkCombobox, useListCollection } from "@ark-ui/react/combobox";
import { useFilter } from "@ark-ui/react/locale";
import { Portal } from "@ark-ui/react/portal";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface ComboboxItem {
  label: string;
  value: string;
  disabled?: boolean;
}

const ComboboxRoot = ArkCombobox.Root;

const ComboboxLabel = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Label>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Label>
>(({ className, ...props }, ref) => (
  <ArkCombobox.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
ComboboxLabel.displayName = "ComboboxLabel";

const ComboboxControl = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Control>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Control>
>(({ className, ...props }, ref) => (
  <ArkCombobox.Control ref={ref} className={cn("relative", className)} {...props} />
));
ComboboxControl.displayName = "ComboboxControl";

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Input>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Input>
>(({ className, ...props }, ref) => (
  <ArkCombobox.Input
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-9 text-sm shadow-sm transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ComboboxInput.displayName = "ComboboxInput";

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Trigger>
>(({ className, ...props }, ref) => (
  <ArkCombobox.Trigger
    ref={ref}
    className={cn(
      "absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center text-muted-foreground",
      className
    )}
    {...props}
  >
    <ChevronsUpDown className="h-4 w-4" />
  </ArkCombobox.Trigger>
));
ComboboxTrigger.displayName = "ComboboxTrigger";

const ComboboxPositioner = ArkCombobox.Positioner;

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Content>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <ComboboxPositioner>
      <ArkCombobox.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </ArkCombobox.Content>
    </ComboboxPositioner>
  </Portal>
));
ComboboxContent.displayName = "ComboboxContent";

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Item>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Item>
>(({ className, children, ...props }, ref) => (
  <ArkCombobox.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <ArkCombobox.ItemIndicator className="absolute left-2 inline-flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </ArkCombobox.ItemIndicator>
    <ArkCombobox.ItemText>{children}</ArkCombobox.ItemText>
  </ArkCombobox.Item>
));
ComboboxItem.displayName = "ComboboxItem";

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof ArkCombobox.Empty>,
  React.ComponentPropsWithoutRef<typeof ArkCombobox.Empty>
>(({ className, ...props }, ref) => (
  <ArkCombobox.Empty
    ref={ref}
    className={cn("px-3 py-2 text-sm text-muted-foreground", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "ComboboxEmpty";

interface ComboboxProps extends Omit<ArkCombobox.RootProps<ComboboxItem>, "collection"> {
  label?: string;
  items: ComboboxItem[];
  placeholder?: string;
  emptyText?: string;
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  ({ label, items, placeholder = "Search...", emptyText = "No results found.", ...props }, ref) => {
    const { contains } = useFilter({ sensitivity: "base" });
    const { collection, filter } = useListCollection({
      initialItems: items,
      itemToString: (item) => item.label,
      itemToValue: (item) => item.value,
      filter: contains,
    });

    const onInputValueChange = (details: ArkCombobox.InputValueChangeDetails) => {
      filter(details.inputValue);
    };

    return (
      <ComboboxRoot collection={collection} onInputValueChange={onInputValueChange} {...props}>
        {label ? <ComboboxLabel>{label}</ComboboxLabel> : null}
        <ComboboxControl>
          <ComboboxInput ref={ref} placeholder={placeholder} />
          <ComboboxTrigger aria-label="Toggle combobox" />
        </ComboboxControl>
        <ComboboxContent>
          <ComboboxEmpty>{emptyText}</ComboboxEmpty>
          {collection.items.map((item) => (
            <ComboboxItem key={item.value} item={item}>
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxContent>
      </ComboboxRoot>
    );
  }
);
Combobox.displayName = "Combobox";

export {
  Combobox,
  ComboboxRoot,
  ComboboxLabel,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPositioner,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  type ComboboxProps,
  type ComboboxItem as ComboboxItemType,
};
