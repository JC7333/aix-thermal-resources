// ============================================
// MODALE PRÉVISUALISATION PDF — COOLANCE
// ============================================
// Affiche un aperçu du PDF avant téléchargement
// ============================================

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, Loader2, FileText, Book, ZoomIn, ZoomOut } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBlob: Blob | null;
  filename: string;
  type: '1page' | '4pages';
  isLoading: boolean;
  onDownload: () => void;
}

export const PdfPreviewModal = ({
  isOpen,
  onClose,
  pdfBlob,
  filename,
  type,
  isLoading,
  onDownload,
}: PdfPreviewModalProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return () => {};
  }, [pdfBlob]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

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
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground">Génération du PDF en cours...</p>
            </div>
          ) : pdfUrl ? (
            <div 
              className="flex justify-center"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              <iframe
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
          <Button variant="outline" onClick={onClose} className="gap-2">
            <X className="w-4 h-4" />
            Fermer
          </Button>
          <Button 
            onClick={onDownload} 
            disabled={!pdfBlob || isLoading}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger {filename}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfPreviewModal;
