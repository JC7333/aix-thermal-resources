import React from "react";

/**
 * Rendu Markdown enrichi pour les articles de blog.
 * Supporte : ## H2, ### H3, **gras**, listes - et paragraphes.
 * Sécurisé — pas de dangerouslySetInnerHTML.
 */
export const BlogMarkdown = ({ content }: { content: string }) => {
  const blocks = content.split("\n\n").filter((b) => b.trim());

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary prose-li:text-foreground">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        // H2
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="font-serif text-2xl font-bold text-foreground mt-8 mb-4"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }

        // H3
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="font-serif text-xl font-semibold text-foreground mt-6 mb-3"
            >
              {trimmed.slice(4)}
            </h3>
          );
        }

        // Liste à puces (lignes commençant par - ou *)
        const listLines = trimmed.split("\n").filter((l) => l.trim());
        if (listLines.every((l) => /^[-*]\s/.test(l.trim()))) {
          return (
            <ul key={i} className="list-disc list-inside space-y-1 my-4">
              {listLines.map((line, li) => (
                <li key={li} className="text-foreground leading-relaxed">
                  {renderInline(line.replace(/^[-*]\s/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // Paragraphe multi-lignes
        const lines = trimmed.split("\n");
        return (
          <p key={i} className="text-foreground leading-relaxed my-4">
            {lines.map((line, li) => (
              <React.Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

/** Transforme **gras** en <strong> dans une ligne */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
