import { SiteHeader } from "../../components/site/header";
import { SiteFooter } from "../../components/site/footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 py-8 lg:py-12">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
