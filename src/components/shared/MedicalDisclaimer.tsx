import { Phone, AlertCircle } from 'lucide-react';

interface MedicalDisclaimerProps {
  variant?: 'banner' | 'inline' | 'compact';
}

export const MedicalDisclaimer = ({ variant = 'banner' }: MedicalDisclaimerProps) => {
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
