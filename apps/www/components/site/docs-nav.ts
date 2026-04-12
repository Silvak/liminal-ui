export type NavItem = {
  title: string;
  href: string;
  badge?: "new" | "beta" | "updated";
  addedDate?: string; // ISO date, badge "new" shown for 30 days
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
      { title: "Theming", href: "/docs/theming" },
      { title: "Using Ark UI components", href: "/docs/understanding-ark-ui" },
    ],
  },
  {
    title: "Components / Forms",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Field", href: "/docs/components/field", addedDate: "2026-03-26" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Combobox", href: "/docs/components/combobox", addedDate: "2026-03-26" },
      { title: "Date Picker", href: "/docs/components/date-picker", addedDate: "2026-03-26" },
      { title: "Number Input", href: "/docs/components/number-input", addedDate: "2026-03-26" },
      { title: "Pin Input", href: "/docs/components/pin-input", addedDate: "2026-03-26" },
      { title: "File Upload", href: "/docs/components/file-upload", addedDate: "2026-03-26" },
      { title: "Tags Input", href: "/docs/components/tags-input", addedDate: "2026-03-26" },
      { title: "Radio Group", href: "/docs/components/radio-group", addedDate: "2026-03-11" },
      { title: "Slider", href: "/docs/components/slider", addedDate: "2026-03-11" },
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
      { title: "Progress", href: "/docs/components/progress", addedDate: "2026-03-11" },
      { title: "Skeleton", href: "/docs/components/skeleton", addedDate: "2026-03-11" },
    ],
  },
  {
    title: "Components / Overlay",
    items: [
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu", addedDate: "2026-03-11" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Toast", href: "/docs/components/sonner" },
    ],
  },
  {
    title: "Components / Navigation",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Pagination", href: "/docs/components/pagination", addedDate: "2026-03-26" },
    ],
  },
];

export const docNavItems = docNavSections.flatMap((section) =>
  section.items.filter((item) => !item.disabled),
);
