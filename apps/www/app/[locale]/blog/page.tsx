import { allPosts } from "contentlayer/generated";
import { BlogCard } from "../../../components/blog/blog-card";
import { BlogHero } from "../../../components/blog/blog-hero";

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
      <BlogHero
        variant="list"
        eyebrow="Blog"
        title={
          <>
            Articles &
            <br />
            Resources
          </>
        }
        aside={
          <p>
            Articles on Liminal UI, accessible components, and best practices.
          </p>
        }
      />

      <section className="px-6 py-8 md:px-10 lg:py-10">
        <ul className="grid w-full grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
