import { useState } from 'react';
import { Phone, AlertCircle, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MedicalDisclaimerProps {
  variant?: 'banner' | 'inline' | 'compact' | 'floating';
}

export const MedicalDisclaimer = ({ variant = 'banner' }: MedicalDisclaimerProps) => {
  const [collapsed, setCollapsed] = useState(false);

  if (variant === 'compact') {
    return (
      <div className="p-3 bg-muted/50 rounded-lg border border-border text-xs">
        <p className="text-muted-foreground text-center">
          <AlertCircle className="w-3 h-3 inline mr-1" />
          Information générale — ne remplace pas un avis médical.
          <br />
          Urgence : <a href="tel:15" className="font-semibold text-destructive hover:underline">15</a> / <a href="tel:112" className="font-semibold text-destructive hover:underline">112</a>
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border text-sm">
        <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <strong>Information générale</strong> — Ne remplace pas un avis médical. 
          En cas d'urgence : <a href="tel:15" className="font-semibold text-destructive hover:underline">15</a> ou{' '}
          <a href="tel:112" className="font-semibold text-destructive hover:underline">112</a>
        </p>
      </div>
    );
  }

  // Floating variant (bas-droite discret)
  if (variant === 'floating') {
    if (collapsed) {
      return (
        <div className="fixed bottom-4 right-4 z-50 no-print">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCollapsed(false)}
            className="bg-background/95 backdrop-blur shadow-lg border-border text-xs h-8 px-2"
            aria-label="Afficher le bandeau légal"
          >
            <ChevronUp className="w-3 h-3 mr-1" />
            Info légale
          </Button>
        </div>
      );
    }

    return (
      <div className="fixed bottom-4 right-4 z-50 no-print max-w-xs sm:max-w-sm">
        <div className="bg-background/95 backdrop-blur border border-border rounded-lg shadow-lg p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Information générale — ne remplace pas un avis médical.
              <span className="flex items-center gap-1 mt-1">
                <Phone className="w-3 h-3" />
                Urgence : <a href="tel:15" className="font-semibold text-destructive hover:underline">15</a> / <a href="tel:112" className="font-semibold text-destructive hover:underline">112</a>
              </span>
            </p>
            <button
              onClick={() => setCollapsed(true)}
              className="text-muted-foreground hover:text-foreground p-1 rounded"
              aria-label="Replier le bandeau légal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default banner (legacy, not used anymore in Layout)
  return (
    <div className="bg-muted/60 border-b border-border py-2 no-print">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
          <AlertCircle className="w-4 h-4" />
          <span>Informations générales — ne remplace pas un avis médical.</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            Urgence : <a href="tel:15" className="font-semibold text-destructive hover:underline">15</a> / <a href="tel:112" className="font-semibold text-destructive hover:underline">112</a>
          </span>
        </p>
      </div>
    </div>
  );
};
