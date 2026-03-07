import { SiteHeader } from "../../components/site/header";
import { SiteFooter } from "../../components/site/footer";
import { LandingHero } from "../../components/landing/hero";
import { PhilosophySection } from "../../components/landing/philosophy";
import { ShowcaseSection } from "../../components/landing/showcase";
import { ArchitectureSection } from "../../components/landing/architecture";
import { MetricsSection } from "../../components/landing/metrics";
import { CtaSection } from "../../components/landing/cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <LandingHero />
        <PhilosophySection />
        <ShowcaseSection />
        <ArchitectureSection />
        <MetricsSection />
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
