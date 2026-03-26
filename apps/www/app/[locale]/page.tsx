import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { SidebarNav } from "@/components/site/sidebar-nav";
import { cn } from "@/lib/utils";
import { ThemingSection } from "@/components/land/theming-section";
import { ComponentsSection } from "@/components/land/components-section";
import { ComingSoonSection } from "@/components/land/coming-soon-section";
import { WordsCarousel } from "@/components/land/words-carousel";
import { ParallaxCloud } from "@/components/land/parallax-cloud";
import { getLandingDictionary, type Locale } from "@/lib/landing-dictionary";
import { PkgManTabs } from "@/components/pkg-man-tabs";

const NPM_PACKAGE_URL = "https://www.npmjs.com/package/liminal-ui";

const LOCALES: Locale[] = ["en", "es"];
function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

const metadataBase =
  typeof process.env.NEXT_PUBLIC_SITE_URL === "string"
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex mx-auto h-min-content max-w-[1440px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

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
  const canonicalPath = `/${locale}`;

  return {
    title,
    description,
    metadataBase,
    openGraph: {
      title,
      description,
      locale: locale === "es" ? "es" : "en",
      type: "website",
      url: metadataBase ? new URL(canonicalPath, metadataBase) : undefined,
    },
    alternates: {
      canonical: metadataBase
        ? new URL(canonicalPath, metadataBase)
        : canonicalPath,
      languages: {
        en: metadataBase ? new URL("/en", metadataBase) : "/en",
        es: metadataBase ? new URL("/es", metadataBase) : "/es",
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getLandingDictionary(locale);
  const npmPackageLabel = locale === "es" ? "Ir a npm" : "Go to npm";

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <SidebarNav mobileOnly />
      <div
        id="hero"
        className="relative h-[80vh] min-h-[480px] md:min-h-[560px] w-full  px-6 md:px-8 "
      >
        <Container className="relative z-10 flex flex-col md:flex-row h-full border-x overflow-hidden">
          {/* Main content */}
          <div className="flex flex-col justify-between p-6 w-full md:w-[50%] md:border-r h-full">
            <div className="z-20 md:z-0">
              <h1 className="font-display text-7xl sm:text-7xl md:text-7xl lg:text-9xl xl:text-9xl font-semibold leading-[0.95] tracking-tight">
                <span className="block">{dict.pageHero.title1}</span>
                <span className="block">{dict.pageHero.title2}</span>
                <span className="block">{dict.pageHero.title3}</span>
              </h1>
            </div>

            <div className="z-30">
              <h2 className="font-ibm text-base md:text-lg text-foreground md:text-muted-foreground tracking-wide">
                {dict.pageHero.subtitle}
              </h2>
              <p className="my-4 text-sm md:text-base md:text-muted-foreground pr-12 ">
                {dict.pageHero.body}
              </p>

              <div className="flex flex-col sm:flex-row w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "cursor-pointer h-[44px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "rounded-t-md rounded-b-none sm:rounded-b-none sm:rounded-l-md sm:rounded-r-none",
                  )}
                >
                  {dict.pageHero.ctaStarted}
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "cursor-pointer h-[44px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "-mt-px sm:mt-0 sm:-ml-px rounded-b-md rounded-t-none sm:rounded-t-none sm:rounded-l-none sm:rounded-r-md",
                  )}
                >
                  {dict.pageHero.ctaComponents}
                </Button>
              </div>
            </div>

            <ParallaxCloud
              parallaxEnabled={true}
              className="absolute  -bottom-[320px] -right-[100%] md:-right-[60%] lg:-right-[180px] w-[1200px] h-[900px] z-10"
            />

            <div className="absolute flex lg:hidden  bottom-0 right-0 w-full h-[220px] bg-gradient-to-t from-background to-transparent z-10 " />
          </div>

          {/* second container */}
          <div className="relative hidden md:block w-full md:w-[50%] h-full min-h-[280px] p-6">
            <div className="items-center justify-between w-full pt-8 pb-0">
              <span className="font-ibm text-xs tracking-widest text-muted-foreground/60 uppercase">
                {dict.pageHero.panelSys}
              </span>
              <span className="font-ibm text-xs tracking-widest text-muted-foreground/60 uppercase hidden sm:block">
                {dict.pageHero.panelArkTw}
              </span>
              <span className="font-ibm text-xs tracking-widest text-muted-foreground/60 uppercase">
                {dict.pageHero.panelBrand}
              </span>
            </div>

            <div className="absolute -top-[1px]  -right-[1px] text-4xl text-red-700 h-[100px] w-[100px] bg-white border">
              +
            </div>
          </div>
        </Container>
        <div className="hidden absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-background from-20% to-transparent z-1" />
        <div className="absolute bottom-[50%] text-4xl text-red-700">+</div>
      </div>

      {/* CARROUSEL OF WORDS */}
      <div id="carrusel" className="w-full h-[80px] border-y px-6 md:px-8">
        <Container className="border-x h-full px-0">
          <WordsCarousel items={dict.carousel.items} />
        </Container>
      </div>

      {/* ABOUT */}
      <div
        id="about"
        className="flex w-full min-h-[620px] flex-col px-6 md:px-8"
      >
        <Container className="flex h-full w-full min-h-0 flex-1 flex-col border-x">
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 px-6 py-8 md:gap-6 md:px-10 md:py-12">
            <h2 className="text-center font-display text-3xl leading-tight tracking-tight md:text-5xl">
              {dict.about.title}
            </h2>
            <p className="mx-auto max-w-2xl text-center font-ibm text-sm text-muted-foreground md:text-base">
              {dict.about.description}
            </p>
            <PkgManTabs
              className="mx-auto my-0 w-full max-w-xl"
              npm="npm i liminal-ui"
              pnpm="pnpm add liminal-ui"
              yarn="yarn add liminal-ui"
              bun="bun add liminal-ui"
            />
            <Button
              asChild
              variant="ghost"
              className={cn(
                "h-9 rounded-md border border-border bg-background/70 px-4 font-ibm text-xs uppercase tracking-wide text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-background",
              )}
            >
              <Link
                href={NPM_PACKAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-[18px] w-[18px] shrink-0 fill-current text-[#CB3837] transition-colors group-hover:text-background"
                >
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.818h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
                </svg>
                {npmPackageLabel}
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* theming */}
      <div id="theming" className="w-full border-y">
        <ThemingSection locale={locale} copy={dict.theming} />
      </div>

      {/* components */}
      <div id="components" className="w-full border-b">
        <ComponentsSection locale={locale} copy={dict.components} />
      </div>

      <div
        id="words-marquee-2"
        className="w-full h-[100px] border-b px-6 md:px-8"
      >
        <Container className="border-x h-full px-0">
          <WordsCarousel items={dict.carousel.items} />
        </Container>
      </div>

      {/* coming soon: dashboards & complex components */}
      <div id="coming-soon" className="w-full">
        <ComingSoonSection copy={dict.comingSoon} />
      </div>

      <SiteFooter />
    </main>
  );
}
