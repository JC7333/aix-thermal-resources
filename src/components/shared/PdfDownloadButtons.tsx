// ============================================
// BOUTONS PDF — COOLANCE
// ============================================
// Composant réutilisable pour les boutons de téléchargement PDF
// ============================================

import { useState } from 'react';
import { Download, FileText, Book, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadPdf1Page, downloadPdf4Pages } from '@/services/pdfService';
import type { PathologyContent } from '@/content/content';

interface PdfDownloadButtonsProps {
  pathology: PathologyContent;
  variant?: 'default' | 'compact' | 'card';
  className?: string;
}

export const PdfDownloadButtons = ({ 
  pathology, 
  variant = 'default',
  className = '' 
}: PdfDownloadButtonsProps) => {
  const [downloading, setDownloading] = useState<'1page' | '4pages' | null>(null);

  const handleDownload1Page = async () => {
    setDownloading('1page');
    try {
      await downloadPdf1Page(pathology);
    } catch (error) {
      console.error('Erreur téléchargement PDF 1 page:', error);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownload4Pages = async () => {
    setDownloading('4pages');
    try {
      await downloadPdf4Pages(pathology);
    } catch (error) {
      console.error('Erreur téléchargement PDF 4 pages:', error);
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
          disabled={downloading !== null}
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
          disabled={downloading !== null}
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
          Fiches imprimables, optimisées pour une lecture facile.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleDownload1Page}
            disabled={downloading !== null}
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
            disabled={downloading !== null}
          >
            {downloading === '4pages' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Book className="w-4 h-4 mr-2" />
            )}
            PDF 4 pages — Guide complet
          </Button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Button
        variant="outline"
        onClick={handleDownload1Page}
        disabled={downloading !== null}
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
        disabled={downloading !== null}
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
