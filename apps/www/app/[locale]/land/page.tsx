import { Button } from "@/components/ui/button";
import { ColorBends } from "@/components/landing/color-bends";
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
      className={cn("relative flex max-w-6xl mx-auto h-min-content", className)}
    >
      {children}
    </div>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <div
        id="hero"
        className="relative h-[90vh] min-h-[560px] w-full border-b overflow-hidden"
      >
        <ColorBends
          className="absolute inset-0"
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={110}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.1}
          noise={0.1}
          transparent
          autoRotate={0}
        />

        <Container className="relative z-10 flex-col h-full max-w-full px-6 md:px-8 backdrop-blur-xl">
          {/* HUD bar */}
          <div className="flex items-center justify-between w-full pt-8 pb-0">
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

          {/* Main content */}
          <div className="flex flex-col items-center justify-center flex-1 text-center gap-5 md:gap-6 animate-reveal-up pb-16">
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none flex gap-[0.25em]">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--foreground) 0%, oklch(from var(--foreground) l c h / 0.15) 100%)",
                  }}
                >
                  LIMINAL
                </span>
                <span className="lg:-ml-6 text-foreground">UI</span>
              </h1>

              <h2 className="font-ibm text-base md:text-lg text-muted-foreground tracking-wide">
                Build beautiful UIs you own.
              </h2>
            </div>

            <p className="text-sm md:text-base text-muted-foreground/70 max-w-sm md:max-w-md leading-relaxed">
              Copy-paste React components. No black boxes. Built on Ark UI
              primitives. Styled with Tailwind v4.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button
                variant="outline"
                className="h-[40px] bg-accent/60 backdrop-blur-md"
              >
                GET STARTED
              </Button>
              <Button size="lg" className="h-[40px]">
                VIEW COMPONENTS
              </Button>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-background from-20% to-transparent z-1" />
      </div>

      <div id="about">About</div>
    </main>
  );
}
