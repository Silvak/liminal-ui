import { notFound } from "next/navigation";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { MdxContent } from "../../../../components/blog/mdx-content";
import { DocsPager } from "../../../../components/site/docs-pager";

interface BlogArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function getPostFromSlug(locale: string, slug: string) {
  return allPosts.find(
    (p) => (p as { locale?: string }).locale === locale && p.slugAsParams === slug,
  ) ?? null;
}

function sortPostsByDate(
  posts: Array<{ date: string; slugAsParams: string; title: string; locale?: string }>,
  locale: string,
) {
  return [...posts]
    .filter((p) => p.locale === locale)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export async function generateStaticParams(): Promise<
  { locale: string; slug: string }[]
> {
  return allPosts.map((post) => ({
    locale: (post as { locale: string }).locale,
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const resolved = await params;
  const post = getPostFromSlug(resolved.locale, resolved.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const resolved = await params;
  const { locale, slug } = resolved;
  const post = getPostFromSlug(locale, slug);

  if (!post) {
    notFound();
  }

  const sorted = sortPostsByDate(allPosts as Array<{ date: string; slugAsParams: string; title: string; locale?: string }>, locale);
  const currentIndex = sorted.findIndex((p) => p.slugAsParams === post.slugAsParams);
  const prevPost = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : undefined;

  const prefix = `/${locale}`;
  const prev = prevPost
    ? { title: prevPost.title, href: `${prefix}/blog/${prevPost.slugAsParams}` }
    : undefined;
  const next = nextPost
    ? { title: nextPost.title, href: `${prefix}/blog/${nextPost.slugAsParams}` }
    : undefined;

  return (
    <article className="mx-auto min-w-0 max-w-4xl space-y-8 px-6 py-8 md:px-10 lg:py-12">
      <header className="space-y-4 border-b border-border pb-6">
        <Link
          href={`${prefix}/blog`}
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
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
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
