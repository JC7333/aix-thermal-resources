import { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

export const ArticleJsonLd = ({
  title,
  description,
  date,
  author,
  slug,
}: Props) => {
  useEffect(() => {
    const id = `jsonld-blog-${slug}`;
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      datePublished: date,
      author: { "@type": "Person", name: author },
      publisher: {
        "@type": "Organization",
        name: "ÉTUVE",
        url: "https://etuve.fr",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://etuve.fr/blog/" + slug,
      },
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) document.head.removeChild(el);
    };
  }, [title, description, date, author, slug]);
  return null;
};
