import React from 'react';

/**
 * Rendu de texte simple avec support du gras (**texte**).
 * Pas de dangerouslySetInnerHTML — sécurité et fiabilité.
 */
export const MarkdownContent = ({ text }: { text: string }) => {
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => {
        const lines = p.split('\n');
        return (
          <p key={i} className="text-base leading-relaxed text-foreground">
            {lines.map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {renderLine(line)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

/** Transforme **gras** en <strong> et • en puces visuelles */
function renderLine(line: string): React.ReactNode[] {
  const parts = line.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Puces
    if (part.startsWith('• ')) {
      return <span key={i} className="block pl-4">{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}
