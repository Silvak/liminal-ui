import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-bold tracking-tight mb-6">
          Liminal UI
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A modern React component library built with Ark UI and Tailwind CSS
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/docs/introduction"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/docs/components/button"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View Components
          </Link>
        </div>
      </div>
    </div>
  );
}
