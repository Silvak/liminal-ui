import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { mdxComponents } from "../../../components/mdx-components";
import { TableOfContents } from "../../../components/site/table-of-contents";
import { DocsPager } from "../../../components/site/docs-pager";
import { DocActions } from "../../../components/site/doc-actions";
import { docNavItems } from "../../../components/site/docs-nav";
import type { DocHeading } from "../../../lib/docs";

interface DocPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

async function getDocFromParams(params: { slug?: string[] }) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const doc = await getDocFromParams(resolvedParams);

  if (!doc) {
    notFound();
  }

  const headings = (doc.headings ?? []) as DocHeading[];
  const currentHref = `/docs/${doc.slugAsParams}`;
  const currentIndex = docNavItems.findIndex((item) => item.href === currentHref);
  const prev = currentIndex > 0 ? docNavItems[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < docNavItems.length - 1
      ? docNavItems[currentIndex + 1]
      : undefined;

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
