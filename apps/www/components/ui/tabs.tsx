import * as React from "react";
import { Tabs as ArkTabs } from "@ark-ui/react/tabs";
import { cn } from "../../lib/utils";

const TabsRoot = ArkTabs.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof ArkTabs.List>,
  React.ComponentPropsWithoutRef<typeof ArkTabs.List>
>(({ className, ...props }, ref) => (
  <ArkTabs.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof ArkTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof ArkTabs.Trigger>
>(({ className, ...props }, ref) => (
  <ArkTabs.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof ArkTabs.Content>,
  React.ComponentPropsWithoutRef<typeof ArkTabs.Content>
>(({ className, ...props }, ref) => (
  <ArkTabs.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

const TabsIndicator = React.forwardRef<
  React.ElementRef<typeof ArkTabs.Indicator>,
  React.ComponentPropsWithoutRef<typeof ArkTabs.Indicator>
>(({ className, ...props }, ref) => (
  <ArkTabs.Indicator
    ref={ref}
    className={cn("h-0.5 rounded-full bg-primary", className)}
    {...props}
  />
));
TabsIndicator.displayName = "TabsIndicator";

type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsRoot>;

export interface TabsItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<TabsRootProps, "children"> {
  items: TabsItem[];
  className?: string;
  listClassName?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ items, className, listClassName, ...props }, ref) => (
    <TabsRoot ref={ref} className={className} {...props}>
      <TabsList className={listClassName}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  ),
);

Tabs.displayName = "Tabs";

export {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
};

