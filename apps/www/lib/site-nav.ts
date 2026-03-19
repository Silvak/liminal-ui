export const mainNavRoutes = [
  { key: "docs", href: "/docs/introduction" },
  { key: "components", href: "/docs/components/button" },
  { key: "playground", href: "/playground" },
  { key: "blog", href: "/blog" },
] as const;

export type MainNavKey = (typeof mainNavRoutes)[number]["key"];
