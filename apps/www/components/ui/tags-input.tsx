"use client";

import * as React from "react";
import { TagsInput as ArkTagsInput } from "@ark-ui/react/tags-input";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const TagsInputRoot = ArkTagsInput.Root;

const TagsInputLabel = React.forwardRef<
  React.ElementRef<typeof ArkTagsInput.Label>,
  React.ComponentPropsWithoutRef<typeof ArkTagsInput.Label>
>(({ className, ...props }, ref) => (
  <ArkTagsInput.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
TagsInputLabel.displayName = "TagsInputLabel";

const TagsInputControl = React.forwardRef<
  React.ElementRef<typeof ArkTagsInput.Control>,
  React.ComponentPropsWithoutRef<typeof ArkTagsInput.Control>
>(({ className, ...props }, ref) => (
  <ArkTagsInput.Control
    ref={ref}
    className={cn(
      "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-transparent px-2 py-1 text-sm",
      className
    )}
    {...props}
  />
));
TagsInputControl.displayName = "TagsInputControl";

const TagsInputItem = React.forwardRef<
  React.ElementRef<typeof ArkTagsInput.Item>,
  React.ComponentPropsWithoutRef<typeof ArkTagsInput.Item>
>(({ className, ...props }, ref) => (
  <ArkTagsInput.Item
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground",
      className
    )}
    {...props}
  />
));
TagsInputItem.displayName = "TagsInputItem";

const TagsInputItemText = ArkTagsInput.ItemText;
const TagsInputInput = ArkTagsInput.Input;
const TagsInputDeleteTrigger = ArkTagsInput.ItemDeleteTrigger;
const TagsInputHiddenInput = ArkTagsInput.HiddenInput;
const TagsInputClearTrigger = ArkTagsInput.ClearTrigger;

interface TagsInputProps extends React.ComponentPropsWithoutRef<typeof ArkTagsInput.Root> {
  label?: string;
  placeholder?: string;
}

const TagsInput = React.forwardRef<
  React.ElementRef<typeof ArkTagsInput.Root>,
  TagsInputProps
>(({ label, placeholder = "Add tag...", className, ...props }, ref) => (
  <TagsInputRoot ref={ref} className={cn("grid gap-1.5", className)} {...props}>
    {label ? <TagsInputLabel>{label}</TagsInputLabel> : null}
    <ArkTagsInput.Context>
      {(tagsInput) => (
        <TagsInputControl>
          {tagsInput.value.map((value, index) => (
            <TagsInputItem key={`${value}-${index}`} value={value} index={index}>
              <TagsInputItemText>{value}</TagsInputItemText>
              <TagsInputDeleteTrigger aria-label={`Remove ${value}`}>
                <X className="h-3 w-3" />
              </TagsInputDeleteTrigger>
            </TagsInputItem>
          ))}
          <TagsInputInput placeholder={placeholder} className="flex-1 border-0 bg-transparent p-1 outline-none" />
        </TagsInputControl>
      )}
    </ArkTagsInput.Context>
    <TagsInputHiddenInput />
  </TagsInputRoot>
));
TagsInput.displayName = "TagsInput";

export {
  TagsInput,
  TagsInputRoot,
  TagsInputLabel,
  TagsInputControl,
  TagsInputItem,
  TagsInputItemText,
  TagsInputInput,
  TagsInputDeleteTrigger,
  TagsInputHiddenInput,
  TagsInputClearTrigger,
  type TagsInputProps,
};
