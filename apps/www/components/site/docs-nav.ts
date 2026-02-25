export type NavItem = {
  title: string;
  href: string;
  badge?: "new" | "beta" | "updated";
  disabled?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const docNavSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Components / Forms",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Label", href: "/docs/components/label" },
    ],
  },
  {
    title: "Components / Display",
    items: [
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Avatar", href: "/docs/components/avatar" },
    ],
  },
  {
    title: "Components / Overlay",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Toast", href: "/docs/components/sonner" },
    ],
  },
  {
    title: "Components / Navigation",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ],
  },
];

export const docNavItems = docNavSections.flatMap((section) =>
  section.items.filter((item) => !item.disabled),
);
