import { ExternalLink, BookOpen, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeniorMode } from '@/hooks/useSeniorMode';

interface Source {
  title: string;
  org: string;
  year: number;
  url?: string;
}

interface SourcesDisclaimerCardProps {
  sources: Source[];
  lastUpdated: string;
  className?: string;
}

/**
 * Encart "Sources et recommandations" + disclaimer éducatif standard
 * À afficher sur chaque page pathologie
 */
export const SourcesDisclaimerCard = ({ sources, lastUpdated, className = '' }: SourcesDisclaimerCardProps) => {
  const { seniorMode, smallTextClass, iconSize } = useSeniorMode();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Sources cliquables */}
      <div className={`bg-card border border-border rounded-xl ${seniorMode ? 'p-6' : 'p-5'}`}>
        <h3 className={`font-serif font-bold text-foreground mb-4 flex items-center gap-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
          <BookOpen className={`${iconSize} text-primary`} />
          Sources et recommandations
        </h3>
        
        <ul className={seniorMode ? 'space-y-3' : 'space-y-2.5'}>
          {sources.map((source, index) => (
            <li key={index} className={seniorMode ? 'text-base' : 'text-sm'}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground">{source.title}</span>
                  <span className="text-muted-foreground"> — {source.org}, {source.year}</span>
                </div>
                {source.url && (
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 text-primary hover:underline flex items-center gap-1 text-sm"
                    aria-label={`Consulter ${source.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Lire</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Date de mise à jour */}
        <div className={`flex items-center gap-2 text-muted-foreground pt-4 mt-4 border-t border-border ${smallTextClass}`}>
          <Calendar className="w-4 h-4" />
          <span>Dernière mise à jour : {lastUpdated}</span>
        </div>

        {/* Lien vers méthodologie */}
        <Link 
          to="/sources-methodologie" 
          className={`inline-flex items-center gap-1.5 text-primary hover:underline mt-3 ${smallTextClass}`}
        >
          En savoir plus sur notre méthodologie
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Disclaimer standard éducatif */}
      <div className={`bg-muted/60 border border-border rounded-xl ${seniorMode ? 'p-5' : 'p-4'}`}>
        <div className="flex items-start gap-3">
          <Info className={`${iconSize} text-muted-foreground shrink-0 mt-0.5`} />
          <div>
            <p className={`text-muted-foreground leading-relaxed ${seniorMode ? 'text-base' : 'text-sm'}`}>
              <strong>Contenu éducatif</strong> — Ces informations générales ne remplacent pas un avis médical personnalisé. 
              En cas de symptômes inhabituels ou de doute, consultez un professionnel de santé.
            </p>
            <p className={`text-muted-foreground mt-2 ${smallTextClass}`}>
              Urgences : <strong>15</strong> (SAMU) ou <strong>112</strong> (européen)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
