// ============================================
// BOUTONS PDF — COOLANCE
// ============================================
// Composant réutilisable pour les boutons de téléchargement PDF
// Avec prévisualisation modale avant téléchargement
// ============================================

import { useState } from 'react';
import { Download, FileText, Book, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  generatePdf1PageBySlug, 
  generatePdf4PagesBySlug, 
  downloadPdf,
  getPdfFilename,
  hasEvidenceData,
  clearPdfCacheEntry,
} from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';
import { PdfPreviewModal } from './PdfPreviewModal';
import { logEvent } from '@/services/analytics';

interface PdfDownloadButtonsProps {
  slug: string;
  variant?: 'default' | 'compact' | 'card';
  className?: string;
  showPreview?: boolean; // Activer la prévisualisation
}

export const PdfDownloadButtons = ({ 
  slug, 
  variant = 'default',
  className = '',
  showPreview = true, // Prévisualisation activée par défaut
}: PdfDownloadButtonsProps) => {
  const [loading, setLoading] = useState<'1page' | '4pages' | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<'1page' | '4pages'>('1page');
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewFromCache, setPreviewFromCache] = useState(false);
  const { toast } = useToast();

  const hasEvidence = hasEvidenceData(slug);

  // Génère le PDF et ouvre la prévisualisation
  const handlePreview = async (type: '1page' | '4pages') => {
    if (!hasEvidence) {
      toast({
        title: "PDF non disponible",
        description: "Les données pour cette pathologie ne sont pas encore disponibles.",
        variant: "destructive",
      });
      return;
    }

    setLoading(type);
    setPreviewType(type);
    setPreviewOpen(true);
    setPreviewBlob(null);
    setPreviewFromCache(false);

    try {
      const result = type === '1page' 
        ? await generatePdf1PageBySlug(slug)
        : await generatePdf4PagesBySlug(slug);
      
      if (result) {
        setPreviewBlob(result.blob);
        setPreviewFromCache(result.fromCache);
      } else {
        throw new Error('Génération échouée');
      }
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      toast({
        title: "Erreur de génération",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      });
      setPreviewOpen(false);
    } finally {
      setLoading(null);
    }
  };

  // Télécharge directement le PDF
  const handleDirectDownload = async (type: '1page' | '4pages') => {
    if (!hasEvidence) {
      toast({
        title: "PDF non disponible",
        description: "Les données pour cette pathologie ne sont pas encore disponibles.",
        variant: "destructive",
      });
      return;
    }

    setLoading(type);
    try {
      const result = type === '1page' 
        ? await generatePdf1PageBySlug(slug)
        : await generatePdf4PagesBySlug(slug);
      
      if (!result) throw new Error('Génération échouée');
      
      const filename = getPdfFilename(slug, type);
      downloadPdf(result.blob, filename);
      
      logEvent('pdf_download', `/pathologies/${slug}`, { type, slug, source: 'evidence-pack' });
      
      toast({
        title: "Téléchargement réussi",
        description: `Votre ${type === '1page' ? 'fiche' : 'guide'} PDF a été téléchargé.`,
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  // Télécharge depuis la prévisualisation
  const handleDownloadFromPreview = () => {
    if (previewBlob) {
      const filename = getPdfFilename(slug, previewType);
      downloadPdf(previewBlob, filename);
      
      logEvent('pdf_download', `/pathologies/${slug}`, { 
        type: previewType, 
        slug, 
        source: 'evidence-pack',
        fromPreview: 'true',
      });
      
      toast({
        title: "Téléchargement réussi",
        description: `Votre ${previewType === '1page' ? 'fiche' : 'guide'} PDF a été téléchargé.`,
      });
      setPreviewOpen(false);
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewBlob(null);
  };

  // Régénère le PDF en ignorant le cache
  const handleRegenerate = async () => {
    // Supprimer l'entrée du cache
    clearPdfCacheEntry(slug, previewType);
    
    // Relancer la génération
    setLoading(previewType);
    setPreviewBlob(null);
    setPreviewFromCache(false);

    try {
      const result = previewType === '1page' 
        ? await generatePdf1PageBySlug(slug)
        : await generatePdf4PagesBySlug(slug);
      
      if (result) {
        setPreviewBlob(result.blob);
        setPreviewFromCache(result.fromCache);
        toast({
          title: "PDF régénéré",
          description: "Le document a été mis à jour avec les dernières données.",
        });
      } else {
        throw new Error('Régénération échouée');
      }
    } catch (error) {
      console.error('Erreur régénération PDF:', error);
      toast({
        title: "Erreur de régénération",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  // Choix de l'action : preview ou download direct
  const handleAction = (type: '1page' | '4pages') => {
    if (showPreview) {
      handlePreview(type);
    } else {
      handleDirectDownload(type);
    }
  };

  // Rendu compact
  if (variant === 'compact') {
    return (
      <>
        <div className={`flex gap-2 ${className}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('1page')}
            disabled={loading !== null || !hasEvidence}
          >
            {loading === '1page' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : showPreview ? (
              <Eye className="w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            <span className="ml-1">1 page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('4pages')}
            disabled={loading !== null || !hasEvidence}
          >
            {loading === '4pages' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : showPreview ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Book className="w-4 h-4" />
            )}
            <span className="ml-1">4 pages</span>
          </Button>
        </div>
        <PdfPreviewModal
          isOpen={previewOpen}
          onClose={closePreview}
          pdfBlob={previewBlob}
          filename={getPdfFilename(slug, previewType)}
          type={previewType}
          isLoading={loading !== null}
          onDownload={handleDownloadFromPreview}
          fromCache={previewFromCache}
          onRegenerate={handleRegenerate}
        />
      </>
    );
  }

  // Rendu card
  if (variant === 'card') {
    return (
      <>
        <div className={`card-medical bg-primary/5 border-primary/20 ${className}`}>
          <h3 className="font-serif text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Télécharger en PDF
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Fiches imprimables, basées sur les dernières preuves scientifiques.
            {showPreview && " Prévisualisez avant de télécharger."}
          </p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAction('1page')}
              disabled={loading !== null || !hasEvidence}
            >
              {loading === '1page' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : showPreview ? (
                <Eye className="w-4 h-4 mr-2" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              {showPreview ? 'Aperçu' : 'PDF'} 1 page — Fiche essentielle
            </Button>
            <Button
              variant="default"
              className="w-full justify-start"
              onClick={() => handleAction('4pages')}
              disabled={loading !== null || !hasEvidence}
            >
              {loading === '4pages' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : showPreview ? (
                <Eye className="w-4 h-4 mr-2" />
              ) : (
                <Book className="w-4 h-4 mr-2" />
              )}
              {showPreview ? 'Aperçu' : 'PDF'} 4 pages — Guide complet
            </Button>
          </div>
          {!hasEvidence && (
            <p className="text-xs text-muted-foreground mt-3 italic">
              PDF bientôt disponible pour cette pathologie.
            </p>
          )}
        </div>
        <PdfPreviewModal
          isOpen={previewOpen}
          onClose={closePreview}
          pdfBlob={previewBlob}
          filename={getPdfFilename(slug, previewType)}
          type={previewType}
          isLoading={loading !== null}
          onDownload={handleDownloadFromPreview}
          fromCache={previewFromCache}
          onRegenerate={handleRegenerate}
        />
      </>
    );
  }

  // Rendu default
  return (
    <>
      <div className={`flex flex-wrap gap-3 ${className}`}>
        <Button
          variant="outline"
          onClick={() => handleAction('1page')}
          disabled={loading !== null || !hasEvidence}
          className="gap-2"
        >
          {loading === '1page' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : showPreview ? (
            <Eye className="w-4 h-4" />
          ) : (
            <FileText className="w-4 h-4" />
          )}
          {showPreview ? 'Aperçu' : 'PDF'} 1 page
        </Button>
        <Button
          variant="default"
          onClick={() => handleAction('4pages')}
          disabled={loading !== null || !hasEvidence}
          className="gap-2"
        >
          {loading === '4pages' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : showPreview ? (
            <Eye className="w-4 h-4" />
          ) : (
            <Book className="w-4 h-4" />
          )}
          {showPreview ? 'Aperçu' : 'PDF'} 4 pages
        </Button>
      </div>
      <PdfPreviewModal
        isOpen={previewOpen}
        onClose={closePreview}
        pdfBlob={previewBlob}
        filename={getPdfFilename(slug, previewType)}
        type={previewType}
        isLoading={loading !== null}
        onDownload={handleDownloadFromPreview}
        fromCache={previewFromCache}
        onRegenerate={handleRegenerate}
      />
    </>
  );
};

export default PdfDownloadButtons;
