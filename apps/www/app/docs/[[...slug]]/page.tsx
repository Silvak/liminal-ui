import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { Badge } from "../../../components/ui/badge";
import { mdxComponents } from "../../../components/mdx-components";
import { TableOfContents } from "../../../components/site/table-of-contents";
import { DocsPager } from "../../../components/site/docs-pager";
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

  const isComponent = doc.slugAsParams.startsWith("components/");
  const headings = (doc.headings ?? []) as DocHeading[];
  const currentHref = `/docs/${doc.slugAsParams}`;
  const currentIndex = docNavItems.findIndex((item) => item.href === currentHref);
  const prev = currentIndex > 0 ? docNavItems[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < docNavItems.length - 1
      ? docNavItems[currentIndex + 1]
      : undefined;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-10">
      <article className="space-y-8 min-w-0 max-w-3xl">
        <header className="space-y-4 border-b border-border pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {isComponent ? "Component" : "Guide"}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                {doc.title}
              </h1>
              {doc.description && (
                <p className="text-base text-muted-foreground">
                  {doc.description}
                </p>
              )}
            </div>
            {isComponent && (
              <Badge variant="secondary" className="mt-1 whitespace-nowrap">
                UI Component
              </Badge>
            )}
          </div>
        </header>
        <Mdx code={doc.body.code} />
        <DocsPager prev={prev} next={next} />
      </article>
      <TableOfContents headings={headings} />
    </div>
  );
}
