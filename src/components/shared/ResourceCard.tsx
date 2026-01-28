import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Download, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Resource, Pathology, audienceLabels, resourceTypeLabels } from '@/data/pathologies';
import { downloadPdf1PageBySlug, hasEvidenceData } from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';
import { getPathologyUrl } from '@/lib/pathologyRoutes';

interface ResourceCardProps {
  resource: Resource;
  pathology?: Pathology;
  showPathology?: boolean;
}

export const ResourceCard = ({ resource, pathology, showPathology = true }: ResourceCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const audienceBadgeClass = {
    senior: 'badge-senior',
    enfant: 'badge-enfant',
    adulte: 'badge-adulte',
  }[resource.audience];

  // Check if PDF is available for this pathology
  const hasPdf = pathology ? hasEvidenceData(pathology.slug) : false;

  const handleDownloadPDF = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!pathology || !hasPdf) {
      toast({
        title: "PDF non disponible",
        description: "Aucune donnée disponible pour générer ce PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    try {
      await downloadPdf1PageBySlug(pathology.slug);
      toast({
        title: "Téléchargement réussi",
        description: "La fiche PDF a été téléchargée.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de générer le PDF. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

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
          to={getPathologyUrl(pathology.slug)}
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
          className="text-primary hover:text-primary hover:bg-primary/10"
          onClick={handleDownloadPDF}
          disabled={isDownloading || !hasPdf}
          title={!hasPdf ? "Données non disponibles" : "Télécharger le PDF"}
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-1.5" />
          )}
          {hasPdf ? 'PDF' : 'Bientôt'}
        </Button>
      </div>
    </article>
  );
};
