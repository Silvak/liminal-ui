import { notFound } from "next/navigation";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { MdxContent } from "../../../components/blog/mdx-content";
import { DocsPager } from "../../../components/site/docs-pager";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

function getPostFromSlug(slug: string) {
  return allPosts.find((post) => post.slugAsParams === slug) ?? null;
}

function sortPostsByDate(
  posts: Array<{ date: string; slugAsParams: string; title: string }>,
) {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return allPosts.map((post) => ({ slug: post.slugAsParams }));
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const resolvedParams = await params;
  const post = getPostFromSlug(resolvedParams.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const resolvedParams = await params;
  const post = getPostFromSlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const sorted = sortPostsByDate(allPosts);
  const currentIndex = sorted.findIndex((p) => p.slugAsParams === post.slugAsParams);
  const prevPost = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : undefined;

  const prev = prevPost
    ? { title: prevPost.title, href: `/blog/${prevPost.slugAsParams}` }
    : undefined;
  const next = nextPost
    ? { title: nextPost.title, href: `/blog/${nextPost.slugAsParams}` }
    : undefined;

  return (
    <article className="space-y-8 min-w-0">
      <header className="space-y-4 border-b border-border pb-6">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to Blog
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-base text-muted-foreground">
            {post.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.author}</span>
          <span>{post.readingTime} min read</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MdxContent code={post.body.code} />
      </div>

      <DocsPager prev={prev} next={next} />
    </article>
  );
}
