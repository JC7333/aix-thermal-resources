// ============================================
// BOUTONS PDF — COOLANCE
// ============================================
// Composant réutilisable pour les boutons de téléchargement PDF
// Avec prévisualisation modale avant téléchargement
// Badge "Prêt" quand le PDF est en cache
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Book, Loader2, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  generatePdf1PageBySlug, 
  generatePdf4PagesBySlug, 
  downloadPdf,
  getPdfFilename,
  hasEvidenceData,
  clearPdfCacheEntry,
  isPdfInCache,
  PdfGenerationError,
} from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';
import { PdfPreviewModal } from './PdfPreviewModal';
import { logEvent } from '@/services/analytics';
import { PdfErrorDetailsModal, type PdfErrorDetails } from './PdfErrorDetailsModal';
import { openPrintableFallback } from '@/lib/printFallback';

interface PdfDownloadButtonsProps {
  slug: string;
  variant?: 'default' | 'compact' | 'card' | 'split';
  className?: string;
  showPreview?: boolean; // Activer la prévisualisation
  showReadyBadge?: boolean; // Afficher le badge "Prêt" quand en cache
  size?: 'default' | 'sm' | 'lg'; // Taille des boutons
}

export const PdfDownloadButtons = ({ 
  slug, 
  variant = 'default',
  className = '',
  showPreview = true, // Prévisualisation activée par défaut
  showReadyBadge = true, // Badge "Prêt" activé par défaut
  size = 'default', // Taille par défaut
}: PdfDownloadButtonsProps) => {
  const [loading, setLoading] = useState<'1page' | '4pages' | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<'1page' | '4pages'>('1page');
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewFromCache, setPreviewFromCache] = useState(false);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [cacheStatus, setCacheStatus] = useState({ page1: false, page4: false });
  const [justCached, setJustCached] = useState({ page1: false, page4: false });
  const prevCacheRef = useRef({ page1: false, page4: false });
  const [errorDetails, setErrorDetails] = useState<PdfErrorDetails | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const { toast } = useToast();

  const hasEvidence = hasEvidenceData(slug);

  const toErrorDetails = (error: unknown, variant: '1page' | '4pages'): PdfErrorDetails => {
    if (error instanceof PdfGenerationError) {
      return {
        slug: error.slug,
        variant: error.variant,
        name: error.original.name,
        message: error.original.message,
        stack: error.original.stack,
      };
    }

    if (error instanceof Error) {
      return {
        slug,
        variant,
        name: error.name,
        message: error.message || String(error),
        stack: error.stack,
      };
    }

    return {
      slug,
      variant,
      message: typeof error === 'string' ? error : JSON.stringify(error),
    };
  };

  const openError = (details: PdfErrorDetails) => {
    setErrorDetails(details);
    setErrorOpen(true);
  };

  // Vérifier le statut du cache périodiquement et détecter les nouvelles entrées
  useEffect(() => {
    if (!hasEvidence || !showReadyBadge) return;

    const checkCache = () => {
      const newStatus = {
        page1: isPdfInCache(slug, '1page'),
        page4: isPdfInCache(slug, '4pages'),
      };

      // Détecter si un PDF vient d'être mis en cache (pour l'animation)
      if (newStatus.page1 && !prevCacheRef.current.page1) {
        setJustCached(prev => ({ ...prev, page1: true }));
        // Retirer l'état "just cached" après l'animation
        setTimeout(() => setJustCached(prev => ({ ...prev, page1: false })), 2000);
      }
      if (newStatus.page4 && !prevCacheRef.current.page4) {
        setJustCached(prev => ({ ...prev, page4: true }));
        setTimeout(() => setJustCached(prev => ({ ...prev, page4: false })), 2000);
      }

      prevCacheRef.current = newStatus;
      setCacheStatus(newStatus);
    };

    // Vérifier immédiatement
    checkCache();

    // Revérifier toutes les 2 secondes (pour détecter le préchargement)
    const interval = setInterval(checkCache, 2000);

    return () => clearInterval(interval);
  }, [slug, hasEvidence, showReadyBadge]);

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
    setGenerationTime(null);
    setErrorDetails(null);

    const startTime = performance.now();

    try {
      const result = type === '1page' 
        ? await generatePdf1PageBySlug(slug)
        : await generatePdf4PagesBySlug(slug);
      
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);
      
      if (result) {
        setPreviewBlob(result.blob);
        setPreviewFromCache(result.fromCache);
        setGenerationTime(elapsed);
      } else {
        throw new Error('Génération échouée');
      }
    } catch (error) {
      const details = toErrorDetails(error, type);
      console.error('[PDF_GEN_ERROR_UI]', details);

      toast({
        title: "Erreur de génération",
        description: "Le PDF n’a pas pu être généré. Ouverture de la version imprimable.",
        variant: "destructive",
      });

      // Fallback robuste : toujours un aperçu fonctionnel
      openPrintableFallback({ slug, variant: type, autoPrint: false });
      openError(details);
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
    setErrorDetails(null);
    try {
      const result = type === '1page' 
        ? await generatePdf1PageBySlug(slug)
        : await generatePdf4PagesBySlug(slug);
      
      if (!result) throw new Error('Génération échouée');
      
      const filename = getPdfFilename(slug, type);
      downloadPdf(result.blob, filename);
      
      logEvent(type === '1page' ? 'pdf_download_1page' : 'pdf_download_4pages', `/pathologies/${slug}`, { slug, source: 'direct' });
      
      toast({
        title: "Téléchargement réussi",
        description: `Votre ${type === '1page' ? 'fiche' : 'guide'} PDF a été téléchargé.`,
      });
    } catch (error) {
      const details = toErrorDetails(error, type);
      console.error('[PDF_GEN_ERROR_UI]', details);
      toast({
        title: "Téléchargement impossible",
        description: "Ouverture de la version imprimable (Imprimer → Enregistrer en PDF).",
        variant: "destructive",
      });

      // Fallback robuste : toujours un moyen d'obtenir un PDF (via impression navigateur)
      openPrintableFallback({ slug, variant: type, autoPrint: true });
      openError(details);
    } finally {
      setLoading(null);
    }
  };

  // Télécharge depuis la prévisualisation
  const handleDownloadFromPreview = () => {
    if (previewBlob) {
      const filename = getPdfFilename(slug, previewType);
      downloadPdf(previewBlob, filename);
      
      logEvent(previewType === '1page' ? 'pdf_download_1page' : 'pdf_download_4pages', `/pathologies/${slug}`, { 
        slug, 
        source: 'preview',
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
    setGenerationTime(null);
    setErrorDetails(null);

    const startTime = performance.now();

    try {
      const result = previewType === '1page' 
        ? await generatePdf1PageBySlug(slug)
        : await generatePdf4PagesBySlug(slug);
      
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);
      
      if (result) {
        setPreviewBlob(result.blob);
        setPreviewFromCache(result.fromCache);
        setGenerationTime(elapsed);
        toast({
          title: "PDF régénéré",
          description: `Document mis à jour en ${elapsed}ms.`,
        });
      } else {
        throw new Error('Régénération échouée');
      }
    } catch (error) {
      const details = toErrorDetails(error, previewType);
      console.error('[PDF_GEN_ERROR_UI]', details);
      toast({
        title: "Erreur de régénération",
        description: "Le PDF n’a pas pu être régénéré. Version imprimable disponible.",
        variant: "destructive",
      });

      openPrintableFallback({ slug, variant: previewType, autoPrint: false });
      openError(details);
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

  // Composant badge "Prêt" animé avec glow effect et tooltip
  const ReadyBadge = ({ isNew = false }: { isNew?: boolean }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: isNew 
                ? ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 8px 2px rgba(34, 197, 94, 0.4)', '0 0 0 0 rgba(34, 197, 94, 0)']
                : '0 0 0 0 rgba(34, 197, 94, 0)',
            }}
            transition={{ 
              duration: 0.3, 
              boxShadow: isNew ? { duration: 1.5, repeat: 2, ease: 'easeInOut' } : { duration: 0 },
            }}
            className="ml-1 inline-flex items-center px-1.5 py-0 text-[10px] font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-help"
          >
            <motion.span
              animate={isNew ? { rotate: [0, -10, 10, -10, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Zap className="w-2.5 h-2.5 mr-0.5" />
            </motion.span>
            Prêt
          </motion.span>
        </AnimatePresence>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        Document préchargé, ouverture instantanée
      </TooltipContent>
    </Tooltip>
  );

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
            className="relative"
          >
            {loading === '1page' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : showPreview ? (
              <Eye className="w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            <span className="ml-1">1 page</span>
            {showReadyBadge && cacheStatus.page1 && !loading && <ReadyBadge isNew={justCached.page1} />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction('4pages')}
            disabled={loading !== null || !hasEvidence}
            className="relative"
          >
            {loading === '4pages' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : showPreview ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Book className="w-4 h-4" />
            )}
            <span className="ml-1">4 pages</span>
            {showReadyBadge && cacheStatus.page4 && !loading && <ReadyBadge isNew={justCached.page4} />}
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
          generationTime={generationTime}
        />
        <PdfErrorDetailsModal
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          details={errorDetails}
          onOpenPrintable={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: false })}
          onPrint={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: true })}
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
            {showReadyBadge && (cacheStatus.page1 || cacheStatus.page4) && (
              <ReadyBadge isNew={justCached.page1 || justCached.page4} />
            )}
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
              {showReadyBadge && cacheStatus.page1 && !loading && <ReadyBadge isNew={justCached.page1} />}
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
              {showReadyBadge && cacheStatus.page4 && !loading && <ReadyBadge isNew={justCached.page4} />}
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
          generationTime={generationTime}
        />
        <PdfErrorDetailsModal
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          details={errorDetails}
          onOpenPrintable={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: false })}
          onPrint={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: true })}
        />
      </>
    );
  }

  // Rendu split (2 boutons côte à côte pour grille)
  if (variant === 'split') {
    const buttonHeight = size === 'lg' ? 'h-14' : size === 'sm' ? 'h-8' : 'h-10';
    const textSize = size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm';
    const iconSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    
    return (
      <>
        <Button
          variant="outline"
          className={`flex-1 gap-2 ${buttonHeight} ${textSize} ${className}`}
          onClick={() => handleAction('1page')}
          disabled={loading !== null || !hasEvidence}
        >
          {loading === '1page' ? (
            <Loader2 className={`${iconSize} animate-spin`} />
          ) : (
            <FileText className={iconSize} />
          )}
          <span className="hidden sm:inline">PDF</span> 1 page
          {showReadyBadge && cacheStatus.page1 && !loading && <ReadyBadge isNew={justCached.page1} />}
        </Button>
        <Button
          variant="default"
          className={`flex-1 gap-2 ${buttonHeight} ${textSize}`}
          onClick={() => handleAction('4pages')}
          disabled={loading !== null || !hasEvidence}
        >
          {loading === '4pages' ? (
            <Loader2 className={`${iconSize} animate-spin`} />
          ) : (
            <Book className={iconSize} />
          )}
          <span className="hidden sm:inline">PDF</span> 4 pages
          {showReadyBadge && cacheStatus.page4 && !loading && <ReadyBadge isNew={justCached.page4} />}
        </Button>
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
          generationTime={generationTime}
        />
        <PdfErrorDetailsModal
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          details={errorDetails}
          onOpenPrintable={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: false })}
          onPrint={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: true })}
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
          {showReadyBadge && cacheStatus.page1 && !loading && <ReadyBadge isNew={justCached.page1} />}
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
          {showReadyBadge && cacheStatus.page4 && !loading && <ReadyBadge isNew={justCached.page4} />}
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
        generationTime={generationTime}
      />
      <PdfErrorDetailsModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        details={errorDetails}
        onOpenPrintable={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: false })}
        onPrint={() => openPrintableFallback({ slug, variant: errorDetails?.variant ?? '1page', autoPrint: true })}
      />
    </>
  );
};

export default PdfDownloadButtons;
