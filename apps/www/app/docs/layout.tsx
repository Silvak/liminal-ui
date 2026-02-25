import { SiteHeader } from "../../components/site/header";
import { SidebarNav } from "../../components/site/sidebar-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container flex">
        <SidebarNav />
        <main className="relative min-w-0 flex-1 py-6 pl-4 pr-4 md:pl-[304px] lg:py-8 xl:pr-8">
          <div className="mx-auto w-full min-w-0 max-w-[1320px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
