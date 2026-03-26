import { SiteHeader } from "../../../components/site/header";
import { PlaygroundRouteClass } from "../../../components/playground/playground-route-class";
import { SidebarNav } from "../../../components/site/sidebar-nav";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="playground-shell flex flex-col h-screen overflow-hidden">
      <PlaygroundRouteClass />
      <SiteHeader />
      <SidebarNav mobileOnly={true} />
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">{children}</div>
    </div>
  );
}
