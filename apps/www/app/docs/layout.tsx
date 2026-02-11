import { SiteHeader } from "../../components/site/header";
import { SidebarNav } from "../../components/site/sidebar-nav";
import { SiteFooter } from "../../components/site/footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container flex ">
        <SidebarNav />
        <main className="relative py-6 lg:gap-10 lg:py-8 bg-blue-200">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
