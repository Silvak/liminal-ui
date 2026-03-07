import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { cn } from "../../lib/utils";

export interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  image?: string | null;
  tags?: string[] | null;
  /** When provided, links use /{locale}/blog/{slug} */
  locale?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function BlogCard({
  title,
  description,
  date,
  author,
  slug,
  tags,
  locale,
}: BlogCardProps) {
  const href = locale ? `/${locale}/blog/${slug}` : `/blog/${slug}`;

  return (
    <Link href={href} className="group block h-full">
      <Card
        className={cn(
          "h-full flex flex-col overflow-hidden border-border",
          "transition-colors duration-200",
          "hover:border-primary/50 hover:bg-muted/30",
        )}
      >
        <CardHeader className="shrink-0 space-y-1">
          <CardTitle className="line-clamp-2 text-xl">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 pt-0">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex shrink-0 items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{formatDate(date)}</span>
          <span className="inline-flex items-center gap-1.5">
            {author}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
