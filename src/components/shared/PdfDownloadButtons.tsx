// ============================================
// BOUTONS PDF — COOLANCE
// ============================================
// Composant réutilisable pour les boutons de téléchargement PDF
// Utilise les données evidence-pack.json
// ============================================

import { useState } from 'react';
import { Download, FileText, Book, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadPdf1PageBySlug, downloadPdf4PagesBySlug, hasEvidenceData } from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';

interface PdfDownloadButtonsProps {
  slug: string;
  variant?: 'default' | 'compact' | 'card';
  className?: string;
}

export const PdfDownloadButtons = ({ 
  slug, 
  variant = 'default',
  className = '' 
}: PdfDownloadButtonsProps) => {
  const [downloading, setDownloading] = useState<'1page' | '4pages' | null>(null);
  const { toast } = useToast();

  // Vérifier si les données evidence existent
  const hasEvidence = hasEvidenceData(slug);

  const handleDownload1Page = async () => {
    if (!hasEvidence) {
      toast({
        title: "PDF non disponible",
        description: "Les données pour cette pathologie ne sont pas encore disponibles.",
        variant: "destructive",
      });
      return;
    }

    setDownloading('1page');
    try {
      await downloadPdf1PageBySlug(slug);
      toast({
        title: "Téléchargement réussi",
        description: "Votre fiche PDF 1 page a été téléchargée.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF 1 page:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleDownload4Pages = async () => {
    if (!hasEvidence) {
      toast({
        title: "PDF non disponible",
        description: "Les données pour cette pathologie ne sont pas encore disponibles.",
        variant: "destructive",
      });
      return;
    }

    setDownloading('4pages');
    try {
      await downloadPdf4PagesBySlug(slug);
      toast({
        title: "Téléchargement réussi",
        description: "Votre guide PDF 4 pages a été téléchargé.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF 4 pages:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload1Page}
          disabled={downloading !== null || !hasEvidence}
        >
          {downloading === '1page' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
          <span className="ml-1">1 page</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload4Pages}
          disabled={downloading !== null || !hasEvidence}
        >
          {downloading === '4pages' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Book className="w-4 h-4" />
          )}
          <span className="ml-1">4 pages</span>
        </Button>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`card-medical bg-primary/5 border-primary/20 ${className}`}>
        <h3 className="font-serif text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Download className="w-5 h-5 text-primary" />
          Télécharger en PDF
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Fiches imprimables, basées sur les dernières preuves scientifiques.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleDownload1Page}
            disabled={downloading !== null || !hasEvidence}
          >
            {downloading === '1page' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            PDF 1 page — Fiche essentielle
          </Button>
          <Button
            variant="default"
            className="w-full justify-start"
            onClick={handleDownload4Pages}
            disabled={downloading !== null || !hasEvidence}
          >
            {downloading === '4pages' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Book className="w-4 h-4 mr-2" />
            )}
            PDF 4 pages — Guide complet
          </Button>
        </div>
        {!hasEvidence && (
          <p className="text-xs text-muted-foreground mt-3 italic">
            PDF bientôt disponible pour cette pathologie.
          </p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button
        variant="outline"
        onClick={handleDownload1Page}
        disabled={downloading !== null || !hasEvidence}
        className="gap-2"
      >
        {downloading === '1page' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        PDF 1 page
      </Button>
      <Button
        variant="default"
        onClick={handleDownload4Pages}
        disabled={downloading !== null || !hasEvidence}
        className="gap-2"
      >
        {downloading === '4pages' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Book className="w-4 h-4" />
        )}
        PDF 4 pages
      </Button>
    </div>
  );
};

export default PdfDownloadButtons;
