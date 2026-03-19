import type { SiteDictionary } from "../../lib/site-dictionary";

export const siteEn: SiteDictionary = {
  header: {
    nav: {
      docs: "Docs",
      components: "Components",
      playground: "Playground",
      blog: "Blog",
    },
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    searchAria: "Search",
    searchTitle: "Search (Ctrl+K)",
    githubAria: "Open GitHub repository",
    sidebarDocsAria: "Documentation",
    mobileMenuAria: "Navigation menu",
    mobileMenuHeading: "Menu",
  },
  footer: {
    tagline:
      "Copy-paste React components on Ark UI and Tailwind. Own every line — no lock-in.",
    productColumn: "Product",
    resourcesColumn: "Resources",
    communityColumn: "Community",
    links: {
      docs: "Docs",
      components: "Components",
      playground: "Playground",
      blog: "Blog",
      github: "GitHub",
      changelog: "Changelog",
      mitLicense: "MIT License",
      discussions: "Discussions",
      issues: "Issues",
      pullRequests: "Pull requests",
    },
    copyright: "© {year} Liminal UI. MIT License.",
    builtWith: "Built with",
    logoAlt: "Liminal UI",
    githubAria: "GitHub",
    emailAriaPrefix: "Send email to",
  },
};
