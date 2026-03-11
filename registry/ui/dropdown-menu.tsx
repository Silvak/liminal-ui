import * as React from "react";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import { cn } from "../lib/utils";
import { ChevronDown } from "lucide-react";

// ============================================================================
// ROOT
// ============================================================================
const MenuRoot = ArkMenu.Root;

// ============================================================================
// TRIGGER
// ============================================================================
const MenuTrigger = React.forwardRef<
  React.ElementRef<typeof ArkMenu.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.Trigger>
>(({ className, children, ...props }, ref) => (
  <ArkMenu.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ArkMenu.Indicator>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </ArkMenu.Indicator>
  </ArkMenu.Trigger>
));
MenuTrigger.displayName = "MenuTrigger";

// ============================================================================
// POSITIONER
// ============================================================================
const MenuPositioner = ArkMenu.Positioner;

// ============================================================================
// CONTENT
// ============================================================================
const MenuContent = React.forwardRef<
  React.ElementRef<typeof ArkMenu.Content>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.Content>
>(({ className, children, ...props }, ref) => (
  <MenuPositioner>
    <ArkMenu.Content
        ref={ref}
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
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
      </ArkMenu.Content>
  </MenuPositioner>
));
MenuContent.displayName = "MenuContent";

// ============================================================================
// ITEM
// ============================================================================
const MenuItem = React.forwardRef<
  React.ElementRef<typeof ArkMenu.Item>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.Item>
>(({ className, ...props }, ref) => (
  <ArkMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
      className
    )}
    {...props}
  />
));
MenuItem.displayName = "MenuItem";

// ============================================================================
// ITEM TEXT
// ============================================================================
const MenuItemText = React.forwardRef<
  React.ElementRef<typeof ArkMenu.ItemText>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.ItemText>
>(({ className, ...props }, ref) => (
  <ArkMenu.ItemText ref={ref} className={cn(className)} {...props} />
));
MenuItemText.displayName = "MenuItemText";

// ============================================================================
// ITEM GROUP
// ============================================================================
const MenuItemGroup = React.forwardRef<
  React.ElementRef<typeof ArkMenu.ItemGroup>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.ItemGroup>
>(({ className, ...props }, ref) => (
  <ArkMenu.ItemGroup ref={ref} className={cn("p-1", className)} {...props} />
));
MenuItemGroup.displayName = "MenuItemGroup";

// ============================================================================
// ITEM GROUP LABEL
// ============================================================================
const MenuItemGroupLabel = React.forwardRef<
  React.ElementRef<typeof ArkMenu.ItemGroupLabel>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.ItemGroupLabel>
>(({ className, ...props }, ref) => (
  <ArkMenu.ItemGroupLabel
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      className
    )}
    {...props}
  />
));
MenuItemGroupLabel.displayName = "MenuItemGroupLabel";

// ============================================================================
// SEPARATOR
// ============================================================================
const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof ArkMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof ArkMenu.Separator>
>(({ className, ...props }, ref) => (
  <ArkMenu.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenuSeparator.displayName = "MenuSeparator";

// ============================================================================
// CONVENIENCE COMPONENT
// ============================================================================
export interface DropdownMenuItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

type MenuRootProps = React.ComponentPropsWithoutRef<typeof MenuRoot>;

export interface DropdownMenuProps extends Omit<MenuRootProps, "children"> {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  onSelect?: (details: { value: string }) => void;
  className?: string;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, items, onSelect, className, ...props }, ref) => (
    <MenuRoot ref={ref} onSelect={(e) => onSelect?.({ value: e.value })} {...props}>
      <MenuTrigger>{trigger}</MenuTrigger>
      <MenuContent className={className}>
        <MenuItemGroup>
          {items.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <MenuItemText>{item.label}</MenuItemText>
            </MenuItem>
          ))}
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  )
);
DropdownMenu.displayName = "DropdownMenu";

export {
  DropdownMenu,
  MenuRoot,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  type DropdownMenuProps,
  type DropdownMenuItem,
};
