import * as React from "react";
import { Dialog as ArkDialog, Portal } from "@ark-ui/react/dialog";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

// ============================================================================
// ROOT
// ============================================================================
const Dialog = ArkDialog.Root;

// ============================================================================
// TRIGGER
// ============================================================================
const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof ArkDialog.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Trigger>
>(({ className, ...props }, ref) => (
  <ArkDialog.Trigger ref={ref} className={cn(className)} {...props} />
));
DialogTrigger.displayName = "DialogTrigger";

// ============================================================================
// PORTAL (Re-export for convenience)
// ============================================================================
const DialogPortal = Portal;

// ============================================================================
// OVERLAY / BACKDROP
// ============================================================================
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof ArkDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <ArkDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

// ============================================================================
// CONTENT
// ============================================================================
const DialogContent = React.forwardRef<
  React.ElementRef<typeof ArkDialog.Content>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Content> & {
    showCloseButton?: boolean;
  }
>(({ className, children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <ArkDialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center">
      <ArkDialog.Content
        ref={ref}
        className={cn(
          "relative w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

// ============================================================================
// CLOSE TRIGGER
// ============================================================================
const DialogClose = React.forwardRef<
  React.ElementRef<typeof ArkDialog.CloseTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.CloseTrigger>
>(({ className, ...props }, ref) => (
  <ArkDialog.CloseTrigger ref={ref} className={cn(className)} {...props} />
));
DialogClose.displayName = "DialogClose";

// ============================================================================
// HEADER (Layout helper, not from Ark)
// ============================================================================
const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

// ============================================================================
// FOOTER (Layout helper, not from Ark)
// ============================================================================
const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

// ============================================================================
// TITLE
// ============================================================================
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof ArkDialog.Title>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Title>
>(({ className, ...props }, ref) => (
  <ArkDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// ============================================================================
// DESCRIPTION
// ============================================================================
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof ArkDialog.Description>,
  React.ComponentPropsWithoutRef<typeof ArkDialog.Description>
>(({ className, ...props }, ref) => (
  <ArkDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
