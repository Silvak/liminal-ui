import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/header";
import { SidebarNav } from "@/components/site/sidebar-nav";
import { cn } from "@/lib/utils";
import { ThemingSection } from "@/components/land/theming-section";
import { ComponentsSection } from "@/components/land/components-section";
import { ComingSoonSection } from "@/components/land/coming-soon-section";
import { PkgManTabs } from "@/components/pkg-man-tabs";
import { WordsCarousel } from "@/components/land/words-carousel";
import { getLandingDictionary, type Locale } from "@/lib/landing-dictionary";

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

const LOCALES: Locale[] = ["en", "es"];
function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();
  const locale = localeParam;
  const dict = await getLandingDictionary(locale);

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <SidebarNav mobileOnly />
      <div
        id="hero"
        className="relative h-[80vh] min-h-[480px] md:min-h-[560px] w-full overflow-hidden px-6 md:px-8 "
      >
        <Container className="relative z-10 flex flex-col md:flex-row h-full border-x">
          <div className="flex flex-col justify-between p-6 w-full md:w-[50%] md:border-r h-full relative">
            <div className="">
              <h1 className="font-display text-7xl sm:text-7xl md:text-7xl lg:text-9xl xl:text-9xl font-semibold leading-[0.95] tracking-tight">
                <span className="block">{dict.pageHero.title1}</span>
                <span className="block">{dict.pageHero.title2}</span>
                <span className="block">{dict.pageHero.title3}</span>
              </h1>
            </div>

            <div>
              <h2 className="font-ibm text-base md:text-lg text-muted-foreground tracking-wide">
                {dict.pageHero.subtitle}
              </h2>
              <p className="my-4 text-sm md:text-base text-muted-foreground/70 ">
                {dict.pageHero.body}
              </p>

              <div className="flex flex-col sm:flex-row w-full ">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-[40px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "rounded-t-md rounded-b-none sm:rounded-b-none sm:rounded-l-md sm:rounded-r-none",
                  )}
                >
                  {dict.pageHero.ctaStarted}
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-[40px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "-mt-px sm:mt-0 sm:-ml-px rounded-b-md rounded-t-none sm:rounded-t-none sm:rounded-l-none sm:rounded-r-md",
                  )}
                >
                  {dict.pageHero.ctaComponents}
                </Button>
              </div>
            </div>
          </div>

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

      <div id="carrusel" className="w-full  h-[100px] border-y px-6 md:px-8">
        <Container className="border-x h-full px-0">
          <WordsCarousel items={dict.carousel.items} />
        </Container>
      </div>

      <div
        id="about"
        className="flex w-full min-h-[400px] flex-col px-6 md:px-8"
      >
        <Container className="flex h-full min-h-0 flex-1 flex-col border-x">
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
          </div>
        </Container>
      </div>

      <div id="theming" className="w-full border-y">
        <ThemingSection locale={locale} copy={dict.theming} />
      </div>

      <div id="components" className="w-full border-b">
        <ComponentsSection locale={locale} copy={dict.components} />
      </div>

      <div id="coming-soon" className="w-full border-b">
        <ComingSoonSection copy={dict.comingSoon} />
      </div>
    </main>
  );
}
