// ============================================
// MODALE PRÉVISUALISATION PDF — COOLANCE
// ============================================
// Affiche un aperçu du PDF avant téléchargement ou impression
// Indique si le PDF provient du cache
// ============================================

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, Loader2, FileText, Book, ZoomIn, ZoomOut, Printer, Zap, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBlob: Blob | null;
  filename: string;
  type: '1page' | '4pages';
  isLoading: boolean;
  onDownload: () => void;
  fromCache?: boolean;
  onRegenerate?: () => void;
  generationTime?: number | null; // Temps de génération en ms
}

export const PdfPreviewModal = ({
  isOpen,
  onClose,
  pdfBlob,
  filename,
  type,
  isLoading,
  onDownload,
  fromCache = false,
  onRegenerate,
  generationTime,
}: PdfPreviewModalProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isPrinting, setIsPrinting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return () => {};
  }, [pdfBlob]);

  // Reset zoom when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(100);
    }
  }, [isOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  const handlePrint = async () => {
    if (!pdfUrl || !pdfBlob) {
      toast({
        title: "Impression impossible",
        description: "Le PDF n'est pas encore chargé.",
        variant: "destructive",
      });
      return;
    }

    setIsPrinting(true);

    try {
      // Créer une nouvelle fenêtre pour l'impression
      const printWindow = window.open(pdfUrl, '_blank');
      
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          setTimeout(() => {
            printWindow.print();
            setIsPrinting(false);
          }, 500);
        });
        
        // Fallback si l'événement load ne se déclenche pas
        setTimeout(() => {
          setIsPrinting(false);
        }, 3000);
      } else {
        // Fallback : utiliser l'iframe
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.print();
        }
        setIsPrinting(false);
      }

      toast({
        title: "Impression lancée",
        description: "La boîte de dialogue d'impression devrait s'ouvrir.",
      });
    } catch (error) {
      console.error('Erreur impression:', error);
      toast({
        title: "Erreur d'impression",
        description: "Impossible de lancer l'impression. Téléchargez le PDF et imprimez-le manuellement.",
        variant: "destructive",
      });
      setIsPrinting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {type === '1page' ? (
                <FileText className="w-5 h-5 text-primary" />
              ) : (
                <Book className="w-5 h-5 text-primary" />
              )}
              <DialogTitle className="text-lg font-serif">
                Aperçu — {type === '1page' ? 'Fiche 1 page' : 'Guide 4 pages'}
              </DialogTitle>
              {/* Badge indicateur cache avec temps de génération */}
              {pdfBlob && !isLoading && (
                <div className="flex items-center gap-2 animate-scale-in">
                  <Badge 
                    key={fromCache ? 'cache' : 'generated'}
                    variant={fromCache ? "secondary" : "outline"} 
                    className={`text-xs gap-1 transition-all duration-300 ${
                      fromCache 
                        ? 'bg-secondary/20 text-secondary border-secondary/30' 
                        : 'bg-accent/20 text-accent-foreground border-accent/30'
                    }`}
                  >
                    {fromCache ? (
                      <>
                        <Zap className="w-3 h-3" />
                        Cache
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3" />
                        Généré
                      </>
                    )}
                  </Badge>
                  {/* Temps de génération */}
                  {generationTime !== null && generationTime !== undefined && (
                    <span className={`text-xs font-mono ${
                      fromCache ? 'text-secondary' : 'text-muted-foreground'
                    }`}>
                      {generationTime < 1000 
                        ? `${generationTime}ms` 
                        : `${(generationTime / 1000).toFixed(1)}s`
                      }
                      {fromCache && generationTime < 50 && (
                        <span className="ml-1 text-secondary">⚡</span>
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* PDF Preview */}
        <div className="flex-1 overflow-auto bg-muted/20 p-4">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center gap-6">
              {/* Icône animée */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-muted animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary animate-scale-in" />
                </div>
              </div>
              
              {/* Texte de progression */}
              <div className="text-center space-y-2">
                <p className="text-foreground font-medium">Génération du PDF en cours...</p>
                <p className="text-sm text-muted-foreground">
                  {type === '1page' ? 'Fiche 1 page' : 'Guide complet 4 pages'}
                </p>
              </div>
              
              {/* Barre de progression animée */}
              <div className="w-64 max-w-full">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full animate-pulse"
                    style={{
                      width: '100%',
                      animation: 'progress-indeterminate 1.5s ease-in-out infinite',
                    }}
                  />
                </div>
                <style>{`
                  @keyframes progress-indeterminate {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0%); }
                    100% { transform: translateX(100%); }
                  }
                `}</style>
              </div>
              
              {/* Étapes de génération */}
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Compilation
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  Rendu
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                  Finalisation
                </span>
              </div>
            </div>
          ) : pdfUrl ? (
            <div 
              className="flex justify-center"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              <iframe
                ref={iframeRef}
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                className="w-full max-w-[210mm] bg-white shadow-xl rounded-sm border"
                style={{ 
                  height: type === '1page' ? '297mm' : 'calc(297mm * 4)',
                  minHeight: '600px',
                }}
                title="Aperçu PDF"
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <FileText className="w-12 h-12 opacity-50" />
              <p>Impossible de charger l'aperçu</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t bg-muted/30 flex-row gap-3 sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <X className="w-4 h-4" />
              Fermer
            </Button>
            {/* Bouton Régénérer - visible uniquement si cache et callback disponible */}
            {fromCache && onRegenerate && (
              <Button 
                variant="ghost"
                onClick={onRegenerate} 
                disabled={isLoading}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                Régénérer
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handlePrint} 
              disabled={!pdfBlob || isLoading || isPrinting}
              className="gap-2"
            >
              {isPrinting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Printer className="w-4 h-4" />
              )}
              Imprimer
            </Button>
            <Button 
              onClick={onDownload} 
              disabled={!pdfBlob || isLoading}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Télécharger
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfPreviewModal;
