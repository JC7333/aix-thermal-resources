import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, FileText, Printer } from 'lucide-react';

export type PdfErrorDetails = {
  slug: string;
  variant: '1page' | '4pages';
  name?: string;
  message: string;
  stack?: string;
};

interface PdfErrorDetailsModalProps {
  open: boolean;
  onClose: () => void;
  details: PdfErrorDetails | null;
  onOpenPrintable: () => void;
  onPrint: () => void;
}

export function PdfErrorDetailsModal({
  open,
  onClose,
  details,
  onOpenPrintable,
  onPrint,
}: PdfErrorDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    if (!details) return '';
    return JSON.stringify(
      {
        slug: details.slug,
        variant: details.variant,
        name: details.name,
        message: details.message,
        stack: details.stack,
      },
      null,
      2
    );
  }, [details]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: l'utilisateur peut sélectionner manuellement
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Détails — erreur de génération PDF
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Vous pouvez copier-coller ces détails (slug, variante, message, stack) pour corriger rapidement.
          </p>

          <div className="rounded-lg border bg-muted/30 p-3">
            <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed font-mono text-foreground">
              {text || 'Aucun détail disponible.'}
            </pre>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onOpenPrintable} className="gap-2">
              <FileText className="w-4 h-4" />
              Ouvrir version imprimable
            </Button>
            <Button type="button" variant="outline" onClick={onPrint} className="gap-2">
              <Printer className="w-4 h-4" />
              Imprimer / Enregistrer en PDF
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={handleCopy} className="gap-2" disabled={!text}>
              <Copy className="w-4 h-4" />
              {copied ? 'Copié' : 'Copier'}
            </Button>
            <Button type="button" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
