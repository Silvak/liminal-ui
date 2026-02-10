import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Liminal UI. MIT License.</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/yourusername/liminal-ui"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="/docs/introduction"
            className="transition-colors hover:text-foreground"
          >
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}

