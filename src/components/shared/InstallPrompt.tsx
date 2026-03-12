import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('etuve_install_dismissed')) return;
    } catch {
      // sessionStorage indisponible (mode privé Safari) — on affiche quand même
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try { sessionStorage.setItem('etuve_install_dismissed', '1'); } catch (_) { /* sessionStorage indisponible */ }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-border shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 max-w-lg">
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-foreground text-sm">Installer Étuve</p>
          <p className="text-xs text-muted-foreground">Accédez à vos fiches même sans connexion</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button size="sm" onClick={handleInstall} className="gap-1.5">
            <Download className="w-4 h-4" />
            Installer
          </Button>
          <button onClick={handleDismiss} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Fermer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
