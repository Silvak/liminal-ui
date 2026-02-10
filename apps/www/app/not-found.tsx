import Link from 'next/link';
import { SiteHeader } from '../components/site/header';
import { SiteFooter } from '../components/site/footer';
import { PageContainer } from '../components/site/page-container';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="text-muted-foreground text-center text-lg">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </PageContainer>
      <SiteFooter />
    </>
  );
}
