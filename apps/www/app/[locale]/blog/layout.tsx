import { SiteHeader } from "../../../components/site/header";
import { SidebarNav } from "../../../components/site/sidebar-nav";
import { SiteFooter } from "../../../components/site/footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SidebarNav mobileOnly={true} />
      <main className="w-full px-6 md:px-8">
        <div className="relative mx-auto min-h-[calc(100vh-3.5rem)] max-w-[1440px] border-x">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
