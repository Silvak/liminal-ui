import type { Locale } from "./landing-dictionary";

export type SiteNavLabels = Record<
  "docs" | "components" | "playground" | "blog",
  string
>;

export type SiteDictionary = {
  header: {
    nav: SiteNavLabels;
    menuOpen: string;
    menuClose: string;
    searchAria: string;
    searchTitle: string;
    githubAria: string;
    sidebarDocsAria: string;
    mobileMenuAria: string;
    mobileMenuHeading: string;
  };
  footer: {
    tagline: string;
    productColumn: string;
    resourcesColumn: string;
    communityColumn: string;
    links: {
      docs: string;
      components: string;
      playground: string;
      blog: string;
      github: string;
      changelog: string;
      mitLicense: string;
      discussions: string;
      issues: string;
      pullRequests: string;
    };
    copyright: string;
    builtWith: string;
    logoAlt: string;
    githubAria: string;
    emailAriaPrefix: string;
  };
};

export async function getSiteDictionary(locale: Locale): Promise<SiteDictionary> {
  switch (locale) {
    case "en":
      return (await import("../dictionaries/en/site")).siteEn;
    case "es":
      return (await import("../dictionaries/es/site")).siteEs;
    default:
      return (await import("../dictionaries/en/site")).siteEn;
  }
}
