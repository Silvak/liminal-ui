import { notFound } from 'next/navigation';
import { allDocs } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';

interface DocPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

async function getDocFromParams(params: { slug?: string[] }) {
  const slug = params.slug?.join('/') || '';
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }));
}

function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component />;
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const doc = await getDocFromParams(resolvedParams);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1 className="mb-2">{doc.title}</h1>
      {doc.description && (
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      )}
      <hr className="my-4" />
      <Mdx code={doc.body.code} />
    </article>
  );
}

