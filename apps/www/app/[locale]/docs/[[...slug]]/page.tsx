import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "../../../../components/mdx-components";
import { TableOfContents } from "../../../../components/site/table-of-contents";
import { DocsPager } from "../../../../components/site/docs-pager";
import { DocActions } from "../../../../components/site/doc-actions";
import { docNavItems } from "../../../../components/site/docs-nav";
import type { DocHeading } from "../../../../lib/docs";

interface DocPageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

function getDocFromParams(
  locale: string,
  params: { slug?: string[] },
) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find(
    (d) => (d as { locale?: string }).locale === locale && d.slugAsParams === slug,
  );
  return doc ?? null;
}

export async function generateStaticParams(): Promise<
  { locale: string; slug: string[] }[]
> {
  return allDocs.map((doc) => {
    const d = doc as { locale: string };
    return {
      locale: d.locale,
      slug: doc.slugAsParams.split("/").filter(Boolean),
    };
  });
}

function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}

export default async function DocPage({ params }: DocPageProps) {
  const resolved = await params;
  const locale = resolved.locale;
  const doc = getDocFromParams(locale, resolved);

  if (!doc) {
    notFound();
  }

  const prefix = `/${locale}`;
  const currentHref = `${prefix}/docs/${doc.slugAsParams}`;
  const currentIndex = docNavItems.findIndex(
    (item) => `${prefix}${item.href}` === currentHref,
  );
  const prev =
    currentIndex > 0
      ? {
          title: docNavItems[currentIndex - 1].title,
          href: `${prefix}${docNavItems[currentIndex - 1].href}`,
        }
      : undefined;
  const next =
    currentIndex >= 0 && currentIndex < docNavItems.length - 1
      ? {
          title: docNavItems[currentIndex + 1].title,
          href: `${prefix}${docNavItems[currentIndex + 1].href}`,
        }
      : undefined;

  const headings = (doc.headings ?? []) as DocHeading[];

  return (
    <div>
      <article className="space-y-8 min-w-0">
        <header className="space-y-4 border-b border-border pb-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              {doc.title}
            </h1>
            <DocActions
              title={doc.title}
              slug={doc.slugAsParams}
              rawContent={
                (doc as { body?: { raw?: string } }).body?.raw ?? ""
              }
            />
          </div>
          {doc.description && (
            <p className="text-base text-muted-foreground">
              {doc.description}
            </p>
          )}
        </header>
        <Mdx code={doc.body.code} />
        <DocsPager prev={prev} next={next} />
      </article>
      <TableOfContents headings={headings} />
    </div>
  );
}
