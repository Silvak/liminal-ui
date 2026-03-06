import * as React from "react";
import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { cn } from "../../lib/utils";

const PopoverRoot = ArkPopover.Root;

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof ArkPopover.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkPopover.Trigger>
>(({ className, ...props }, ref) => (
  <ArkPopover.Trigger
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverPortal = Portal;
const PopoverPositioner = ArkPopover.Positioner;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof ArkPopover.Content>,
  React.ComponentPropsWithoutRef<typeof ArkPopover.Content>
>(({ className, children, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPositioner>
      <ArkPopover.Content
        ref={ref}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      >
        {children}
      </ArkPopover.Content>
    </PopoverPositioner>
  </PopoverPortal>
));
PopoverContent.displayName = "PopoverContent";

const PopoverCloseTrigger = React.forwardRef<
  React.ElementRef<typeof ArkPopover.CloseTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkPopover.CloseTrigger>
>(({ className, ...props }, ref) => (
  <ArkPopover.CloseTrigger
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
PopoverCloseTrigger.displayName = "PopoverCloseTrigger";

const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof ArkPopover.Title>,
  React.ComponentPropsWithoutRef<typeof ArkPopover.Title>
>(({ className, ...props }, ref) => (
  <ArkPopover.Title
    ref={ref}
    className={cn("mb-1 text-sm font-medium leading-none", className)}
    {...props}
  />
));
PopoverTitle.displayName = "PopoverTitle";

const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof ArkPopover.Description>,
  React.ComponentPropsWithoutRef<typeof ArkPopover.Description>
>(({ className, ...props }, ref) => (
  <ArkPopover.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PopoverDescription.displayName = "PopoverDescription";

type PopoverRootProps = React.ComponentPropsWithoutRef<typeof PopoverRoot>;

export interface PopoverProps extends Omit<PopoverRootProps, "children"> {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ trigger, children, ...props }) => (
    <PopoverRoot {...props}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </PopoverRoot>
  ),
);
Popover.displayName = "Popover";

export {
  Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseTrigger,
  PopoverTitle,
  PopoverDescription,
  PopoverPortal,
  PopoverPositioner,
};
