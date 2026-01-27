// ============================================
// BOUTON TÉLÉCHARGEMENT ZIP — COOLANCE
// ============================================
// Composant pour télécharger tous les PDFs d'une catégorie en ZIP
// Avec progression et estimation du temps
// ============================================

import { useState } from 'react';
import { Archive, Loader2, CheckCircle2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  generateCategoryZip,
  generateAllPdfsZip,
  downloadZip,
  getPdfCountByCategory,
  getTotalPdfCount,
  estimateZipTime,
  type ZipProgress,
} from '@/services/zipService';
import { type ContentCategory, categoryLabels } from '@/content/content';
import { useToast } from '@/hooks/use-toast';

interface ZipDownloadButtonProps {
  category?: ContentCategory; // Si undefined, télécharge tout
  variant?: 'default' | 'outline' | 'compact';
  className?: string;
}

export const ZipDownloadButton = ({ 
  category,
  variant = 'default',
  className = '',
}: ZipDownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ZipProgress | null>(null);
  const [complete, setComplete] = useState(false);
  const { toast } = useToast();

  const pdfCount = category ? getPdfCountByCategory(category) : getTotalPdfCount();
  const estimatedTime = estimateZipTime(pdfCount);
  const label = category ? categoryLabels[category] : 'Tous les PDFs';

  const handleDownload = async () => {
    if (pdfCount === 0) {
      toast({
        title: "Aucun PDF disponible",
        description: "Il n'y a pas de PDF disponible pour cette catégorie.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProgress(null);
    setComplete(false);

    try {
      const result = category 
        ? await generateCategoryZip(category, setProgress)
        : await generateAllPdfsZip(setProgress);

      if (result) {
        downloadZip(result.blob, result.filename);
        setComplete(true);
        
        toast({
          title: "Téléchargement réussi !",
          description: `${result.pdfCount} PDFs téléchargés en ${Math.round(result.duration / 1000)}s`,
        });

        // Reset après 3s
        setTimeout(() => {
          setComplete(false);
        }, 3000);
      } else {
        throw new Error('Génération échouée');
      }
    } catch (error) {
      console.error('Erreur génération ZIP:', error);
      toast({
        title: "Erreur de génération",
        description: "Une erreur est survenue lors de la création du ZIP.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  const progressPercent = progress 
    ? Math.round((progress.current / progress.total) * 100)
    : 0;

  // Variant compact
  if (variant === 'compact') {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={loading || pdfCount === 0}
        className={`gap-2 ${className}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {progressPercent}%
          </>
        ) : complete ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Téléchargé
          </>
        ) : (
          <>
            <Archive className="w-4 h-4" />
            ZIP ({pdfCount})
          </>
        )}
      </Button>
    );
  }

  // Variant default ou outline
  return (
    <div className={`space-y-2 ${className}`}>
      <Button
        variant={variant === 'outline' ? 'outline' : 'default'}
        onClick={handleDownload}
        disabled={loading || pdfCount === 0}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Génération en cours...
          </>
        ) : complete ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Téléchargement terminé
          </>
        ) : (
          <>
            <Archive className="w-4 h-4" />
            <span>Télécharger {label}</span>
            <span className="text-xs opacity-75">({pdfCount} PDFs)</span>
          </>
        )}
      </Button>

      {/* Barre de progression */}
      {loading && progress && (
        <div className="space-y-1.5">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {progress.phase === 'generating' && (
                <>
                  {progress.currentSlug} ({progress.currentType})
                </>
              )}
              {progress.phase === 'zipping' && 'Compression...'}
              {progress.phase === 'complete' && 'Terminé !'}
            </span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      )}

      {/* Info estimation */}
      {!loading && !complete && pdfCount > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          ⏱ Estimation : ~{estimatedTime}s
        </p>
      )}

      {/* Warning si pas de PDF */}
      {pdfCount === 0 && (
        <p className="text-xs text-muted-foreground text-center italic">
          Aucun PDF disponible
        </p>
      )}
    </div>
  );
};

export default ZipDownloadButton;
