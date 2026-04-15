import { notFound } from "next/navigation";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { BlogHero } from "../../../../components/blog/blog-hero";
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

  const backLabel = locale === "es" ? "Volver al blog" : "Back to Blog";
  const readLabel = locale === "es" ? "min de lectura" : "min read";

  return (
    <>
      <BlogHero
        variant="article"
        eyebrow="Blog"
        title={post.title}
        aside={<p>{post.description}</p>}
        backgroundImage={post.image ?? undefined}
        priorityImage
        top={
          <Link href={`${prefix}/blog`}>{backLabel}</Link>
        }
        footer={
          <>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-foreground/90">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              <span>{post.author}</span>
              <span>
                {post.readingTime} {readLabel}
              </span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        }
      />

      <article className="mx-auto min-w-0 max-w-4xl space-y-8 px-6 pb-8 pt-8 md:px-10 md:pt-10 lg:pb-12 lg:pt-12">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MdxContent code={post.body.code} />
        </div>

        <DocsPager prev={prev} next={next} />
      </article>
    </>
  );
}
