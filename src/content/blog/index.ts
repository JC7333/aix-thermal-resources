export type { BlogArticle } from "./types";

export const BLOG_ARTICLES: import("./types").BlogArticle[] = [].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getArticleBySlug(
  slug: string,
): import("./types").BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
