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
    <div>
      <div className="w-full border-b px-6 py-8 md:px-10">
        <p className="font-ibm mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Blog
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1
            className="font-display leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Articles &
            <br />
            Resources
          </h1>
          <p className="font-ibm text-[13px] leading-[1.7] text-muted-foreground md:max-w-xs md:text-right">
            Articles on Liminal UI, accessible components, and best practices.
          </p>
        </div>
      </div>

      <section className="px-6 py-8 md:px-10 lg:py-12">
        <ul className="mx-auto grid max-w-4xl items-stretch gap-6 sm:grid-cols-2">
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
