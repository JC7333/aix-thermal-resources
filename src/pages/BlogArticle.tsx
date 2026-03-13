import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getArticleBySlug } from "@/content/blog";
import { PATHOLOGY_LABELS } from "@/content/blog/constants";
import { ArticleJsonLd } from "@/components/blog/ArticleJsonLd";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  usePageTitle(article ? article.title : "Article non trouvé");

  if (!article) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-xl text-muted-foreground">Article non trouvé.</p>
          <Link
            to="/blog"
            className="text-primary hover:underline mt-4 inline-block"
          >
            ← Retour au blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        date={article.date}
        author={article.author}
        slug={article.slug}
      />
      <article className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />

        <header className="mt-6 mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>·</span>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingTime} min de
              lecture
            </span>
          </div>
        </header>

        <BlogMarkdown content={article.content} />

        {/* Sources */}
        <div className="mt-10 p-5 rounded-xl bg-muted/30 border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Sources
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {article.sources.map((src, i) => (
              <li key={i}>
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    {src.label}
                  </a>
                ) : (
                  src.label
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA vers le parcours */}
        {article.pathology && (
          <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              Programme personnalisé —{" "}
              {PATHOLOGY_LABELS[article.pathology] || article.pathology}
            </p>
            <p className="text-muted-foreground mb-4">
              21 jours d&apos;exercices guidés, bilan avant/après, suivi
              post-cure.
            </p>
            <Link to={`/parcours/${article.pathology}`}>
              <Button size="lg" className="gap-2">
                Découvrir le parcours <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-8">
          <Link
            to="/blog"
            className="text-primary hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Tous les articles
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Information éducative — ne remplace pas un avis médical. Urgence : 15
          / 112
        </p>
      </article>
    </Layout>
  );
};

export default BlogArticle;
