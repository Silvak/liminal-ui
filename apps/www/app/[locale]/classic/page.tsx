import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SidebarNav } from "@/components/site/sidebar-nav";
import { SiteFooter } from "@/components/site/footer";
import { LandingHero } from "@/components/landing/hero";
import { PhilosophySection } from "@/components/landing/philosophy";
import { ShowcaseSection } from "@/components/landing/showcase";
import { ArchitectureSection } from "@/components/landing/architecture";
import { MetricsSection } from "@/components/landing/metrics";
import { CtaSection } from "@/components/landing/cta";
import {
  getLandingDictionary,
  type Locale,
} from "@/lib/landing-dictionary";

const LOCALES: Locale[] = ["en", "es"];
function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

const metadataBase =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getLandingDictionary(locale);
  const { title, description } = dict.meta;
  const canonicalPath = `/${locale}/classic`;

  return {
    title: `${dict.meta.title} (Classic)`,
    description,
    metadataBase,
    openGraph: {
      title: `${dict.meta.title} (Classic)`,
      description,
      locale: locale === "es" ? "es" : "en",
      type: "website",
      url: metadataBase ? new URL(canonicalPath, metadataBase) : undefined,
    },
    alternates: {
      canonical: metadataBase ? new URL(canonicalPath, metadataBase) : canonicalPath,
    },
  };
}

export default async function ClassicLandingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getLandingDictionary(locale);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SidebarNav mobileOnly={true} />

      <main>
        <LandingHero t={dict.hero} />
        <PhilosophySection t={dict.philosophy} />
        <ShowcaseSection t={dict.showcase} />
        <ArchitectureSection t={dict.architecture} />
        <MetricsSection t={dict.metrics} />
        <CtaSection t={dict.cta} />
      </main>

      <SiteFooter />
    </div>
  );
}
