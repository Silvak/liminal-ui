import { allPosts } from "contentlayer/generated";
import { BlogCard } from "../../../components/blog/blog-card";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = [...allPosts]
    .filter((p) => (p as { locale?: string }).locale === locale)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  return (
    <div className="space-y-12">
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Articles on Liminal UI, accessible components, and best practices.
        </p>
      </header>

      <section>
        <ul className="grid items-stretch gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slugAsParams}>
              <BlogCard
                title={post.title}
                description={post.description}
                date={post.date}
                author={post.author}
                slug={post.slugAsParams}
                image={post.image ?? null}
                tags={post.tags ?? null}
                locale={locale}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
