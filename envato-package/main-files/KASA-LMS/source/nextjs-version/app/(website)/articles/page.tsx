import Link from "next/link";

import { ArticleCard } from "@/components/articles/article-card";
import Container from "@/components/container";
import { ArticleHeader } from "@/components/layout/article-header";
import { getErrorMessage } from "@/lib/error-handler";
import { buildMetadata } from "@/lib/seo";
import { articleServerService } from "@/services/articles/article.server";
import { Article } from "@/types/article";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CalendarDays, Clock3, ArrowRight } from "lucide-react";

type ArticleCategorySummary = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export const metadata = buildMetadata({
  title: "Articles",
  description:
    "Read practical coding, learning, projects, and career-oriented articles from Code With Kasa.",
  path: "/articles",
});

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; view?: string }>;
}) {
  const { category, view: rawView } = await searchParams;
  const view =
    rawView === "list" || rawView === "masonry" || rawView === "grid"
      ? rawView
      : "grid";

  let articles: Article[] = [];

  try {
    const response = await articleServerService.getAll();
    articles = response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

  const categoryMap = new Map<number, ArticleCategorySummary>();

  for (const currentArticle of articles) {
    for (const cat of currentArticle.categories || []) {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: (categoryMap.get(cat.id)?.count || 0) + 1,
      });
    }
  }

  const categories = Array.from(categoryMap.values()).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );

  const filteredArticles = category
    ? articles.filter((article) =>
        article.categories?.some((item) => item.slug === category),
      )
    : articles;

  const activeCategory = categories.find((item) => item.slug === category);

  return (
    <div className="relative bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-(--surface-shell)" />
      </div>

      <div className="relative z-10">
        <ArticleHeader />

        <section className="relative py-12 pb-20">
          <Container>
            <div className="academy-card mb-8 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3">
                <Link
                  href={`/articles?view=${view}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    !activeCategory
                      ? "bg-primary text-primary-foreground shadow-[0_12px_30px_color-mix(in_oklab,var(--primary)_24%,transparent)]"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  All Articles
                </Link>

                {categories.map((item) => {
                  const isActive = activeCategory?.id === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={`/articles?category=${item.slug}&view=${view}`}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-[0_12px_30px_color-mix(in_oklab,var(--primary)_24%,transparent)]"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                      )}
                    >
                      {item.name} ({item.count})
                    </Link>
                  );
                })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    ["grid", "Grid"],
                    ["list", "List"],
                    ["masonry", "Masonry"],
                  ].map(([value, label]) => (
                    <Link
                      key={value}
                      href={`/articles?${category ? `category=${category}&` : ""}view=${value}`}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        view === value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {activeCategory && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Showing articles in{" "}
                  <span className="font-semibold text-card-foreground">
                    {activeCategory.name}
                  </span>
                  .
                </p>
              )}
            </div>

            {filteredArticles.length ? (
              view === "list" ? (
                <div className="space-y-5">
                  {filteredArticles.map((article) => (
                    <ArticleListCard key={article.id} article={article} />
                  ))}
                </div>
              ) : view === "masonry" ? (
                <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
                  {filteredArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className={cn(
                        "mb-6 break-inside-avoid",
                        index % 3 === 1 && "[&_.article-thumb]:h-72",
                      )}
                    >
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )
            ) : (
              <div className="academy-card border-dashed p-10 text-center">
                <p className="text-sm font-semibold text-card-foreground">
                  No articles found
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try selecting another category.
                </p>
              </div>
            )}
          </Container>
        </section>
      </div>
    </div>
  );
}

function ArticleListCard({ article }: { article: Article }) {
  const category = article.categories?.[0]?.name || "Article";
  return (
    <article className="academy-card grid gap-5 overflow-hidden p-4 md:grid-cols-[260px_1fr_auto] md:items-center">
      <Link
        href={`/article/${article.slug}`}
        className="relative block aspect-video overflow-hidden rounded-2xl bg-muted md:aspect-[4/3]"
      >
        <Image
          src={article.featuredImage?.path || "/assets/default-cover.jpg"}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 260px"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </Link>
      <div className="min-w-0">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {category}
        </span>
        <Link href={`/article/${article.slug}`}>
          <h3 className="mt-3 text-xl font-semibold text-card-foreground hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-IN") : "Draft"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {article.readingTime || 4} min read
          </span>
        </div>
      </div>
      <Link
        href={`/article/${article.slug}`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Read
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
