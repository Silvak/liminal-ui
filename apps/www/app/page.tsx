import Link from "next/link";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { PageContainer } from "../components/site/page-container";
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

      <main>
        <PageContainer className="py-12 md:py-16 space-y-16">
          {/* Hero */}
          <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6">
              <Badge variant="secondary">Ark UI + Tailwind CSS</Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  Build beautiful UIs you own.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Liminal UI gives you copy-paste React components built with
                  Ark UI and Tailwind CSS. No black boxes, just source code you
                  control.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/docs/introduction">Get started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/docs/components/button">Browse components</Link>
                </Button>
              </div>
            </div>
            <Card className="border border-border/80 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Component preview
                </CardTitle>
                <CardDescription>
                  A glimpse of how Liminal UI components look out of the box.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="alert" items={previewTabs} />
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Why Liminal UI?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Own the code</CardTitle>
                  <CardDescription>
                    Components live in your repo, not in node_modules. Fork,
                    tweak, and ship.\n{" "}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accessible by default</CardTitle>
                  <CardDescription>
                    Built on Ark UI primitives with ARIA-compliant behaviours.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Themeable tokens</CardTitle>
                  <CardDescription>
                    CSS variables for colors, radius and more, ready for
                    light/dark themes.\n{" "}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>CLI powered</CardTitle>
                  <CardDescription>
                    `liminal init` and `liminal add` wire everything for you in
                    seconds.\n{" "}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        </PageContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
