import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePageTitle } from "@/hooks/usePageTitle";
import { BLOG_ARTICLES } from "@/content/blog";
import { PATHOLOGY_LABELS } from "@/content/blog/constants";
import { Clock, ArrowRight } from "lucide-react";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";

const Blog = () => {
  usePageTitle("Blog — Santé et thermalisme");

  return (
    <Layout noPadding>
      <PageHero
        title="Blog santé"
        subtitle="Articles basés sur les recommandations scientifiques"
        image="/images/blog.jpg"
        compact
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <FadeIn>
        <div className="space-y-6">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="block p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readingTime} min
                </span>
                {article.pathology && (
                  <>
                    <span>·</span>
                    <span className="text-primary font-medium">
                      {PATHOLOGY_LABELS[article.pathology] ||
                        article.pathology}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-muted-foreground mb-3">
                {article.description}
              </p>
              <span className="text-primary font-medium text-sm flex items-center gap-1">
                Lire l&apos;article <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
        </FadeIn>

        <BlogNewsletter />

        <p className="text-center text-xs text-muted-foreground mt-12">
          Information éducative — ne remplace pas un avis médical. Urgence : 15
          / 112
        </p>
      </div>
    </Layout>
  );
};

export default Blog;
