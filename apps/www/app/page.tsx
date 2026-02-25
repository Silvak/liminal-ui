import Link from "next/link";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { PageContainer } from "../components/site/page-container";
import { SidebarNav } from "../components/site/sidebar-nav";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsItem } from "../components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const previewTabs: TabsItem[] = [
  {
    value: "alert",
    label: "Alert",
    content: (
      <Alert>
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment has been processed. A receipt has been sent to your
          email.
        </AlertDescription>
      </Alert>
    ),
  },
  {
    value: "button",
    label: "Buttons",
    content: (
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SidebarNav mobileOnly />

      <main>
        <PageContainer className="py-24 md:py-32 space-y-32">
          {/* Hero */}
          <section className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="rounded-none px-4 py-1.5 text-sm">Ark UI + Tailwind CSS</Badge>
            <h1 className="text-5xl font-semibold tracking-tighter sm:text-6xl md:text-7xl">
              Build beautiful UIs you own.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Liminal UI gives you copy-paste React components built with
              Ark UI and Tailwind CSS. No black boxes, just source code you
              control.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="rounded-none px-8 h-12 text-base">
                <Link href="/docs/introduction">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none px-8 h-12 text-base">
                <Link href="/docs/components/button">Browse components</Link>
              </Button>
            </div>
          </section>

          {/* Component Preview Glassmorphism */}
          <section className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-primary/5 to-transparent blur-3xl" />
            <Card className="backdrop-blur-xl bg-background/60 border border-border shadow-2xl rounded-none">
              <CardHeader className="p-8 pb-4 border-b border-border/50">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Component preview
                </CardTitle>
                <CardDescription className="text-base">
                  A glimpse of how Liminal UI components look out of the box.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <Tabs defaultValue="alert" items={previewTabs} />
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Why Liminal UI?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Designed for absolute control and simplicity.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
              <Card className="p-10 rounded-none border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold">Own the code</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 pt-4">
                  <CardDescription className="text-base leading-relaxed">
                    Components live in your repo, not in node_modules. Fork,
                    tweak, and ship without boundaries.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="p-10 rounded-none border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold">Accessible by default</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 pt-4">
                  <CardDescription className="text-base leading-relaxed">
                    Built on Ark UI primitives with ARIA-compliant behaviours. We handle the hard parts.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="p-10 rounded-none border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold">Themeable tokens</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 pt-4">
                  <CardDescription className="text-base leading-relaxed">
                    CSS variables for colors, radius and more, ready for
                    light/dark themes out of the box.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="p-10 rounded-none border border-border bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold">CLI powered</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 pt-4">
                  <CardDescription className="text-base leading-relaxed">
                    Run `liminal init` and `liminal add` to wire everything for you in
                    seconds.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>
        </PageContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
