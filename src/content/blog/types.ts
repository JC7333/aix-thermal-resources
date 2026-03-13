export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  pathology?: string;
  tags: string[];
  sources: { label: string; url?: string }[];
  content: string;
  readingTime: number;
}
