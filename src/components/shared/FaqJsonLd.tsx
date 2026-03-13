import { useEffect } from 'react';
import type { FaqItem } from '@/content/faq';

interface FaqJsonLdProps {
  items: FaqItem[];
  id?: string;
}

export const FaqJsonLd = ({ items, id = 'jsonld-faq' }: FaqJsonLdProps) => {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) document.head.removeChild(el);
    };
  }, [items, id]);

  return null;
};
