import * as React from "react";
import { Field as ArkField } from "@ark-ui/react/field";
import { cn } from "../lib/utils";

// ============================================================================
// ROOT
// ============================================================================
const FieldRoot = React.forwardRef<
  React.ElementRef<typeof ArkField.Root>,
  React.ComponentPropsWithoutRef<typeof ArkField.Root>
>(({ className, ...props }, ref) => (
  <ArkField.Root ref={ref} className={cn("grid w-full gap-1.5", className)} {...props} />
));
FieldRoot.displayName = "FieldRoot";

// ============================================================================
// LABEL
// ============================================================================
const FieldLabel = React.forwardRef<
  React.ElementRef<typeof ArkField.Label>,
  React.ComponentPropsWithoutRef<typeof ArkField.Label>
>(({ className, ...props }, ref) => (
  <ArkField.Label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";

// ============================================================================
// INPUT
// ============================================================================
const FieldInput = React.forwardRef<
  React.ElementRef<typeof ArkField.Input>,
  React.ComponentPropsWithoutRef<typeof ArkField.Input>
>(({ className, ...props }, ref) => (
  <ArkField.Input
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-[invalid=true]:border-destructive",
      className
    )}
    {...props}
  />
));
FieldInput.displayName = "FieldInput";

// ============================================================================
// TEXTAREA
// ============================================================================
const FieldTextarea = React.forwardRef<
  React.ElementRef<typeof ArkField.Textarea>,
  React.ComponentPropsWithoutRef<typeof ArkField.Textarea>
>(({ className, ...props }, ref) => (
  <ArkField.Textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-[invalid=true]:border-destructive",
      className
    )}
    {...props}
  />
));
FieldTextarea.displayName = "FieldTextarea";

// ============================================================================
// HELPER TEXT
// ============================================================================
const FieldHelperText = React.forwardRef<
  React.ElementRef<typeof ArkField.HelperText>,
  React.ComponentPropsWithoutRef<typeof ArkField.HelperText>
>(({ className, ...props }, ref) => (
  <ArkField.HelperText
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
FieldHelperText.displayName = "FieldHelperText";

// ============================================================================
// ERROR TEXT
// ============================================================================
const FieldErrorText = React.forwardRef<
  React.ElementRef<typeof ArkField.ErrorText>,
  React.ComponentPropsWithoutRef<typeof ArkField.ErrorText>
>(({ className, ...props }, ref) => (
  <ArkField.ErrorText
    ref={ref}
    className={cn("text-sm font-medium text-destructive", className)}
    {...props}
  />
));
FieldErrorText.displayName = "FieldErrorText";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
interface FieldProps extends React.ComponentPropsWithoutRef<typeof ArkField.Root> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  inputProps?: React.ComponentPropsWithoutRef<typeof ArkField.Input>;
}

const Field = React.forwardRef<
  React.ElementRef<typeof ArkField.Input>,
  FieldProps
>(({ label, helperText, errorText, inputProps, className, ...props }, ref) => (
  <FieldRoot className={className} {...props}>
    {label ? <FieldLabel>{label}</FieldLabel> : null}
    <FieldInput ref={ref} {...inputProps} />
    {helperText ? <FieldHelperText>{helperText}</FieldHelperText> : null}
    {errorText ? <FieldErrorText>{errorText}</FieldErrorText> : null}
  </FieldRoot>
));
Field.displayName = "Field";

export {
  Field,
  FieldRoot,
  FieldLabel,
  FieldInput,
  FieldTextarea,
  FieldHelperText,
  FieldErrorText,
  type FieldProps,
};
