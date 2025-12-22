import * as React from "react";
import { Accordion as ArkAccordion } from "@ark-ui/react/accordion";
import { cn } from "../lib/utils";
import { ChevronDown } from "lucide-react";

// ============================================================================
// ROOT
// ============================================================================
const Accordion = ArkAccordion.Root;

// ============================================================================
// ITEM
// ============================================================================
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof ArkAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof ArkAccordion.Item>
>(({ className, ...props }, ref) => (
  <ArkAccordion.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// ============================================================================
// TRIGGER
// ============================================================================
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof ArkAccordion.ItemTrigger>,
  React.ComponentPropsWithoutRef<typeof ArkAccordion.ItemTrigger>
>(({ className, children, ...props }, ref) => (
  <ArkAccordion.ItemTrigger
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
      "[&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </ArkAccordion.ItemTrigger>
));
AccordionTrigger.displayName = "AccordionTrigger";

// ============================================================================
// CONTENT
// ============================================================================
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof ArkAccordion.ItemContent>,
  React.ComponentPropsWithoutRef<typeof ArkAccordion.ItemContent>
>(({ className, children, ...props }, ref) => (
  <ArkAccordion.ItemContent
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </ArkAccordion.ItemContent>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
