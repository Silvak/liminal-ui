import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { Badge } from "../../../components/ui/badge";
import { mdxComponents } from "../../../components/mdx-components";

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

  return (
    <article className="space-y-8">
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
    </article>
  );
}
