export const mainNavRoutes = [
  { key: "docs", href: "/docs/introduction" },
  { key: "components", href: "/docs/components/button" },
  { key: "designSystem", href: "/docs/design-system" },
  { key: "playground", href: "/playground" },
  { key: "blog", href: "/blog" },
] as const;

export const mobileNavRoutes = [
  { key: "home", href: "" },
  { key: "playground", href: "/playground" },
  { key: "blog", href: "/blog" },
] as const;

export type MainNavKey = (typeof mainNavRoutes)[number]["key"];
export type MobileNavKey = (typeof mobileNavRoutes)[number]["key"];
