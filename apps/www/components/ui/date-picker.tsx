"use client";

import * as React from "react";
import { DatePicker as ArkDatePicker } from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { Calendar } from "lucide-react";
import { cn } from "../../lib/utils";

const DatePickerRoot = ArkDatePicker.Root;
const DatePickerLabel = ArkDatePicker.Label;
const DatePickerPositioner = ArkDatePicker.Positioner;

const DatePickerControl = React.forwardRef<
  React.ElementRef<typeof ArkDatePicker.Control>,
  React.ComponentPropsWithoutRef<typeof ArkDatePicker.Control>
>(({ className, ...props }, ref) => (
  <ArkDatePicker.Control ref={ref} className={cn("relative", className)} {...props} />
));
DatePickerControl.displayName = "DatePickerControl";

const DatePickerInput = React.forwardRef<
  React.ElementRef<typeof ArkDatePicker.Input>,
  React.ComponentPropsWithoutRef<typeof ArkDatePicker.Input>
>(({ className, ...props }, ref) => (
  <ArkDatePicker.Input
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
DatePickerInput.displayName = "DatePickerInput";

const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof ArkDatePicker.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkDatePicker.Trigger>
>(({ className, ...props }, ref) => (
  <ArkDatePicker.Trigger
    ref={ref}
    className={cn(
      "absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center text-muted-foreground",
      className
    )}
    {...props}
  >
    <Calendar className="h-4 w-4" />
  </ArkDatePicker.Trigger>
));
DatePickerTrigger.displayName = "DatePickerTrigger";

const DatePickerContent = React.forwardRef<
  React.ElementRef<typeof ArkDatePicker.Content>,
  React.ComponentPropsWithoutRef<typeof ArkDatePicker.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <DatePickerPositioner>
      <ArkDatePicker.Content
        ref={ref}
        className={cn(
          "relative z-50 w-auto rounded-md border bg-popover p-3 text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className
        )}
        {...props}
      >
        {children}
      </ArkDatePicker.Content>
    </DatePickerPositioner>
  </Portal>
));
DatePickerContent.displayName = "DatePickerContent";

interface DatePickerProps extends React.ComponentPropsWithoutRef<typeof ArkDatePicker.Root> {
  label?: string;
  placeholder?: string;
}

const DatePicker = React.forwardRef<
  React.ElementRef<typeof ArkDatePicker.Root>,
  DatePickerProps
>(({ label, placeholder = "Select date", className, ...props }, ref) => (
  <DatePickerRoot ref={ref} className={cn("grid gap-1.5", className)} {...props}>
    {label ? <DatePickerLabel className="text-sm font-medium">{label}</DatePickerLabel> : null}
    <DatePickerControl>
      <DatePickerInput placeholder={placeholder} />
      <DatePickerTrigger aria-label="Open calendar" />
    </DatePickerControl>
    <DatePickerContent>
      <p className="text-sm text-muted-foreground">
        Compose calendar views using Ark DatePicker parts.
      </p>
    </DatePickerContent>
  </DatePickerRoot>
));
DatePicker.displayName = "DatePicker";

export {
  DatePicker,
  DatePickerRoot,
  DatePickerLabel,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerPositioner,
  DatePickerContent,
  type DatePickerProps,
};
