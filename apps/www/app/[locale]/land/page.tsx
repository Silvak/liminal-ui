import { Button } from "@/components/ui/button";
//import Silk from "@/components/landing/silk";
import { SiteHeader } from "@/components/site/header";
import { SidebarNav } from "@/components/site/sidebar-nav";
import { cn } from "@/lib/utils";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex max-w-6xl xl:max-w-[1440px] mx-auto h-min-content",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <SidebarNav mobileOnly />
      <div
        id="hero"
        className="relative h-[80vh] min-h-[480px] md:min-h-[560px] w-full overflow-hidden px-6 md:px-8"
      >
        <Container className="relative z-10 flex flex-col md:flex-row h-full border-x">
          {/* Main content */}
          <div className="flex flex-col justify-between p-6 w-full md:w-[50%] md:border-r h-full relative">
            <div className="">
              <h1 className="font-display text-7xl sm:text-7xl md:text-7xl lg:text-9xl xl:text-9xl font-semibold leading-[0.95] tracking-tight">
                <span className="block text-primary">LIMINAL UI</span>
                <span className="block">DESIGN</span>
                <span className="block">SYSTEM</span>
              </h1>
            </div>

            <div>
              <h2 className="font-ibm text-base md:text-lg text-muted-foreground tracking-wide">
                Own every line. Ship with confidence.
              </h2>
              <p className="my-4 text-sm md:text-base text-muted-foreground/70 ">
                Copy-paste React components built on Ark UI primitives and
                styled with Tailwind v4. No wrappers, no lock-in — just clean,
                composable code you fully control.
              </p>

              <div className="flex flex-col sm:flex-row w-full ">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-[40px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "rounded-t-md rounded-b-none sm:rounded-b-none sm:rounded-l-md sm:rounded-r-none",
                  )}
                >
                  GET STARTED
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "h-[40px] w-full  sm:px-6 rounded-none border border-border bg-background/70 backdrop-blur-md text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-background hover:z-10 relative",
                    "-mt-px sm:mt-0 sm:-ml-px rounded-b-md rounded-t-none sm:rounded-t-none sm:rounded-l-none sm:rounded-r-md",
                  )}
                >
                  VIEW COMPONENTS
                </Button>
              </div>
            </div>
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
      <div id="carrusel" className="w-full  h-[100px] border-y px-6 md:px-8">
        <Container className="border-x h-full">carrusel de palabras</Container>
      </div>

      {/* ABOUT */}
      <div id="about" className="w-full h-[400px] px-6 md:px-8">
        <Container className="border-x h-full">About</Container>
      </div>
    </main>
  );
}
