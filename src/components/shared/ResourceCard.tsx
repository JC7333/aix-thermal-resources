import { Link } from 'react-router-dom';
import { Clock, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Resource, Pathology, audienceLabels, resourceTypeLabels } from '@/data/pathologies';

interface ResourceCardProps {
  resource: Resource;
  pathology?: Pathology;
  showPathology?: boolean;
}

export const ResourceCard = ({ resource, pathology, showPathology = true }: ResourceCardProps) => {
  const audienceBadgeClass = {
    senior: 'badge-senior',
    enfant: 'badge-enfant',
    adulte: 'badge-adulte',
  }[resource.audience];

  return (
    <article className="card-medical flex flex-col h-full">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {resourceTypeLabels[resource.type]}
          </span>
          <span className={audienceBadgeClass}>
            <Users className="w-3 h-3 inline mr-1" />
            {audienceLabels[resource.audience]}
          </span>
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-foreground mb-2">
        {resource.title}
      </h3>

      {showPathology && pathology && (
        <Link
          to={`/pathologie/${pathology.slug}`}
          className="text-sm text-primary hover:underline mb-2"
        >
          {pathology.name}
        </Link>
      )}

      <p className="text-muted-foreground text-sm flex-1 mb-4">
        {resource.summary}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {resource.readingTime} min
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={(e) => {
            e.preventDefault();
            // PDF download logic
            alert('Téléchargement PDF - Fonctionnalité à venir');
          }}
        >
          <Download className="w-4 h-4 mr-1.5" />
          PDF
        </Button>
      </div>
    </article>
  );
};
