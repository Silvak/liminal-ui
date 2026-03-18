import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SidebarNav } from "@/components/site/sidebar-nav";
import { cn } from "@/lib/utils";
import { ThemingSection } from "@/components/land/theming-section";
import { ComponentsSection } from "@/components/land/components-section";
import { ComingSoonSection } from "@/components/land/coming-soon-section";
import { WordsCarousel } from "@/components/land/words-carousel";
import { ParallaxCloud } from "@/components/land/parallax-cloud";
import { getLandingDictionary, type Locale } from "@/lib/landing-dictionary";

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
                <span className="block">LIMINAL UI</span>
                <span className="block">DESIGN</span>
                <span className="block">SYSTEM</span>
              </h1>
            </div>

            <div className="z-30">
              <h2 className="font-ibm text-base md:text-lg text-foreground md:text-muted-foreground tracking-wide">
                Own every line. Ship with confidence.
              </h2>
              <p className="my-4 text-sm md:text-base md:text-muted-foreground pr-12 ">
                Copy-paste React components built on Ark UI primitives and
                styled with Tailwind v4. No wrappers, no lock-in — just clean,
                composable code you fully control.
              </p>

              <div className="flex flex-col sm:flex-row w-full">
                <Button
                  variant="ghost"
                  className={cn(
                    "cursor-pointer h-[44px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "rounded-t-md rounded-b-none sm:rounded-b-none sm:rounded-l-md sm:rounded-r-none",
                  )}
                >
                  GET STARTED
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "cursor-pointer h-[44px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "-mt-px sm:mt-0 sm:-ml-px rounded-b-md rounded-t-none sm:rounded-t-none sm:rounded-l-none sm:rounded-r-md",
                  )}
                >
                  VIEW COMPONENTS
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
                SYS.v0.15.0
              </span>
              <span className="font-ibm text-xs tracking-widest text-muted-foreground/60 uppercase hidden sm:block">
                ARK UI / TW CSS
              </span>
              <span className="font-ibm text-xs tracking-widest text-muted-foreground/60 uppercase">
                LIMINAL.UI
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
      <div id="about" className="w-full min-h-[400px] px-6 md:px-8">
        <Container className="border-x h-full">About</Container>
      </div>

      {/* theming */}
      <div id="theming" className="w-full border-y">
        <ThemingSection locale={locale} />
      </div>

      <div id="carrusel" className="w-full h-[80px] border-y px-6 md:px-8">
        <Container className="border-x h-full px-0">as</Container>
      </div>

      {/* components */}
      <div id="components" className="w-full border-b">
        <ComponentsSection locale={locale} />
      </div>

      {/* coming soon: dashboards & complex components */}
      <div id="coming-soon" className="w-full border-b">
        <ComingSoonSection />
      </div>
    </main>
  );
}
