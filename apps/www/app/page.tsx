import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { LandingHero } from "../components/landing/hero";
import { PhilosophySection } from "../components/landing/philosophy";
import { ShowcaseSection } from "../components/landing/showcase";
import { ArchitectureSection } from "../components/landing/architecture";
import { MetricsSection } from "../components/landing/metrics";
import { CtaSection } from "../components/landing/cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* 1 — Hero: Monumental, glitch, particle canvas, liminal void */}
        <LandingHero />

        {/* 2 — Philosophy: The Liminal Doctrine, 3 pillars */}
        <PhilosophySection />

        {/* 3 — Showcase: Component registry + live preview */}
        <ShowcaseSection />

        {/* 4 — Architecture: Stack blueprint, layer diagram */}
        <ArchitectureSection />

        {/* 5 — Metrics: Inverted block, terminal, stats */}
        <MetricsSection />

        {/* 6 — CTA: Initialize protocol */}
        <CtaSection />
      </main>

      <SiteFooter />
    </div>
  );
}
