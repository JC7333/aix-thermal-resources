export type { BlogArticle } from "./types";

import { arthroseGenouExercices } from "./arthrose-genou-exercices";
import { lombalgieCureThermale } from "./lombalgie-cure-thermale";
import { bpcoRehabilitationThermale } from "./bpco-rehabilitation-thermale";
import { fibromyalgieThermalismeArticle } from "./fibromyalgie-thermalisme";

export const BLOG_ARTICLES: import("./types").BlogArticle[] = [
  arthroseGenouExercices,
  lombalgieCureThermale,
  bpcoRehabilitationThermale,
  fibromyalgieThermalismeArticle,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getArticleBySlug(
  slug: string,
): import("./types").BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
